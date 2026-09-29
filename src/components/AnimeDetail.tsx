import { useState, useMemo } from 'react';
import { ArrowRight, Search, Star, Calendar, Building2, Play, Film, Tv } from 'lucide-react';
import type { Anime, Movie, Route } from '@/types';
import { getMoviesByAnimeId } from '@/data';
import { getEpisodeLinks, getMovieLinks } from '@/config';
import VideoPlayer from '@/components/VideoPlayer';
import MovieCard from '@/components/MovieCard';

interface AnimeDetailProps {
  anime: Anime;
  navigate: (route: Route) => void;
}

type Tab = 'episodes' | 'movies';

export default function AnimeDetail({ anime, navigate }: AnimeDetailProps) {
  const [search, setSearch] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('episodes');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const animeMovies = useMemo(() => getMoviesByAnimeId(anime.id), [anime.id]);

  const episodes = useMemo(
    () => Array.from({ length: anime.episodeCount }, (_, i) => i + 1),
    [anime.episodeCount]
  );

  const filteredEpisodes = useMemo(() => {
    const num = parseInt(search, 10);
    if (!isNaN(num) && num > 0 && num <= anime.episodeCount) {
      return episodes.filter((e) => e === num);
    }
    if (search.trim() === '') return episodes;
    return episodes.filter((e) => e.toString().includes(search.trim()));
  }, [search, episodes, anime.episodeCount]);

  // ── Episode player view ──
  if (selectedEpisode !== null) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedEpisode(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>العودة للحلقات</span>
          </button>

          <VideoPlayer
            title={`${anime.titleAr} - الحلقة ${selectedEpisode}`}
            subtitle={`${anime.title} · ${anime.year}`}
            sources={getEpisodeLinks(anime.id, selectedEpisode)}
          />

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={() => selectedEpisode > 1 && setSelectedEpisode(selectedEpisode - 1)}
              disabled={selectedEpisode <= 1}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-white font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
              الحلقة السابقة
            </button>
            <span className="text-gray-400 text-sm font-bold">
              {selectedEpisode} / {anime.episodeCount}
            </span>
            <button
              onClick={() => selectedEpisode < anime.episodeCount && setSelectedEpisode(selectedEpisode + 1)}
              disabled={selectedEpisode >= anime.episodeCount}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-white font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              الحلقة التالية
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Movie player view (from within anime page) ──
  if (selectedMovie) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedMovie(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>العودة لأفلام {anime.titleAr}</span>
          </button>

          <VideoPlayer
            title={selectedMovie.titleAr}
            subtitle={`${selectedMovie.title} · ${selectedMovie.year} · ${selectedMovie.duration}`}
            sources={getMovieLinks(selectedMovie.id)}
          />

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedMovie.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1.5 rounded-lg glass text-xs text-gray-200 font-medium">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {selectedMovie.synopsis}
              </p>
            </div>
            <div>
              <div className="relative w-full max-w-xs aspect-[2/3] rounded-2xl overflow-hidden glass-strong shadow-2xl shadow-black/50 mx-auto bg-gradient-to-br from-[#1a1530] to-[#0c0a18]">
                {selectedMovie.poster ? (
                  <img src={selectedMovie.poster} alt={selectedMovie.titleAr} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">{selectedMovie.titleAr}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main anime detail page ──
  return (
    <div className="min-h-screen pt-16">
      {/* Banner */}
      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
        {anime.banner ? (
          <img src={anime.banner} alt={anime.titleAr} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a0a2e] via-[#0c0a18] to-[#05030a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05030a] via-[#05030a]/60 to-[#05030a]/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#05030a]/60 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative">
        {/* Back button */}
        <button
          onClick={() => navigate({ name: 'home' })}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Poster */}
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-48 lg:w-64 aspect-[2/3] rounded-2xl overflow-hidden glass-strong shadow-2xl shadow-black/50 animate-scale-in bg-gradient-to-br from-[#1a1530] to-[#0c0a18]">
              {anime.poster ? (
                <img src={anime.poster} alt={anime.titleAr} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">{anime.titleAr}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 animate-fade-up">
            <div className="flex items-center gap-3 mb-3">
              {anime.trending && (
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff2d95] to-[#b026ff] text-white text-xs font-black shadow-lg">
                  تريند
                </span>
              )}
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full glass border-[#fbbf24]/30">
                <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
                <span className="text-sm font-bold text-[#fbbf24]">{anime.rating}</span>
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-white mb-2">{anime.titleAr}</h1>
            <p className="text-gray-400 text-sm lg:text-base mb-5">{anime.title}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {anime.genres.map((genre) => (
                <span key={genre} className="px-3 py-1.5 rounded-lg glass text-xs text-gray-200 font-medium">
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-5 mb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-[#b026ff]" />
                {anime.year}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="w-4 h-4 text-[#00f0ff]" />
                {anime.studio}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Play className="w-4 h-4 text-[#ff2d95]" />
                {anime.episodeCount} حلقة
              </div>
              {animeMovies.length > 0 && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Film className="w-4 h-4 text-[#ff2d95]" />
                  {animeMovies.length} فيلم
                </div>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed text-sm lg:text-base max-w-2xl mb-6">
              {anime.synopsis}
            </p>

            <button
              onClick={() => { setActiveTab('episodes'); setSelectedEpisode(1); }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#b026ff] to-[#ff2d95] text-white font-bold text-sm shadow-lg shadow-[#b026ff]/30 hover:shadow-[#b026ff]/50 hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              ابدأ المشاهدة - الحلقة 1
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-white/10 pb-px">
            <TabButton active={activeTab === 'episodes'} onClick={() => setActiveTab('episodes')} icon={<Tv className="w-4 h-4" />}>
              الحلقات
              <span className="mr-1 text-xs opacity-70">({anime.episodeCount})</span>
            </TabButton>
            <TabButton active={activeTab === 'movies'} onClick={() => setActiveTab('movies')} icon={<Film className="w-4 h-4" />}>
              الأفلام
              <span className="mr-1 text-xs opacity-70">({animeMovies.length})</span>
            </TabButton>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'episodes' && (
          <div className="mb-8 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black text-white">
                جميع الحلقات <span className="text-gradient-neon">({anime.episodeCount})</span>
              </h2>
              <div className="relative group">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#b026ff] transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="اكتب رقم الحلقة (مثلاً: 12)"
                  className="w-full sm:w-72 glass rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#b026ff]/50 transition-all text-right"
                  dir="rtl"
                />
              </div>
            </div>

            {filteredEpisodes.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-gray-400">لا توجد حلقات مطابقة لبحثك</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                {filteredEpisodes.map((ep, i) => (
                  <button
                    key={ep}
                    onClick={() => setSelectedEpisode(ep)}
                    className="group relative aspect-square glass rounded-xl flex flex-col items-center justify-center card-hover animate-fade-up"
                    style={{ animationDelay: `${Math.min(i * 10, 400)}ms` }}
                  >
                    <span className="text-lg lg:text-xl font-black text-gray-300 group-hover:text-white transition-colors">
                      {ep}
                    </span>
                    <Play className="w-3 h-3 text-[#b026ff] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#b026ff]/40 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="mb-8 animate-fade-up">
            {animeMovies.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">لا توجد أفلام تابعة لهذا الأنمي حالياً</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-white mb-6">
                  أفلام <span className="text-gradient-neon">{anime.titleAr}</span>
                  <span className="text-gray-500 text-lg font-normal mr-2">({animeMovies.length} فيلم)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {animeMovies.map((movie, i) => (
                    <div key={movie.id} onClick={() => setSelectedMovie(movie)}>
                      <MovieCard movie={movie} navigate={(r) => {
                        if (r.name === 'movie') setSelectedMovie(movie);
                      }} index={i} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick, icon }: { children: React.ReactNode; active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all duration-300 border-b-2 ${
        active
          ? 'text-white border-[#b026ff]'
          : 'text-gray-400 border-transparent hover:text-white hover:border-white/20'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
