import type { CommentType } from "@/types/Anime";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="rounded-lg border-2 border-zinc-800 p-5 flex flex-col gap-y-5">
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
      <div>{comment.text}</div>
    </div>
  );
}

export default Comment;
