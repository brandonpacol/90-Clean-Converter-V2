"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button className="bg-white py-2 px-3 mr-5 rounded-lg text-black hover:opacity-85 transition" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Sign out</button>
    )
}