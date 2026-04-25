"use client";

import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeCommentProps {
  isLiked: boolean;
  likeComment: (commentID: string, animeID: number) => Promise<void>;
  commentID: string;
  animeID: number;
}

function LikeComment({
  isLiked,
  likeComment,
  commentID,
  animeID,
}: LikeCommentProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      onClick={() => likeComment(commentID, animeID)}
    >
      {isLiked ? (
        <FaHeart
          size={15}
          className="cursor-pointer text-red-500"
          title="Like comment"
        />
      ) : (
        <FaRegHeart
          size={15}
          className="cursor-pointer text-zinc-300"
          title="Like comment"
        />
      )}
    </motion.div>
  );
}

export default LikeComment;
