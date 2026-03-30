import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddQuote() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", text: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      setError("Avval tizimga kiring");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5055/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          text: form.text,
          user_id: Number(user_id),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xatolik yuz berdi");

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Add Quote</h1>
        <p className="text-sm text-gray-400 mt-0.5">Yangi iqtibos qo'shing</p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 px-7 py-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sarlavha
            </label>
            <input
              name="title"
              type="text"
              placeholder="Iqtibos sarlavhasi..."
              value={form.title}
              onChange={handleChange}
              required
              className="h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Matn
            </label>
            <textarea
              name="text"
              rows={5}
              placeholder="Iqtibos matni..."
              value={form.text}
              onChange={handleChange}
              required
              className="px-3.5 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300 resize-none leading-relaxed"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-100">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.2" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-red-500">{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 h-10 rounded-lg border border-gray-200 text-sm text-gray-500 font-medium hover:bg-gray-50 transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-10 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="20 10" />
                  </svg>
                  Saqlanmoqda...
                </span>
              ) : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}