"use client";

import { use, useState } from "react";
import QRCode from "qrcode";
import { WandSparkles,Download,RefreshCcw,AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { resolve } from "path";

export default function QRGenerator() {
    const [url, setUrl] = useState("");
    const [qr, setQr] = useState("");
    const [mode, setMode] = useState<"static" | "dynamic">("static");
    const [slug, setSlug] =  useState("");
    const [fileName, setFileName] = useState("");
    const [qrSvg, setQrSvg] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        // VALIDASI EMPTY URL
        if (!url.trim()) {
            setError("Fill in this link first, bro");
            return;
        }

        // Reset error kalau valud
        setError("");

        const isValidUrl = (value: string) => {
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        };

        // VALIDASI URL STRING
        if (!isValidUrl(url)) {
            setError("Enter a valid URL, bro (https://...)");
            return;
        }

        setLoading(true);
        setQr("");
        setQrSvg("");

        // TOAST GENERATE
        const toastId = toast.loading("Generating QR Code...");

        try {
            // Buat Delay Ketika Generate
            await delay(1300);
            // STATIC MODE
            if (mode === "static") {
                const png = await QRCode.toDataURL(url, {width:1024});
                const svg = await QRCode.toString(url, {
                    type: "svg",
                    width: 512,
                });
                
                setQr(png);
                setQrSvg(svg);
                setSlug("");
    
                toast.success("Successfully Create QR, Bro", {
                    id: toastId,
                });
    
                return;
            }
    
            // Dynamic Mode
            const res = await fetch("/api/create", {
                method: "POST",
                body: JSON.stringify({ url }),
            });
    
            const data = await res.json();
            const qrUrl = `${window.location.origin}/q/${data.slug}`;
            
            const png = await QRCode.toDataURL(qrUrl, {width: 1024});
            const svg = await QRCode.toString(qrUrl, {
                type: "svg",
                width: 512,
            });
            
            setQr(png);
            setQrSvg(svg);
            setSlug(data.slug);
    
            toast.success("Successfully Create QR, Bro", {
                id: toastId,
            });
        } catch (err) {
            console.error(err);

            // ERROR REPLACE
            toast.error("An error occurred while generating the QR code, Bro", {
                id: toastId,
            });
        } finally {
            setLoading(false)
        }
    };

    const resetQR = () => {
        setUrl("");
        setQr("");
        setQrSvg("");
        setSlug("");
        setFileName("");
        setMode("static"); // optional, balike default
    };

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="flex flex-row w-full max-width-[1248px] bg-gradient-to-b from-[#432CA7] to-[#3A2B84] p-[16px] rounded-[24px] shadow space-x-5">
            <div className="flex w-full p-[16px]">
                <div className="flex-col w-full space-y-5">
                    {/* INPUT LINK */}
                    <div className="flex-col">
                        <p className="text-l font-semibold mb-2">
                            Input Your Link Here *
                        </p>
                        <input
                            className="border-1 border-[#7060F6] p-3 w-full rounded-[12px]
                                        hover:border-violet-200 
                                        focus:border-violet-300 focus:ring-2 focus:ring-violet-200 
                                        outline-none transition"
                            placeholder="ex: https://example.com"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setError("");
                            }}    
                        />
                        {error && (
                            <p className="text-red-400 text-sm font-bold mt-2">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* INPUT NAME */}
                    <div className="flex-col">
                        <p className="text-l font-semibold mb-2">
                            Input QR Code Name
                        </p>
                        <input
                            className="border-1 border-[#7060F6] p-3 w-full rounded-[12px]
                                        hover:border-violet-200 
                                        focus:border-violet-300 focus:ring-2 focus:ring-violet-200 
                                        outline-none transition"
                            placeholder="ex: QR Code Google"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}    
                        />
                    </div>
                
                    {/* TOGGLE */}
                    <div className="flex-col">
                        <div className="flex pb-2 flex-row gap-2 items-center mb-1 relative">
                            <p className="text-l font-semibold">
                                Select QR Type *
                            </p>
                            <div className="relative">
                                <AlertCircle
                                size={20}
                                onClick={() => setOpen(!open)}
                                className="text-violet-300 cursor-pointer"
                                />
                                
                                {/* Tooltips */}
                                {open && (
                                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48
                                    bg-black text-white text-xs rounded-[12px] px-3 py-2 shadow">
                                    Static: Direct URL QR, Dynamic: Complete URL
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                            onClick={() => setMode("static")}
                            className={`px-4 py-2 rounded min-w-[124px] cursor-pointer ${
                                mode === "static" ? "bg-[#432CA7] border-1 border-[#EDEFFF] font-bold text-white rounded-[12px]" : "bg-[#3A2B84] border-1 border-[#7060F6] rounded-[12px]"
                            }`}
                            > Static
                            </button>

                            <button
                            onClick={() => setMode("dynamic")}
                            className={`px-4 py-2 rounded min-w-[124px] cursor-pointer ${
                                mode === "dynamic" ? "bg-[#432CA7] border-1 border-[#EDEFFF] font-bold text-white rounded-[12px]" : "bg-[#3A2B84] border-1 border-[#7060F6] rounded-[12px]"
                            }`}
                            >
                            Dynamic
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 justify-center items-center">
                        {/* GENERATE */}
                        <button
                        onClick={generate}
                        className="flex flex-row gap-3 items-center justify-center bg-[#7060F6] font-medium text-white px-6 py-3 rounded-[12px] w-full cursor-pointer
                                    hover:bg-[#817DFC] hover:scale-103 hover:rotate-1 hover:font-bold
                                    transition "
                        >
                            <WandSparkles size={24}/>
                            Do Magic Now
                        </button>
                        {/* RESET */}
                        <button
                        onClick={resetQR}
                        className="flex flex-row gap-3 px-6 cursor-pointer
                                    hover:font-bold hover:scale-102"
                        >
                            <RefreshCcw size={24}/>
                            Reset QR
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col space-x-2 w-full max-w-[424px] bg-[#A2A6FF] rounded-[16px] items-center justify-center p-[16px]">
                
                <div className="mb-2">
                    <p className="text-xl font-bold text-[#3A2B84]">
                        Your QR will Ready Here
                    </p>
                </div>
                
                {/* RESULT */}
                {(loading || qr) && (
                <div className="items-center justify-center text-center space-y-3">

                    {/* 🔥 SKELETON */}
                    {loading ? (
                    <div className="flex justify-center">
                        <div className="w-[280px] h-[280px] bg-gray-200 rounded-[12px] animate-pulse flex items-center justify-center">
                        <div className="grid grid-cols-6 gap-1">
                            {Array.from({ length: 36 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 bg-gray-300 rounded-sm"
                            />
                            ))}
                        </div>
                        </div>
                    </div>
                    ) : (
                    <>
                        {/* ✅ QR IMAGE */}
                        <img
                        src={qr}
                        alt="QR Code"
                        className="max-w-[280px] mx-auto rounded-[12px] transition-opacity duration-300"
                        />

                        {/* 🔗 DYNAMIC LINK */}
                        {mode === "dynamic" && (
                        <p className="text-sm font-medium text-[#3A2B84]">
                            QR Code URL: {window.location.origin}/q/{slug}
                        </p>
                        )}

                        {/* 📥 BUTTON DOWNLOAD */}
                        <div className="flex flex-row gap-3 justify-center">
                        <button
                            onClick={() => downloadPNG()}
                            className="flex gap-2 px-4 py-2 rounded-[12px] bg-violet-100 font-bold text-[#5333CF] items-center justify-center min-w-[96px] cursor-pointer hover:scale-105"
                        >
                            <Download size={16} />
                            PNG
                        </button>

                        <button
                            onClick={() => downloadSVG()}
                            className="flex gap-2 px-4 py-2 rounded-[12px] bg-violet-100 font-bold text-[#5333CF] items-center justify-center min-w-[96px] cursor-pointer hover:scale-105"
                        >
                            <Download size={16} />
                            SVG
                        </button>
                        </div>
                    </>
                    )}
                </div>
                )}

            </div>
        </div>
    );
}