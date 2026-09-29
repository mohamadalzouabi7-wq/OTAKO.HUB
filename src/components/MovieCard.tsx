import { Star, Play, Clock } from 'lucide-react';
import type { Movie, Route } from '@/types';

interface MovieCardProps {
  movie: Movie;
  navigate: (route: Route) => void;
  index?: number;
}

export default function MovieCard({ movie, navigate, index = 0 }: MovieCardProps) {
  return (
    <button
      onClick={() => navigate({ name: 'movie', movieId: movie.id })}
      className="group relative w-full text-right card-hover rounded-2xl overflow-hidden glass cursor-pointer animate-fade-up shrink-0"
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
    >
      {/* Cinematic wide aspect */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.titleAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-strong border-[#fbbf24]/30">
          <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-xs font-bold text-[#fbbf24]">{movie.rating}</span>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-strong border-[#00f0ff]/20">
          <Clock className="w-3 h-3 text-[#00f0ff]" />
          <span className="text-xs font-bold text-[#00f0ff]">{movie.duration}</span>
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b026ff] to-[#ff2d95] flex items-center justify-center shadow-2xl shadow-[#b026ff]/50 scale-50 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-7 h-7 text-white fill-current" />
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-[#b026ff]/20 border border-[#b026ff]/30 text-[#d8a0ff] text-[10px] font-bold">
              فيلم
            </span>
            <span className="text-[10px] text-gray-400">{movie.year}</span>
          </div>
          <h3 className="text-base font-bold text-white truncate group-hover:neon-text-pink transition-all">
            {movie.titleAr}
          </h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">{movie.title}</p>
        </div>
      </div>
    </button>
  );
}
