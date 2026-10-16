"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function RegisterLink() {
  const { data: session, status } = useSession();

  // Session load hone tak link mat dikhao
  if (status === "loading") return null;

  // Login hai toh Register link hide karo
  if (session) return <>
    <Link
      href="/me">

      <User size={18} />
    </Link>
  </>;

  return (
    <button>
      <Link
        href="/register"  
      >
        Register
      </Link>
    </button>
  );
}