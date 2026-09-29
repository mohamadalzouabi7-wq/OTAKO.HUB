import { Play, Star, Info } from 'lucide-react';
import type { Anime, Route } from '@/types';

interface HeroProps {
  anime: Anime;
  navigate: (route: Route) => void;
}

export default function HeroBanner({ anime, navigate }: HeroProps) {
  const hasBanner = anime.banner && anime.banner.trim() !== '';
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hasBanner ? (
          <img src={anime.banner} alt={anime.titleAr} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0a2e] via-[#0c0a18] to-[#05030a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05030a] via-[#05030a]/70 to-[#05030a]/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#05030a]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 lg:pb-24">
        <div className="max-w-2xl animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border-[#ff2d95]/30 text-[#ff2d95] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ff2d95] animate-pulse" />
              الأكثر رواجاً الآن
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full glass border-[#fbbf24]/30 text-[#fbbf24] text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              {anime.rating}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-3 leading-tight">
            {anime.titleAr}
          </h1>
          <p className="text-sm lg:text-base text-gray-400 mb-4 font-medium tracking-wide">
            {anime.title} · {anime.year} · {anime.studio}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres.map((genre) => (
              <span key={genre} className="px-3 py-1.5 rounded-lg glass text-xs text-gray-200 font-medium">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-8 line-clamp-3 max-w-xl">
            {anime.synopsis}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate({ name: 'anime', animeId: anime.id })}
              className="group flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl bg-gradient-to-r from-[#b026ff] to-[#ff2d95] text-white font-bold text-sm lg:text-base shadow-lg shadow-[#b026ff]/30 hover:shadow-[#b026ff]/50 hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              شاهد الآن
            </button>
            <button
              onClick={() => navigate({ name: 'anime', animeId: anime.id })}
              className="flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl glass text-white font-bold text-sm lg:text-base hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <Info className="w-5 h-5" />
              التفاصيل
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#05030a] to-transparent pointer-events-none" />
    </section>
  );
}
