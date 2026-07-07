import type { Metadata } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterScene from "@/components/FooterScene";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import profile from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Japanese serif display face for the home-page redesign. Latin is preloaded;
// kanji glyphs (惠, 世界…) load on demand via next/font's unicode-range slices.
const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} – ${profile.specialties[0]} · ${profile.specialties[1]}`,
  description: profile.summary,
  openGraph: {
    title: profile.name,
    description: profile.headline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.headline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-40ZDRMKLNW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-40ZDRMKLNW');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${shippori.variable} font-sans antialiased selection:bg-[var(--color-accent)] selection:text-white`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="animate-page-in flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <FooterScene />
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
