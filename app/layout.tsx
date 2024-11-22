import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FaYoutube } from "react-icons/fa6";
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Livestream-YouTube",
  description: "Search for live streams on YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppinsFont.className} bg-zinc-950 text-zinc-50 antialiased`}
        >
          <header className="fixed top-0 z-50 w-full bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
              <h1 className="flex items-center text-2xl font-bold text-zinc-950">
                <FaYoutube className="mr-2 text-violet-500 w-8 h-8" />
                <span>Livestream-YouTube</span>
              </h1>
              <div className="flex items-center space-x-2 text-zinc-950 hover:bg-zinc-200 hover:rounded p-1">
                <SignedOut>
                  <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSwitchSessionUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
