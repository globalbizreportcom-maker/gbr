import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { DashboardProvider } from "./dashboard/DashboardContext";
// import { CompanyProvider } from "@/context/CompanyContext";
import Script from "next/script";
import { AlertProvider } from "@/context/AlertProvider";
import ClientRedirectGuard from "@/utils/ClientRedirectGuard";
// import TawkMessenger from "@/components/TawkMessenger";


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

        {/* Google tag (gtag.js) Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-734050468"
          strategy="afterInteractive"
        />
        <Script id="ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-734050468', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google tag (gtag.js) Shub */}

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5B48DT575N"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5B48DT575N');
          `,
          }}
        />


        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '674979842003410');
fbq('track', 'PageView');`}
        </Script>


        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GDQ356RPWK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gbiz" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GDQ356RPWK');
        `}
        </Script>



        {/* tawk */}
        {/* <Script id="tawk-to" strategy="lazyOnload" >
          {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/5d23319f22d70e36c2a4ad4a/1is6fmlf2";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
        </Script> */}

        {/* <Script src="//code.tidio.co/mibylcfadd5kvacnf5olu0q8fkptyuto.js" async></Script> */}

        {/* NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=674979842003410&ev=PageView&noscript=1"
          />
        </noscript>

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ClientRedirectGuard />
        <DashboardProvider>
          {/* <CompanyProvider> */}
          <AlertProvider>
            {/* <TawkMessenger /> */}


            <Header />
            {children}
            <ScrollToTop />
            <Footer />
          </AlertProvider>
          {/* </CompanyProvider> */}
        </DashboardProvider>



      </body>

    </html>
  );
}
