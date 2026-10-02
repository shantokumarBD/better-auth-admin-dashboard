"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const navLink = isPending ? (
    <>
      <li><div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 my-3"></div></li>
      <li><div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 my-3"></div></li>
      <li><div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 my-3"></div></li>
    </>
  ) : session?.user ? (
    // Links for Logged-in Users (Admin/Dashboard)
    <>
      <li>
        <Link href="/dashboard" className="block py-2 font-medium">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/profile" className="block py-2">
          Profile
        </Link>
      </li>
    </>
  ) : (
    // Links for Guests / Non-logged-in Users
    <>
      <li>
        <Link href="/" className="block py-2">
          Home
        </Link>
      </li>
      <li>
        <Link href="/features" className="block py-2">
          Features
        </Link>
      </li>
      <li>
        <Link href="/pricing" className="block py-2">
          Pricing
        </Link>
      </li>
    </>
  );

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  const navButton = isPending ? (
    <div className="flex gap-2 items-center">
      <div className="h-8 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="h-10 w-24 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
    </div>
  ) : (
    <>
      {session?.user ? (
        <>
          <h4>welcome, {session.user.name}</h4>
          <Button onClick={handleSignOut}>Logout</Button>
        </>
      ) : (
        <>
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">
            {" "}
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <p className="font-bold">ACME</p>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{navLink}</ul>
        <div className="hidden items-center gap-4 md:flex">{navButton}</div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navLink}
            {navButton}
          </ul>
        </div>
      )}
    </nav>
  );
}
