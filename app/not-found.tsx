import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | test.com",
  description: "The page you're looking for doesn't exist. Return to our free REM to PX converter tool for responsive web design.",
  alternates:{
    canonical: undefined
  },
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-12">
          {/* 404 Error Icon */}
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-blue-500 dark:text-blue-400">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
              <line x1="9" x2="9.01" y1="9" y2="9"/>
              <line x1="15" x2="15.01" y1="9" y2="9"/>
            </svg>
          </div>

          {/* 404 Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}