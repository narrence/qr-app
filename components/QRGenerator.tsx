"use client";

import { use, useState } from "react";
import QRCode from "qrcode";
import { WandSparkles  } from "lucide-react";

export default function QRGenerator() {
    const [url, setUrl] = useState("");
    const [qr, setQr] = useState("");
    const [mode, setMode] = useState<"static" | "dynamic">("static");
    const [slug, setSlug] =  useState("");
    const [fileName, setFileName] = useState("");
    const [qrSvg, setQrSvg] = useState("");

    const downloadPNG = (scale = 1) => {
        if (!qr) return;

        const link = document.createElement("a");

        // Fallback kalau user belum isi nama
        const safeName = fileName
            ? fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
            : "qr-code";

        link.download = `${safeName}.png`;
        link.href = qr;
        link.click();
    };

    const downloadSVG = () => {
        if (!qrSvg) return;

        const blob = new Blob([qrSvg], { type: "image/svg+xml" });
        const urlBlob = URL.createObjectURL(blob);

        const link = document.createElement("a");

        const safeName = fileName
            ? fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
            : "qr-code";

        link.href = urlBlob;
        link.download = `${safeName}.svg`;
        link.click();
    };

    const generate = async () => {
        if (!url) return;

        // STATIC MODE
        if (mode === "static") {
            const png = await QRCode.toDataURL(url, {width:512});
            const svg = await QRCode.toString(url, {
                type: "svg",
                width: 512,
            });

            setQr(png);
            setQrSvg(svg);
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
        
        const png = await QRCode.toDataURL(qrUrl, {width: 512});
        const svg = await QRCode.toString(qrUrl, {
            type: "svg",
            width: 512,
        });

        setQr(png);
        setQrSvg(svg);
        setSlug(data.slug);
    };

    return (
        <div className="flex flex-row w-full max-width-[1248px] bg-gradient-to-b from-[#432CA7] to-[#3A2B84] p-[16px] rounded-[24px] shadow space-x-4">
            <div className="flex w-full p-[16px]">
                <div className="flex-col w-full space-y-4">
                    {/* INPUT LINK */}
                    <input
                        className="border-1 border-[#7060F6] p-3 w-full rounded-[12px]
                                    hover:border-violet-200 
                                    focus:border-violet-300 focus:ring-2 focus:ring-violet-200 
                                    outline-none transition"
                        placeholder="ex: https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}    
                    />

                    {/* INPUT NAME */}
                    <input
                        className="border-1 border-[#7060F6] p-3 w-full rounded-[12px]
                                    hover:border-violet-200 
                                    focus:border-violet-300 focus:ring-2 focus:ring-violet-200 
                                    outline-none transition"
                        placeholder="ex: QR Code Google"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}    
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
                    className="flex flex-row gap-3 items-center justify-center bg-[#7060F6] font-medium text-white px-6 py-3 rounded-[12px] w-full
                                hover:bg-[#817DFC] hover:scale-103 hover:rotate-1 hover:font-bold
                                transition"
                    >
                        <WandSparkles size={24}/>
                        Do Magic Now
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col space-x-2 w-full max-w-[424px] bg-[#A2A6FF] rounded-[16px] items-center justify-center p-[16px]">
                
                <div className="mb-2">
                    <p className="text-xl font-bold text-[#3A2B84]">
                        Your QR will Ready Here
                    </p>
                </div>
                {/* RESULT */}
                {qr && (
                    <div className="items-center justify-center text-center space-y-3">
                        <img src={qr} alt="QR Code" className="min-w-[200px] mx-auto rounded-[12px]" />

                        {mode === "dynamic" && (
                            <p className="text-sm text-gray-500">
                                {window.location.origin}/q/{slug}
                            </p>
                        )}

                        {/* Button Download */}
                        <div className="
                            flex flex-col
                            gap-3
                            justify-center">
                            <button
                                onClick={() => downloadPNG()}
                                className="px-4 py-2 rounded-[12px] bg-violet-100 font-bold text-[#5333CF]
                                            hover:scale-105"
                                >
                                Download PNG
                            </button>
                            <button
                                onClick={() => downloadSVG()}
                                className="px-4 py-2 rounded-[12px] bg-violet-100 font-bold text-[#5333CF]
                                            hover:scale-105"
                                >
                                Download SVG
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}