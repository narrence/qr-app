// import Image from "next/image";
import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center font-sans bg-gradient-to-b from-[#DFE2FF] to-[#FCFCFD]">
      <main className="flex flex-1 w-full max-w-[1248px] flex-col justify-center sm:items-start space-y-12">
        <div>
          <h1 className="text-6xl font-bold mb-3 text-[#5333CF]">
              Easier Link to QR Code
          </h1>
          <p className="text-2xl font-medium text-[#5333CF]">
              Helping you to make QR with easier step and simple
          </p>
        </div>

        <QRGenerator />
      </main>
    </div>
  );
}
