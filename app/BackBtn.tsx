"use client";

import Button from "@/components/ui/Button";

function BackBtn() {
  return <Button text="Back" onclick={() => history.back()} />;
}

export default BackBtn;
