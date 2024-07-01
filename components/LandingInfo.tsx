"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LandingInfo = () => {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-6xl bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Welcome to the todos app</h1>
            <p>Create your todos like you never did before</p>
            {session?.user?.email ? (
                <Button onClick={() => { router.push(`/todos`) }}>
                    Get Started
                </Button>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p>Sign in to get started</p>
                    <Button className="mt-3 w-32" onClick={() => signIn()}>Sign in</Button>
                </div>
            )}
        </div>
    )
}

export default LandingInfo