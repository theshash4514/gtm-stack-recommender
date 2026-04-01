import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GTM Stack Recommender | Find Your Ideal Sales Stack",
  description:
    "Answer 6 questions, get a personalized 5-layer GTM tool stack recommendation with costs and setup order. Built from analysis of 100+ GTM tool combinations.",
  openGraph: {
    title: "What GTM Stack Should You Actually Use?",
    description:
      "Answer 6 questions. Get a personalized 5-layer recommendation in 30 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-montserrat)]">
        {children}
      </body>
    </html>
  );
}
