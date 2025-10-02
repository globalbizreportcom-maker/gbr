import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { DashboardProvider } from "./dashboard/DashboardContext";
import { CompanyProvider } from "@/context/CompanyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Global Biz Report",
  description: "Global Leader in Business Credit Reports",
  icons: {
    icon: '/favicon.svg', // <-- this is your SVG favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardProvider>
          <CompanyProvider>
            <Header />
            {children}
            <ScrollToTop />
            <Footer />
          </CompanyProvider>
        </DashboardProvider>

      </body>
    </html>
  );
}
