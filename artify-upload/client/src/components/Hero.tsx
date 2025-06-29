import { Button } from "@/components/ui/button";
import { QrCode, Upload } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight">
              Track Your Art's <span className="text-accent-500">Journey</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Secure provenance tracking for physical artworks using QR codes and blockchain-verified ownership history. Every scan tells a story.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/qr/QR-1-1704067200000">
                  <Button 
                    size="lg" 
                    className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
                  >
                    <QrCode className="mr-2 h-5 w-5" />
                    Demo: Scan Valid QR
                  </Button>
                </Link>
                <Link href="/qr/INVALID-QR-CODE">
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold"
                  >
                    <QrCode className="mr-2 h-5 w-5" />
                    Demo: Invalid QR
                  </Button>
                </Link>
              </div>
              <Link href="/register">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Register Artwork
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            {/* Modern smartphone showing QR scanner interface */}
            <div className="relative mx-auto w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                <div className="bg-accent-500 h-8 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white rounded-full"></div>
                </div>
                <div className="p-4 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg">Scan QR Code</h3>
                    <p className="text-sm text-gray-500">Point camera at artwork tag</p>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center relative">
                    <div className="absolute inset-4 border-2 border-accent-500 rounded-lg">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-accent-500 rounded-tl"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-accent-500 rounded-tr"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-accent-500 rounded-bl"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-accent-500 rounded-br"></div>
                    </div>
                    <div className="w-20 h-20 bg-primary-900 opacity-20 grid grid-cols-4 gap-1 p-2">
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current"></div>
                      <div className="bg-current opacity-0"></div>
                      <div className="bg-current"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
