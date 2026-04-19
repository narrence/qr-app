"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const router = useRouter();

    const login = async () => {
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("Login Gagal");
        } else {
            router.push("/qr-admin/app")
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            
            <div className="p-6 border rounder-xl w-80 space-y-4">
                <h1 className="text-xl font-bold">Admin Login</h1>

                <input
                    placeholder="Email"
                    className="border p-2 w-full rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="w-full bg-black text-white py-2 rounded"
                >
                    Login
                </button>

            </div>

        </div>
    );

}