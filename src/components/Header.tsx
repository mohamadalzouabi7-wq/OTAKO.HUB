import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Flame, Home, Film, Menu, X } from 'lucide-react';
import { allGenres } from '@/data';
import type { Route } from '@/types';

interface HeaderProps {
  route: Route;
  navigate: (route: Route) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onGenreSelect: (genre: string) => void;
}

export default function Header({ route, navigate, searchQuery, setSearchQuery, onGenreSelect }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
        setGenreOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isHome = route.name === 'home';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? 'glass-strong shadow-2xl shadow-black/50' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate({ name: 'home' })}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b026ff] via-[#ff2d95] to-[#00f0ff] flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                O
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b026ff] to-[#00f0ff] blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300 -z-10" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg lg:text-xl font-black tracking-wider text-white">
                OTAKU<span className="text-gradient-neon">.HUB</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] hidden sm:block">عالم الأنمي العربي</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink active={isHome} onClick={() => navigate({ name: 'home' })} icon={<Home className="w-4 h-4" />}>
              الرئيسية
            </NavLink>

            {/* Categories Dropdown */}
            <div ref={genreRef} className="relative">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  genreOpen ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Flame className="w-4 h-4" />
                التصنيفات
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${genreOpen ? 'rotate-180' : ''}`} />
              </button>
              {genreOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 glass-strong rounded-2xl p-2 shadow-2xl shadow-black/50 animate-scale-in origin-top">
                  {allGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        onGenreSelect(genre);
                        setGenreOpen(false);
                      }}
                      className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#b026ff]/20 hover:to-[#ff2d95]/20 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span>{genre}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b026ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink active={route.name === 'movies'} onClick={() => navigate({ name: 'movies' })} icon={<Film className="w-4 h-4" />}>
              الأفلام
            </NavLink>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative group">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#b026ff] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن حلقة..."
                className="w-full glass rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b026ff]/50 transition-all duration-300 text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden glass rounded-lg p-2 text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-up space-y-3">
            <div className="relative md:hidden">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن حلقة..."
                className="w-full glass rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none text-right"
                dir="rtl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => { navigate({ name: 'home' }); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-right">
                <Home className="w-4 h-4" /> الرئيسية
              </button>
              <button onClick={() => { navigate({ name: 'movies' }); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-right">
                <Film className="w-4 h-4" /> الأفلام
              </button>
              <div className="px-4 py-2 text-xs text-gray-500 font-bold">التصنيفات</div>
              <div className="flex flex-wrap gap-2 px-4">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => { onGenreSelect(genre); setMobileOpen(false); }}
                    className="px-3 py-1.5 rounded-lg glass text-xs text-gray-300 hover:text-white hover:border-[#b026ff]/50 transition-all"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ children, active, onClick, icon }: { children: React.ReactNode; active?: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
        active ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
