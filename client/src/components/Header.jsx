import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "All Quotes", path: "/" },
    { label: "My Quotes", path: "/my-quotes" },
  ];

  const isActive = (path) => location.pathname === path;

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
          <span className="text-base font-medium text-gray-900 tracking-tight">
            QuoteVault
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 no-underline ${
                isActive(item.path)
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {isActive(item.path) && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
              {item.label}
            </Link>
          ))}

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
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 rounded transition-all duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-1 bg-white">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm no-underline transition-all duration-150 ${
                isActive(item.path)
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {isActive(item.path) && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
              {item.label}
            </Link>
          ))}
          <Link
            to="/add-quote"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white no-underline hover:bg-indigo-700 transition-all duration-150 mt-1"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Add Quote
          </Link>
        </div>
      )}
    </header>
  );
}