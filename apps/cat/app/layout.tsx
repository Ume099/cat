import Header from "./components/Header";
import "./globals.css";

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body>
        <Header />
        <main className="h-[calc(100vh-52px)] flex flex-col items-center justify-center px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
