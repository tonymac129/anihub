"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface FollowProps {
  isFollowing: boolean;
  userID: string;
  followUser: (userID: string) => Promise<number>;
}

function Follow({ isFollowing, userID, followUser }: FollowProps) {
  const [following, setFollowing] = useState<boolean>(isFollowing);

  async function handleFollow() {
    const response = await followUser(userID);
    setFollowing(response ? true : false);
  }

  return (
    <Button
      text={following ? "Following" : "Follow"}
      primary={!following}
      onclick={handleFollow}
    />
  );
}

export default Follow;
