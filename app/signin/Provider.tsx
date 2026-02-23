"use client";

import { createAuthClient } from "better-auth/client";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const icons: Record<string, React.ReactNode> = {
  google: <FaGoogle size={20} />,
  github: <FaGithub size={20} />,
};

function Provider({ provider }: { provider: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const authClient = createAuthClient();

  async function signIn() {
    setLoading(true);
    await authClient.signIn.social({ provider: provider.toLowerCase() });
  }

  return (
    <div
      className="bg-transparent hover:bg-zinc-900 text-zinc-300 border-zinc-800
      border-2 rounded-lg py-2.5 cursor-pointer font-bold flex items-center px-10 gap-x-5 justify-center"
      onClick={signIn}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {icons[provider.toLowerCase()]} Sign in with {provider}
        </>
      )}
    </div>
  );
}

export default Provider;
