"use client";

import type { CommentType } from "@/types/Anime";
import { useState } from "react";
import Button from "../ui/Button";

type CommentFieldProps = {
  animeId: number;
  signedIn: boolean;
  name: string;
  addComment: (animeId: number, comment: CommentType) => Promise<void>;
};

function CommentField({ animeId, signedIn, name, addComment }: CommentFieldProps) {
  const [comment, setComment] = useState<CommentType>({
    id: "",
    animeId: animeId,
    createdAt: new Date(),
    userId: name,
    text: "",
  });

  function handleAddComment() {
    addComment(animeId, comment);
    setComment({ ...comment, text: "" });
  }

  return (
    <div>
      {signedIn ? (
        <div className="flex flex-col gap-y-3 rounded-lg p-5 border-2 border-zinc-800">
          <h2 className="font-bold text-lg">New comment</h2>
          <h4 className="text-sm text-zinc-300">Commenting as {name}</h4>
          <textarea
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
            placeholder="What do you think about this anime series?"
            className="bg-zinc-900 rounded-lg text-white px-4 py-2 resize-none outline-none h-40 w-full"
          ></textarea>
          <Button text="Post comment" primary fit onclick={handleAddComment} />
        </div>
      ) : (
        <div className="flex flex-col gap-y-5 items-center rounded-lg py-10 border-2 border-zinc-800">
          Sign in to leave a comment! <Button text="Sign in" link="/signin" fit primary />
        </div>
      )}
    </div>
  );
}

export default CommentField;
