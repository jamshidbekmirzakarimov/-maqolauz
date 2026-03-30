import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Logo + desc */}
          <div className="flex flex-col gap-3">
            <Link to="/all-quotes" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
                  <path d="M5.5 6.5h5M5.5 8.5h3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-base font-medium text-gray-900 tracking-tight">QuoteVault</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Ilhomlantiradigan iqtiboslarni saqlang, ulashing va kashf eting.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Sahifalar</p>
              <Link to="/all-quotes" className="text-sm text-gray-400 hover:text-gray-700 no-underline transition-colors">All Quotes</Link>
              <Link to="/my-quotes" className="text-sm text-gray-400 hover:text-gray-700 no-underline transition-colors">My Quotes</Link>
              <Link to="/add-quote" className="text-sm text-gray-400 hover:text-gray-700 no-underline transition-colors">Add Quote</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Akkaunt</p>
              <Link to="/login" className="text-sm text-gray-400 hover:text-gray-700 no-underline transition-colors">Kirish</Link>
              <Link to="/register" className="text-sm text-gray-400 hover:text-gray-700 no-underline transition-colors">Ro'yxatdan o'tish</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">
            © {currentYear} QuoteVault. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-gray-300">Barcha tizimlar ishlayapti</span>
          </div>
        </div>
      </div>
    </footer>
  );
}