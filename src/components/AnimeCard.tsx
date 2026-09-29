import { Star, Play } from 'lucide-react';
import type { Anime, Route } from '@/types';

interface AnimeCardProps {
  anime: Anime;
  navigate: (route: Route) => void;
  index?: number;
}

export default function AnimeCard({ anime, navigate, index = 0 }: AnimeCardProps) {
  const hasPoster = anime.poster && anime.poster.trim() !== '';
  return (
    <button
      onClick={() => navigate({ name: 'anime', animeId: anime.id })}
      className="group relative w-full text-right card-hover rounded-2xl overflow-hidden glass cursor-pointer animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 40, 600)}ms` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#1a1530] to-[#0c0a18]">
        {hasPoster ? (
          <img
            src={anime.poster}
            alt={anime.titleAr}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#b026ff]/30 to-[#ff2d95]/30 flex items-center justify-center">
                <Play className="w-6 h-6 text-[#b026ff]" />
              </div>
              <p className="text-xs text-gray-600 px-2">{anime.titleAr}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Trending badge */}
        {anime.trending && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#ff2d95] to-[#b026ff] text-white text-[10px] font-black shadow-lg flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            تريند
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-strong border-[#fbbf24]/30">
          <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-xs font-bold text-[#fbbf24]">{anime.rating}</span>
        </div>

        {/* Hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b026ff] to-[#ff2d95] flex items-center justify-center shadow-2xl shadow-[#b026ff]/50 scale-50 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>

        {/* Bottom info on poster */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2 text-[10px] text-gray-300 mb-1">
            <span className="px-2 py-0.5 rounded-md glass text-[10px]">{anime.episodeCount} حلقة</span>
            <span className={`px-2 py-0.5 rounded-md ${anime.status === 'مستمر' ? 'text-[#00f0ff]' : 'text-gray-400'}`}>
              {anime.status}
            </span>
          </div>
        </div>
      </div>

      {/* Title bar */}
      <div className="p-3 pt-2">
        <h3 className="text-sm font-bold text-white truncate group-hover:neon-text-purple transition-all">
          {anime.titleAr}
        </h3>
        <p className="text-xs text-gray-500 truncate mt-0.5">{anime.title}</p>
      </div>
    </button>
  );
}
