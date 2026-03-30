import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const isLoggedIn = !!token;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const initials = username ? username.slice(0, 2).toUpperCase() : "??";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/all-quotes" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
              <path d="M5.5 6.5h5M5.5 8.5h3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-base font-medium text-gray-900 tracking-tight">QuoteVault</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">

          {/* All Quotes — har doim ko'rinadi */}
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 no-underline ${
              isActive("/")
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            All Quotes
          </Link>

          {/* My Quotes va Add Quote — faqat login qilganda */}
          {isLoggedIn && (
            <>
              <Link
                to="/my-quotes"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 no-underline ${
                  isActive("/my-quotes")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {isActive("/my-quotes") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                My Quotes
              </Link>

              <div className="w-px h-5 bg-gray-200 mx-1.5" />

              <Link
                to="/add-quote"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 no-underline ${
                  isActive("/add-quote")
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Add Quote
              </Link>
            </>
          )}

          {/* Login tugmasi — login qilmagan bo'lsa */}
          {!isLoggedIn && (
            <>
              <div className="w-px h-5 bg-gray-200 mx-1.5" />
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white no-underline hover:bg-indigo-700 transition-all duration-150"
              >
                Kirish
              </Link>
            </>
          )}

          {/* Profile dropdown — login qilgan bo'lsa */}
          {isLoggedIn && (
            <div className="relative ml-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-150"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-700">{initials}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{username}</span>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`text-gray-400 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 no-underline transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="5" r="2.5" stroke="#6b7280" strokeWidth="1.2" />
                      <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Profil
                  </Link>
                  <div className="h-px bg-gray-100 mx-3" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-1 bg-white">
          <Link
            to="/all-quotes"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm no-underline transition-all ${
              isActive("/all-quotes") ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {isActive("/all-quotes") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            All Quotes
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/my-quotes"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm no-underline transition-all ${
                  isActive("/my-quotes") ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {isActive("/my-quotes") && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                My Quotes
              </Link>
              <Link
                to="/add-quote"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white no-underline hover:bg-indigo-700 transition-all mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Add Quote
              </Link>
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex items-center gap-2.5 px-4 py-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-700">{initials}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all text-left"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Chiqish
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white no-underline hover:bg-indigo-700 transition-all mt-1"
            >
              Kirish
            </Link>
          )}
        </div>
      )}
    </header>
  );
}