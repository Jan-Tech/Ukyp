"use client";

import Link from "next/link";
import { useState } from "react";
import { type Locale, getT } from "@/lib/i18n";

export default function Navbar() {
  const [locale, setLocale] = useState<Locale>("tk");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = getT(locale);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Ukyp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <Link href="/search" className="hover:text-primary transition-colors">{t.nav.search}</Link>
          <Link href="/auth/login" className="hover:text-primary transition-colors">{t.nav.login}</Link>
          <Link href="/auth/register" className="btn-primary text-sm py-1.5">
            {t.nav.register}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setLocale("tk")}
              className={`px-2.5 py-1.5 font-semibold transition-colors ${locale === "tk" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
            >
              TK
            </button>
            <button
              onClick={() => setLocale("ru")}
              className={`px-2.5 py-1.5 font-semibold transition-colors ${locale === "ru" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
            >
              RU
            </button>
          </div>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700 mb-1" />
          <div className="w-5 h-0.5 bg-gray-700" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)}>{t.nav.home}</Link>
          <Link href="/search" onClick={() => setMenuOpen(false)}>{t.nav.search}</Link>
          <Link href="/auth/login" onClick={() => setMenuOpen(false)}>{t.nav.login}</Link>
          <Link href="/auth/register" onClick={() => setMenuOpen(false)}>{t.nav.register}</Link>
          <div className="flex gap-2 pt-2">
            <button onClick={() => setLocale("tk")} className={`px-3 py-1 rounded border text-xs font-bold ${locale === "tk" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>TK</button>
            <button onClick={() => setLocale("ru")} className={`px-3 py-1 rounded border text-xs font-bold ${locale === "ru" ? "bg-primary text-white border-primary" : "border-gray-200"}`}>RU</button>
          </div>
        </div>
      )}
    </header>
  );
}
