// import Image from "next/image";
import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold mb-6 text-center">
            QR Generator Simple
        </h1>

        <QRGenerator />
      </main>
    </div>
  );
}
