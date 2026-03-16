import type { CommentType } from "@/types/Anime";
import { addComment } from "./actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import CommentField from "@/components/anime/CommentField";
import Comment from "@/components/anime/Comment";
import Link from "next/link";

type DiscussionProps = {
  id: number;
  full: boolean;
};

async function Discussion({ id, full }: DiscussionProps) {
  const anime = await prisma.anime.findUnique({
    where: { id: id },
    include: {
      comments: { include: { user: true }, orderBy: { createdAt: "desc" }, take: full ? undefined : 3 },
      _count: { select: { comments: true } },
    },
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-y-5">
      <CommentField
        animeId={id}
        signedIn={session?.user ? true : false}
        name={session?.user?.name || ""}
        addComment={addComment}
      />
      <h2 className="font-bold text-lg">
        Comment{anime?.comments?.length === 1 ? "" : "s"} ({anime?._count.comments || 0})
      </h2>
      <div className="flex flex-col gap-y-3">
        {anime?.comments && anime.comments.length > 0 ? (
          anime?.comments.map((comment) => <Comment key={comment.id} comment={comment as CommentType} />)
        ) : (
          <div>No comments yet. Be the first one to comment on this anime!</div>
        )}
      </div>
      {!full && anime!._count.comments! > 3 && (
        <Link href="?tab=discussion" className="rounded-lg border-2 border-zinc-800 px-4 py-2 hover:bg-zinc-900 w-fit">
          See full discussion
        </Link>
      )}
    </div>
  );
}

export default Discussion;
