import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesHovered, setServicesHovered] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const headerGlassStyle = {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const dropdownGlassStyle = {
    background: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  };

  const mobileMenuStyle = {
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services', hasDropdown: true },
    { path: '/media', label: 'Media' },
    { path: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { path: '/licensing', label: 'Licensing' },
    { path: '/complaints', label: 'Complaints' },
    { path: '/deviceRegistration', label: 'Device Registration' },
    { path: '/licensing', label: 'Spectrum Management' },
    { path: '/compliance', label: 'Regulatory Compliance' },
    { path: '/dashboard', label: 'Quality of Service Monitoring' },
    { path: '/tracking', label: 'Tracking Page' },
  ];

  // All searchable pages
  const searchablePages = [
    { path: '/', label: 'Home', keywords: ['home', 'bocra', 'main'] },
    { path: '/about', label: 'About', keywords: ['about', 'bocra', 'who we are', 'mission', 'vision'] },
    { path: '/services', label: 'Services', keywords: ['services', 'offerings'] },
    { path: '/media', label: 'Media & Events', keywords: ['media', 'events', 'news', 'announcements', 'press'] },
    { path: '/contact', label: 'Contact', keywords: ['contact', 'reach us', 'phone', 'email', 'address'] },
    { path: '/licensing', label: 'Licensing', keywords: ['licensing', 'licence', 'spectrum', 'spectrum management'] },
    { path: '/complaints', label: 'Complaints', keywords: ['complaints', 'report', 'issue', 'dispute'] },
    { path: '/services/device-registration', label: 'Device Registration', keywords: ['device', 'registration', 'register device', 'type approval'] },
    { path: '/services/regulatory-compliance', label: 'Regulatory Compliance', keywords: ['regulatory', 'compliance', 'regulations', 'rules'] },
    { path: '/services/quality-of-service-monitoring', label: 'Quality of Service Monitoring', keywords: ['quality', 'service', 'monitoring', 'qos'] },
    { path: '/login', label: 'Login', keywords: ['login', 'sign in', 'account'] },
    { path: '/register', label: 'Register', keywords: ['register', 'sign up', 'create account'] },
  ];

  const searchResults = searchQuery.trim().length > 0
    ? searchablePages.filter(page =>
        page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.some(k => k.includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = () => location.pathname.startsWith('/services');

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{ ...headerGlassStyle, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#0095DA]" />
              <div className="w-2 h-2 rounded-full bg-[#00A651]" />
              <div className="w-2 h-2 rounded-full bg-[#E6007E]" />
              <div className="w-2 h-2 rounded-full bg-[#FDB913]" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">BOCRA</span>
          </Link>

          {/* Desktop Navigation (CENTERED) */}
          <nav className="hidden md:flex items-center gap-1 mx-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  ref={dropdownRef}
                  className="relative h-16 flex items-center"
                  onMouseEnter={() => setServicesHovered(true)}
                  onMouseLeave={() => setServicesHovered(false)}
                >
                  <div className={`flex items-center cursor-pointer px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                    isServicesActive() ? 'border-orange-500 text-[#0077B3]' : 'border-transparent text-gray-700'
                  }`}>
                    <Link to={link.path}>{link.label}</Link>
                    <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${servicesHovered ? 'rotate-180' : ''}`} />
                  </div>

                  {servicesHovered && (
                    <div
                      style={dropdownGlassStyle}
                      className="absolute top-[60px] left-0 w-72 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="py-2">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className={`block px-5 py-3 text-sm transition-all ${
                              isActive(service.path)
                                ? 'bg-[#0095DA]/10 text-[#0077B3] font-bold'
                                : 'text-gray-800 hover:bg-[#0095DA] hover:text-white'
                            }`}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                    isActive(link.path)
                      ? 'border-orange-500 text-[#0077B3]'
                      : 'border-transparent text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <div ref={searchRef} className="relative flex items-center">
              {/* Expanding search bar */}
              <div className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out rounded-lg ${
                searchOpen
                  ? 'w-52 bg-white/60 border border-white/50 shadow-sm backdrop-blur-md'
                  : 'w-8'
              }`}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#0095DA] transition-colors"
                  aria-label="Toggle search"
                >
                  <Search size={16} />
                </button>

                {searchOpen && (
                  <form onSubmit={handleSearchSubmit} className="flex-1 pr-2">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-1"
                    />
                  </form>
                )}
              </div>

              {/* Search results dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div
                  style={dropdownGlassStyle}
                  className="absolute top-10 right-0 w-64 rounded-xl overflow-hidden z-50"
                >
                  {searchResults.map((result) => (
                    <Link
                      key={result.path}
                      to={result.path}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-[#0095DA] hover:text-white transition-all"
                    >
                      <Search size={13} className="opacity-40 flex-shrink-0" />
                      {result.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* No results */}
              {searchOpen && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div
                  style={dropdownGlassStyle}
                  className="absolute top-10 right-0 w-64 rounded-xl overflow-hidden z-50"
                >
                  <p className="px-4 py-3 text-sm text-gray-400">No results for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/30 transition-all rounded-lg"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-[#0095DA]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#0077B3]/90 transition-all rounded-lg"
            >
              Register
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-white/20 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          style={mobileMenuStyle}
          className="md:hidden absolute w-full shadow-2xl animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[calc(100vh-64px)]"
        >
          <div className="p-4 space-y-2">

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white transition-all"
              />
            </div>

            {navLinks.map((link) => (
              <div key={link.path}>
                <div className="flex items-center justify-between py-2.5 px-2">
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold ${
                      isActive(link.path) || (link.hasDropdown && isServicesActive())
                        ? 'text-[#0077B3]'
                        : 'text-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>

                  {link.hasDropdown && (
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="p-2 text-gray-500"
                    >
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {link.hasDropdown && mobileServicesOpen && (
                  <div className="ml-4 border-l-2 border-[#0095DA]/30 pl-4 flex flex-col gap-1 mt-1">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`py-3 text-sm ${
                          isActive(s.path) ? 'text-[#0077B3] font-bold' : 'text-gray-600'
                        }`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}
