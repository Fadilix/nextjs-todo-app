"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    return (
        <div className="flex mx-10 items-center justify-between mt-4">
            <div className="space-x-10">
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
            </div>

            {session?.user?.email ? (
                <div className="flex space-x-2 items-center">
                    <Link href="/">{session?.user?.name}</Link>
                    <button className="rounded-xl border border-black p-2" onClick={() => signOut()}>Sign out</button>
                </div>
            ) : (
                <button className="rounded-xl border border-black p-2" onClick={() => signIn()}>Sign in</button>
            )}
        </div>
    )
}

export default Navbar;