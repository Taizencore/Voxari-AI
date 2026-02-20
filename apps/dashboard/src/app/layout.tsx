import "./globals.css";
import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
            <div className="p-6">
              <h1 className="text-2xl font-bold tracking-tight text-white">Voxari AI</h1>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Autonomous Workforce</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 py-4">
              <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-800 text-white">
                <span>Dashboard</span>
              </Link>
              <Link href="/workforce" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
                <span>AI Workforce</span>
              </Link>
              <Link href="/leads" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
                <span>Growth & Leads</span>
              </Link>
              <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
                <span>Settings</span>
              </Link>
            </nav>
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">JD</div>
                <div className="text-sm">
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-slate-400">MedSpa Clinic</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto relative focus:outline-none bg-slate-50">
            <div className="py-8 px-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
