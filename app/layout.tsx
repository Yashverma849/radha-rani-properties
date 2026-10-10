import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radha Rani Properties | Plots & Properties in Palam | Worldwide Financial Advisory",
  description:
    "Personalized assistance for plots, homes, and properties in Palam (Southwest Delhi), built on quiet trust and local roots—paired with pan-India and worldwide advisory for LIC insurance and housing loans.",
  keywords: [
    "Radha Rani Properties",
    "Plots in Palam",
    "Palam property dealer",
    "Palam Colony plots",
    "Sadh Nagar Palam builder floors",
    "Raj Nagar Palam property",
    "LIC Insurance Advisory",
    "Home Loan assistance",
  ],
  authors: [{ name: "Radha Rani Properties" }],
  openGraph: {
    title: "Radha Rani Properties | A Better Way to Find Your Place",
    description:
      "Founder-guided property sourcing and advisory across Delhi NCR. No phantom listings, no pressure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF8F4] text-[#242424] font-sans antialiased selection:bg-[#641E2B] selection:text-[#FAF8F4]">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
