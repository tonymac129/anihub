import type { CommentType } from "@/types/Anime";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { likeComment } from "./actions";
import prisma from "@/lib/db";
import Image from "next/image";
import LikeComment from "./LikeComment";

async function Comment({ comment }: { comment: CommentType }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const liked = await prisma.comment.count({
    where: { id: comment.id, likedBy: { some: { id: session?.user.id } } },
  });
  const likes = await prisma.comment.findUnique({
    where: { id: comment.id },
    include: { _count: { select: { likedBy: true } } },
  });

  return (
    <div className="rounded-lg border-2 border-zinc-800 p-5 flex flex-col gap-y-3">
      <div className="flex items-center gap-x-5">
        <div className="flex items-center gap-x-2 font-bold text-white">
          {comment.user?.image ? (
            <Image
              src={comment.user.image}
              alt="Avatar"
              width={30}
              height={30}
              className="rounded-full border-2 border-zinc-800"
            />
          ) : (
            <FaUserCircle size={25} />
          )}
          {comment.user?.name}
        </div>
        <div className="text-sm" title={comment.createdAt.toISOString()}>
          {comment.createdAt.toLocaleDateString()}
        </div>
      </div>
      {comment.rating && (
        <div className="flex gap-x-1">
          {[...Array(comment.rating)].map((_, index) => (
            <FaStar key={index} className="text-orange-500" size={15} />
          ))}
        </div>
      )}
      <div>{comment.text}</div>
      <div className="flex gap-x-3 text-sm items-center">
        <LikeComment
          isLiked={liked ? true : false}
          likeComment={likeComment}
          commentID={comment.id}
          animeID={comment.animeId}
        />
        {likes?._count.likedBy || 0}
      </div>
    </div>
  );
}

export default Comment;
