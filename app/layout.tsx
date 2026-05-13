import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Ukyp — Hünärmen tap",
  description: "Türkmenistanda iň gowy hünärmenleri tapyň",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tk">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-primary text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm opacity-80">
            © 2026 Ukyp. Türkmenistan.
          </div>
        </footer>
      </body>
    </html>
  );
}
