// import Image from "next/image";
import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start py-10 md:justify-center pb-10
                    font-sans bg-gradient-to-b from-[#DFE2FF] to-[#FCFCFD] overflow-x-hidden">

      <main className="flex w-full max-w-[1248px]
                      flex-col items-center justify-center
                      sm:items-start space-y-8 md:space-y-12">
        
        <div className="flex flex-col w-full items-center justify-center">
          
          <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl
                        font-bold mb-2 md:mb-3 text-[#5333CF] leading-tight">
              Easier Link to QR Code
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-2xl
                        font-medium text-[#5333CF] max-w-[600px]">
              Helping you to make QR with easier step
          </p>
        </div>
        
        <QRGenerator />
        
        <div className="w-full">
          <p className="text-xs sm:text-sm md:text-2sm text-gray-400 text-center">
            © Created from Nadi Design Project
          </p>
        </div>
      </main>
    </div>
  );
}
