import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/QueryClientProvider";


export const metadata: Metadata = {
  title: "Cofrinho",
  description: "Organize suas finanças de forma simples e prática",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
