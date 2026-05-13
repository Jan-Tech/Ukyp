import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">404 — Sahypa tapylmady</h2>
        <p className="text-gray-500 mb-6">Страница не найдена</p>
        <Link href="/" className="btn-primary px-6 py-2 rounded-xl inline-block">Baş sahypa</Link>
      </div>
    </div>
  );
}
