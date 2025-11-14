import type { Metadata } from "next";
import { Bai_Jamjuree, Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/(frontend)/shared/components/main-header/Header";
import Footer from "@/app/(frontend)/shared/components/Footer";
import Provider from "@/components/providers/Provider";

// TWKEverett Local Font Configuration
const twkEverett = localFont({
  src: [
    {
      path: "fonts/TWKEverett-Black-web.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-BlackItalic-web.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Bold-web.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-BoldItalic-web.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Extrabold-web.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-ExtraboldItalic-web.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Hairline-web.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-HairlineItalic-web.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Light-web.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-LightItalic-web.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Medium-web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-MediumItalic-web.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Regular-web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-RegularItalic-web.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Super-web.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-SuperItalic-web.woff2",
      weight: "950",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Thin-web.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-ThinItalic-web.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "fonts/TWKEverett-Ultralight-web.woff2",
      weight: "250",
      style: "normal",
    },
    {
      path: "fonts/TWKEverett-UltralightItalic-web.woff2",
      weight: "250",
      style: "italic",
    },
  ],
  variable: "--font-twk-everett",
});

// Bai Jamjuree Google Font Configuration
const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || "Nasy Perfumes",
  description:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    "Discover the finest perfumes at Nasy Perfumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} ${twkEverett.variable} ${poppins.variable} ${roboto.variable}`}
      >
        <Provider>
          <Header />
          {children}
          {/* <Footer /> */}
        </Provider>
      </body>
    </html>
  );
}
