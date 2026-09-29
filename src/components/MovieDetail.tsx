import { ArrowRight, Star, Calendar, Clock } from 'lucide-react';
import type { Movie, Route } from '@/types';
import { getMovieLinks } from '@/config';
import VideoPlayer from '@/components/VideoPlayer';

interface MovieDetailProps {
  movie: Movie;
  navigate: (route: Route) => void;
}

export default function MovieDetail({ movie, navigate }: MovieDetailProps) {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate({ name: 'movies' })}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>العودة للأفلام</span>
        </button>

        <VideoPlayer
          title={movie.titleAr}
          subtitle={`${movie.title} · ${movie.year} · ${movie.duration}`}
          sources={getMovieLinks(movie.id)}
        />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#b026ff] to-[#ff2d95] text-white text-xs font-black">
                فيلم سينمائي
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full glass border-[#fbbf24]/30">
                <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                <span className="text-sm font-bold text-[#fbbf24]">{movie.rating}</span>
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">{movie.titleAr}</h1>
            <p className="text-gray-400 text-sm mb-5">{movie.title}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
                <span key={genre} className="px-3 py-1.5 rounded-lg glass text-xs text-gray-200 font-medium">
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-5 mb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-[#b026ff]" />
                {movie.year}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-[#00f0ff]" />
                {movie.duration}
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
              {movie.synopsis}
            </p>
          </div>

          <div>
            <div className="relative w-full max-w-xs aspect-[2/3] rounded-2xl overflow-hidden glass-strong shadow-2xl shadow-black/50 mx-auto">
              <img src={movie.poster} alt={movie.titleAr} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
