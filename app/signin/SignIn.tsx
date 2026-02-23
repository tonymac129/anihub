"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Provider from "./Provider";
import { redirect } from "next/navigation";

const providers = ["Google", "GitHub"];

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [signUp, setSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim().length == 0 || (signUp && name.trim().length == 0) || password.trim().length == 0) {
      setError("Please fill in all the fields");
      return;
    }
    if (signUp) {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            redirect("/profile");
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          },
        },
      );
    } else {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/profile",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          },
        },
      );
    }
  }

  return (
    <div className="flex flex-col gap-y-5 w-80 m-auto">
      <form className="flex flex-col w-full gap-y-3" onSubmit={handleSubmit}>
        <label className="text-zinc-300 flex flex-col gap-y-1">
          Email
          <Input value={email} setValue={setEmail} placeholder="Put your email here" />
        </label>
        {signUp && (
          <label className="text-zinc-300 flex flex-col gap-y-1">
            Display name
            <Input value={name} setValue={setName} placeholder="Put your name here" />
          </label>
        )}
        <label className="text-zinc-300 flex flex-col gap-y-1">
          Password
          <Input type="password" value={password} setValue={setPassword} placeholder="Put your password here" />
        </label>
        <span className="text-zinc-400 text-sm">
          {signUp ? (
            <>
              Already have an account?{" "}
              <span className="underline cursor-pointer" onClick={() => setSignUp(false)}>
                Sign in
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account yet?{" "}
              <span className="underline cursor-pointer" onClick={() => setSignUp(true)}>
                Sign up
              </span>
            </>
          )}
        </span>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button text={loading ? "Loading..." : signUp ? "Sign up" : "Sign in"} primary submit />
      </form>
      <div className="relative w-full h-0.5 bg-zinc-800 flex items-center">
        <span className="px-2 bg-zinc-950 absolute left-[50%] -translate-x-[50%] text-zinc-300">or</span>
      </div>
      <div className="w-full flex flex-col gap-y-3">
        {providers.map((provider, i) => {
          return <Provider key={i} provider={provider} />;
        })}
      </div>
    </div>
  );
}

export default SignIn;
