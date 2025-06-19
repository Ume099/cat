import Header from "./components/Header";
import "./globals.css";

import React from "react";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body>
        <Providers>
          <Header />
          <main className="h-[calc(100vh-52px)] flex flex-col items-center justify-center px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
