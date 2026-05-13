"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ýalňyşlyk ýüze çykdy</h2>
        <p className="text-gray-500 mb-6">Произошла ошибка</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-2 rounded-xl">Gaýtadan synanyş</button>
          <Link href="/" className="btn-secondary px-6 py-2 rounded-xl">Baş sahypa</Link>
        </div>
      </div>
    </div>
  );
}
