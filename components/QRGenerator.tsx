"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
    const [url, setUrl] = useState("");
    const [qr, setQr] = useState("");
    const [mode, setMode] = useState<"static" | "dynamic">("static");
    const [slug, setSlug] =  useState("");

    const generate = async () => {
        if (!url) return;

        // STATIC MODE
        if (mode === "static") {
            const qrImage = await QRCode.toDataURL(url);
            setQr(qrImage);
            setSlug("");
            return;
        }

        // Dynamic Mode
        const res = await fetch("/api/create", {
            method: "POST",
            body: JSON.stringify({ url }),
        });

        const data = await res.json();

        const qrUrl = `${window.location.origin}/q/${data.slug}`;
        const qrImage = await QRCode.toDataURL(qrUrl);

        setQr(qrImage);
        setSlug(data.slug);
    };

    return (
        <div className="space-y-6">
            {/* INPUT */}
            <input
                className="border p-3 w-full rounded"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}    
            />
        
            {/* TOGGLE */}
            <div className="flex gap-4">
                <button
                onClick={() => setMode("static")}
                className={`px-4 py-2 rounded ${
                    mode === "static" ? "bg-black text-white" : "border"
                }`}
                > static
                </button>

                <button
                onClick={() => setMode("dynamic")}
                className={`px-4 py-2 rounded ${
                    mode === "dynamic" ? "bg-black text-white" : "border"
                }`}
                >
                Dynamic
                </button>
            </div>

            {/* GENERATE */}
            <button
            onClick={generate}
            className="bg-black text-white px-6 py-3 rounded w-full"
            >
                Generate QR
            </button>

            {/* RESULT */}
            {qr && (
                <div className="text-center space-y-3">
                    <img src={qr} alt="QR Code" className="mx-auto" />

                    {mode === "dynamic" && (
                        <p className="text-sm text-gray-500">
                            {window.location.origin}/q/{slug}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}