import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5055/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xatolik yuz berdi");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
              <path d="M5.5 6.5h5M5.5 8.5h3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900 tracking-tight">QuoteVault</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-gray-400 mb-6">Akkaunt yarating va boshlang</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">To'liq ism</label>
              <input
                name="full_name"
                type="text"
                placeholder="Ism Familiya"
                value={form.full_name}
                onChange={handleChange}
                required
                className="h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Username</label>
              <input
                name="username"
                type="text"
                placeholder="username123"
                value={form.username}
                onChange={handleChange}
                required
                className="h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Parol</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-gray-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-100">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.2" />
                  <path d="M7 4v3.5M7 9.5v.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-red-500">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-10 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="20 10" />
                  </svg>
                  Yuklanmoqda...
                </span>
              ) : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-5">
            Akkauntingiz bormi?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}