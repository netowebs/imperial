import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Auto Posto Imperial — Itaí/SP",
  description:
    "Auto Posto Imperial em Itaí/SP. Combustível Ipiranga, conveniência e troca de óleo. Avenida Justino Vieira, 203 — Vila Rica.",
  keywords: [
    "posto Itaí",
    "Auto Posto Imperial",
    "Ipiranga Itaí",
    "combustível Itaí",
    "troca de óleo Itaí",
    "conveniência Itaí",
  ],
  openGraph: {
    title: "Auto Posto Imperial — Itaí/SP",
    description:
      "Combustível Ipiranga, conveniência e troca de óleo em Itaí/SP.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}