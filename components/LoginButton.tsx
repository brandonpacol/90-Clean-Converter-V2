"use client"

import { signIn } from "next-auth/react"

export default function LoginButton() {
    return (
        <button
            className="bg-green-500 py-2 px-3 rounded-lg text-black mb-5 hover:bg-green-300 transition"
            onClick={() => signIn("spotify", { callbackUrl: "/home" })}
        >
            Log in with Spotify
        </button>
    )
}