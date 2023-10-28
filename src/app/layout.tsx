import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { GlobalContextProvider } from "./context/context";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReBookt",
  description: "Book Hotels on the secondary market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalContextProvider>
            <Nav></Nav>
            {children}
          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  );
}
