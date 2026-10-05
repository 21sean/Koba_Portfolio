import type { Metadata } from "next";
import { Platypi, Schibsted_Grotesk, Shippori_Mincho } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterScene from "@/components/FooterScene";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import profile from "@/data/profile";
import { SITE_URL } from "@/lib/site";

// English display face: Platypi, a wedge-serif whose sharp, carved-looking
// serifs echo the woodblock-print artwork. Variable weight, with true italics
// for emphasis.
const platypi = Platypi({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Text and UI face: a crisp editorial grotesque.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Japanese mincho, now used only for CJK glyphs: the kanji watermark, 小林惠美,
// the tategaki column, the hanko seal, and Japanese/Chinese headings via the
// `.font-display` fallback chain. Nothing Latin renders in it, so nothing is
// preloaded; kanji load on demand via next/font's unicode-range slices.
const shippori = Shippori_Mincho({
  weight: ["500", "600", "700"],
  variable: "--font-mincho",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} – ${profile.specialties[0]} · ${profile.specialties[1]}`,
  description: profile.summary,
  // Allow ordinary search indexing; opt out of AI training/scraping. The
  // noai/noimageai directives sit alongside robots.txt and the TDM
  // reservation as a per-page signal for crawlers that read meta tags.
  // Set via `other` so the standard and AI tokens share one robots meta tag.
  other: {
    robots: "index, follow, noai, noimageai",
  },
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
      <body className={`${platypi.variable} ${schibsted.variable} ${shippori.variable} font-sans antialiased`}>
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
