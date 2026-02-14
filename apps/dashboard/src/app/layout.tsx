import "./globals.css";
import React from 'react';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <aside className="w-64 bg-white shadow-md">
            <h1 className="p-4 text-xl font-bold">Voxari AI</h1>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
