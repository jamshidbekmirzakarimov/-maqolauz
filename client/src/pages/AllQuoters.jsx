import { useEffect, useState } from "react";

export default function AllQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quotesRes, usersRes] = await Promise.all([
          fetch("http://localhost:5055/quotes"),
          fetch("http://localhost:5055/auth/users"),
        ]);

        if (!quotesRes.ok) throw new Error("Quoteslarni yuklashda xatolik");
        if (!usersRes.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");

        const quotesData = await quotesRes.json();
        const usersData = await usersRes.json();

        // usersni id bo'yicha map qilib olamiz: { 1: {...}, 2: {...} }
        const usersMap = {};
        usersData.forEach((u) => {
          usersMap[u.id] = u;
        });

        setQuotes(quotesData);
        setUsers(usersMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#e5e7eb" strokeWidth="2" />
            <path d="M9 2a7 7 0 017 7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.2" />
            <path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-red-500">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">All Quotes</h1>
        <p className="text-sm text-gray-400 mt-0.5">{quotes.length} ta iqtibos</p>
      </div>

      {/* Empty state */}
      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="3" width="16" height="16" rx="2.5" stroke="#d1d5db" strokeWidth="1.4" />
              <path d="M7 8h8M7 11h5" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">Hali iqtiboslar yo'q</p>
          <p className="text-xs text-gray-400 mt-1">Birinchi iqtibosni qo'shing</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} user={users[quote.user_id]} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteCard({ quote, user }) {
  const displayName = user?.full_name || user?.username || "Noma'lum";
  const username = user?.username || "";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200">

      {/* Title */}
      {quote.title && (
        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
          {quote.title}
        </p>
      )}

      {/* Quote text */}
      <p className="text-base text-gray-800 leading-relaxed italic mb-4">
        "{quote.text}"
      </p>

      {/* Footer: user + date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-indigo-600">{initials}</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-gray-700">{displayName}</span>
            {username && (
              <span className="text-xs text-gray-400">@{username}</span>
            )}
          </div>
        </div>

        {quote.created_at && (
          <span className="text-xs text-gray-300">
            {new Date(quote.created_at).toLocaleDateString("uz-UZ")}
          </span>
        )}
      </div>
    </div>
  );
}