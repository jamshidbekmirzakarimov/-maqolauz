import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyQuotes() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("http://localhost:5055/quotes");
        if (!res.ok) throw new Error("Ma'lumotlarni yuklashda xatolik");
        const data = await res.json();

        // faqat o'zimga tegishli quoteslarni filtrlaymiz
        const myQuotes = data.filter((q) => q.user_id === userId);
        setQuotes(myQuotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!userId) {
      navigate("/login");
      return;
    }

    fetchQuotes();
  }, [userId]);

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">My Quotes</h1>
          <p className="text-sm text-gray-400 mt-0.5">{quotes.length} ta iqtibosiz</p>
        </div>
        <button
          onClick={() => navigate("/add-quote")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Add Quote
        </button>
      </div>

      {/* Empty state */}
      {quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3" stroke="#a5b4fc" strokeWidth="1.4" />
              <path d="M8 9h8M8 12h5M12 16v-4" stroke="#a5b4fc" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">Sizda hali iqtiboslar yo'q</p>
          <p className="text-xs text-gray-400 mt-1 mb-5">Birinchi iqtibosni yarating</p>
          <button
            onClick={() => navigate("/add-quote")}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
          >
            Iqtibos qo'shish
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quotes.map((quote) => (
            <MyQuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}

function MyQuoteCard({ quote }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200">

      {/* Title */}
      {quote.title && (
        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
          {quote.title}
        </p>
      )}

      {/* Text */}
      <p className="text-base text-gray-800 leading-relaxed italic mb-4">
        "{quote.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-xs font-medium text-indigo-600">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="3.5" r="2" stroke="#6366f1" strokeWidth="1.2" />
            <path d="M1 9c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Mening iqtibosim
        </span>

        {quote.created_at && (
          <span className="text-xs text-gray-300">
            {new Date(quote.created_at).toLocaleDateString("uz-UZ")}
          </span>
        )}
      </div>
    </div>
  );
}