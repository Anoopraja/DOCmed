"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
  return (
    <button disabled>
      Loading...
    </button>
  );
}

  if (session) {
    return (
      <div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()}>
      Login
    </button>
  );
}
