import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./layout-grid.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dayanne Costa | Creator, Runner & Lifestyle",
  description: "O universo de Dayanne Costa: movimento, estilo, esporte e histórias que conectam.",
  metadataBase: new URL("https://dayannecosta.com"),
  openGraph: {
    title: "Dayanne Costa | Creator, Runner & Lifestyle",
    description: "O universo de Dayanne Costa: movimento, estilo, esporte e histórias que conectam.",
    url: "https://dayannecosta.com",
    siteName: "Dayanne Costa",
    images: [
      {
        url: "/dayanne-hero.png",
        width: 1200,
        height: 630,
        alt: "Dayanne Costa",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dayanne Costa | Creator, Runner & Lifestyle",
    description: "O universo de Dayanne Costa: movimento, estilo, esporte e histórias que conectam.",
    images: ["/dayanne-hero.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
