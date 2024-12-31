import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="text-center px-4 py-16">
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              404
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto mb-8">
            The page you&apos;re looking for seems to have vanished into thin air!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
