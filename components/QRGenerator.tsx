"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { WandSparkles  } from "lucide-react";

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
        <div className="flex flex-row w-full max-width-[1248px] bg-gradient-to-b from-[#432CA7] to-[#3A2B84] p-[16px] rounded-[24px] shadow space-x-4">
            <div className="flex w-full p-[16px]">
                <div className="flex-col w-full space-y-4">
                    {/* INPUT */}
                    <input
                        className="border-1 border-[#7060F6] p-3 w-full rounded-[12px]
                                    hover:border-violet-200 
                                    focus:border-violet-300 focus:ring-2 focus:ring-violet-200 
                                    outline-none transition"
                        placeholder="ex: https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}    
                    />
                
                    {/* TOGGLE */}
                    <div className="flex gap-4">
                        <button
                        onClick={() => setMode("static")}
                        className={`px-4 py-2 rounded min-w-[124px] ${
                            mode === "static" ? "bg-[#432CA7] border-1 border-[#EDEFFF] font-bold text-white rounded-[12px]" : "bg-[#3A2B84] border-1 border-[#7060F6] rounded-[12px]"
                        }`}
                        > Static
                        </button>

                        <button
                        onClick={() => setMode("dynamic")}
                        className={`px-4 py-2 rounded min-w-[124px] ${
                            mode === "dynamic" ? "bg-[#432CA7] border-1 border-[#EDEFFF] font-bold text-white rounded-[12px]" : "bg-[#3A2B84] border-1 border-[#7060F6] rounded-[12px]"
                        }`}
                        >
                        Dynamic
                        </button>
                    </div>

                    {/* GENERATE */}
                    <button
                    onClick={generate}
                    className="flex flex-row gap-3 items-center justify-center bg-[#7060F6] text-white px-6 py-3 rounded-[12px] w-full
                                hover:bg-[#817DFC] hover:scale-103 hover:rotate-1
                                transition"
                    >
                        <WandSparkles size={24}/>
                        Do Magic Now
                    </button>
                </div>
            </div>
            
            <div className="flex w-full max-w-[424px] bg-[#A2A6FF] rounded-[16px]">
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
        </div>
    );
}