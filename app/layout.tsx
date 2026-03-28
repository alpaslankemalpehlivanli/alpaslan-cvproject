import type { Metadata } from "next";
import { Bangers, Nunito, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  title: "Alpaslan Kemal Pehlivanlı — Game Designer",
  description: "Portfolio of Alpaslan Kemal Pehlivanlı, game designer and co-founder of TigerOne Studios. Explore projects, achievements, and CV.",
  openGraph: {
    title: "Alpaslan Kemal Pehlivanlı — Game Designer",
    description: "Portfolio of Alpaslan Kemal Pehlivanlı, game designer and co-founder of TigerOne Studios.",
    type: "profile",
    locale: "en_US",
    images: [{ url: "/cover1.png", width: 240, height: 340, alt: "Portfolio cover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpaslan Kemal Pehlivanlı — Game Designer",
    description: "Portfolio of Alpaslan Kemal Pehlivanlı, game designer and co-founder of TigerOne Studios.",
    images: ["/cover1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${nunito.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
