import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const slab = Roboto_Slab({
  variable: "--font-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AgroAutoSur | Autos, pickups y soluciones agro",
    template: "%s | AgroAutoSur",
  },
  description:
    "Marketplace para comprar, vender, financiar y publicar vehículos, pickups, maquinaria e implementos agro.",
  icons: {
    icon: "/brand/agroautosur-icon-transparent.png",
    apple: "/brand/agroautosur-icon-transparent.png",
  },
  openGraph: {
    title: "AgroAutoSur",
    description: "Autos, pickups y soluciones agro para comprar, vender y financiar mejor.",
    images: ["/brand/agroautosur-logo-transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${slab.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
