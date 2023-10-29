import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { GlobalContextProvider } from "./context/context";
import Nav from "./components/nav";
import Footer from "./components/footer";

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
            <Nav />
            {children}
            <Footer />
          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  );
}
