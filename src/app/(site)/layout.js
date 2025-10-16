import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { DashboardProvider } from "./dashboard/DashboardContext";
import { CompanyProvider } from "@/context/CompanyContext";
import Script from "next/script";

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
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <head>

        {/* Global Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V3HJM73PRS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3HJM73PRS', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

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
