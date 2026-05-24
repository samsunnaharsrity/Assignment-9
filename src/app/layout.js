import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook",
  description: "Summer Essentials Store",
  icon: "/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
<ThemeProvider>
          <Navbar></Navbar>
        <main className="grow">
          {children}
          <ToastContainer />
        </main>
        <Footer></Footer>
</ThemeProvider>
      </body>
    </html>
  );
}
