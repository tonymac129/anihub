import type { CommentType } from "@/types/Anime";
import { addComment } from "./actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import CommentField from "@/components/anime/CommentField";
import Comment from "@/components/anime/Comment";

async function Discussion({ id }: { id: number }) {
  const anime = await prisma.anime.findUnique({
    where: { id: id },
    include: { comments: { include: { user: true }, orderBy: { createdAt: "desc" } } },
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
        Comment{anime?.comments?.length === 1 ? "" : "s"} ({anime?.comments?.length || 0})
      </h2>
      <div className="flex flex-col gap-y-3">
        {anime?.comments && anime.comments.length > 0 ? (
          anime?.comments.map((comment) => <Comment key={comment.id} comment={comment as CommentType} />)
        ) : (
          <div>No comments yet. Be the first one to comment on this anime!</div>
        )}
      </div>
    </div>
  );
}

export default Discussion;
