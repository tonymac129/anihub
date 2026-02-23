"use client";

import { createAuthClient } from "better-auth/client";
import { useState } from "react";
import Button from "./Button";

function SignInBtn() {
  const [loading, setLoading] = useState<boolean>(false);
  const authClient = createAuthClient();

  async function signIn() {
    setLoading(true);
    await authClient.signIn.social({ provider: "github" });
  }

  return <Button text={loading ? "Loading" : "Sign in"} onclick={() => signIn()} primary />;
}

export default SignInBtn;
