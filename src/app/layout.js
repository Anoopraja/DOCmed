
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Home from "@/app/Home/page"
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DOCmed - Online Healthcare Store",
  description:
    "Shop healthcare essentials with DOCmed, your online healthcare store.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 overflow-hidden bg-white">
          <Sidebar />

          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>

        <div className=" lg:flex flex-1">
        {/* <Footer /> */}
        </div>  
      </body>
    </html>
  );
}
