import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AnimeCard from '@/components/AnimeCard';
import MovieCard from '@/components/MovieCard';
import AnimeDetail from '@/components/AnimeDetail';
import MovieDetail from '@/components/MovieDetail';
import { animeList, movieList, getAnimeById, getMovieById } from '@/data';
import { useJikanBatch, mergeAnimeData, useJikanMovies, mergeMovieData } from '@/api';
import type { Anime, Movie, Route } from '@/types';
import { Flame, Film, TrendingUp, Filter, X } from 'lucide-react';

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const navigate = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    if (route.name !== 'home') navigate({ name: 'home' });
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // ── Fetch real posters from Jikan API (batch) ──
  const jikanData = useJikanBatch(animeList);
  const jikanMovieData = useJikanMovies(movieList.filter((m) => m.malId));

  const enrichedAnimeList = useMemo(() => {
    return animeList.map((a) => {
      const jikan = jikanData[a.id];
      return jikan ? mergeAnimeData(a, jikan) : a;
    });
  }, [jikanData]);

  const enrichedMovieList = useMemo(() => {
    return movieList.map((m) => {
      const jikan = jikanMovieData[m.id];
      return jikan ? mergeMovieData(m, jikan) : m;
    });
  }, [jikanMovieData]);

  const trendingAnime = enrichedAnimeList.find((a) => a.trending) ?? enrichedAnimeList[0];

  const filteredAnime = useMemo(() => {
    let list = [...enrichedAnimeList];
    if (selectedGenre) {
      list = list.filter((a) => a.genres.includes(selectedGenre));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      list = list.filter(
        (a) => a.titleAr.includes(q) || a.title.toLowerCase().includes(q.toLowerCase())
      );
    }
    return list;
  }, [selectedGenre, searchQuery, enrichedAnimeList]);

  const episodeSearchResults = useMemo(() => {
    if (!searchQuery.trim() || route.name !== 'home') return null;
    const num = parseInt(searchQuery, 10);
    if (isNaN(num) || num <= 0) return null;
    return enrichedAnimeList
      .filter((a) => num <= a.episodeCount)
      .map((a) => ({ anime: a, episode: num }));
  }, [searchQuery, route.name, enrichedAnimeList]);

  // ── Anime detail page ──
  if (route.name === 'anime') {
    const anime = getAnimeById(route.animeId);
    if (!anime) return <NotFound navigate={navigate} />;
    const jikan = jikanData[anime.id];
    const enrichedAnime = jikan ? mergeAnimeData(anime, jikan) : anime;
    return (
      <div className="min-h-screen bg-[#05030a] bg-grid">
        <Header route={route} navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onGenreSelect={handleGenreSelect} />
        <AnimeDetail anime={enrichedAnime} navigate={navigate} />
        <Footer />
      </div>
    );
  }

  // ── Movie detail page ──
  if (route.name === 'movie') {
    const movie = getMovieById(route.movieId);
    if (!movie) return <NotFound navigate={navigate} />;
    const jikan = jikanMovieData[movie.id];
    const enrichedMovie = jikan ? mergeMovieData(movie, jikan) : movie;
    return (
      <div className="min-h-screen bg-[#05030a] bg-grid">
        <Header route={route} navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onGenreSelect={handleGenreSelect} />
        <MovieDetail movie={enrichedMovie} navigate={navigate} />
        <Footer />
      </div>
    );
  }

  // ── Movies page ──
  if (route.name === 'movies') {
    return (
      <div className="min-h-screen bg-[#05030a] bg-grid">
        <Header route={route} navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onGenreSelect={handleGenreSelect} />
        <div className="pt-24 pb-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-7 h-7 text-[#ff2d95]" />
              <h1 className="text-3xl lg:text-4xl font-black text-white">الأفلام السينمائية</h1>
            </div>
            <p className="text-gray-400 text-sm">جميع الأفلام السينمائية لكل الأنميات</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrichedMovieList.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} navigate={navigate} index={i} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Home page ──
  return (
    <div className="min-h-screen bg-[#05030a] bg-grid">
      <Header route={route} navigate={navigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onGenreSelect={handleGenreSelect} />

      <HeroBanner anime={trendingAnime} navigate={navigate} />

      {episodeSearchResults && episodeSearchResults.length > 0 && (
        <div className="fixed top-20 left-0 right-0 z-40 max-w-md mx-auto px-4 animate-fade-up">
          <div className="glass-strong rounded-2xl p-4 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white">نتائج البحث عن الحلقة {searchQuery}</p>
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
              {episodeSearchResults.map(({ anime, episode }) => (
                <button
                  key={anime.id}
                  onClick={() => navigate({ name: 'anime', animeId: anime.id })}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all text-right group"
                >
                  {anime.poster ? (
                    <img src={anime.poster} alt={anime.titleAr} className="w-10 h-14 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-14 rounded-lg bg-gradient-to-br from-[#1a1530] to-[#0c0a18]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:neon-text-purple transition-all">{anime.titleAr}</p>
                    <p className="text-xs text-gray-500">الحلقة {episode} متوفرة</p>
                  </div>
                  <Flame className="w-4 h-4 text-[#ff2d95] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main id="catalog" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <TrendingUp className="w-6 h-6 text-[#b026ff]" />
              <h2 className="text-2xl lg:text-3xl font-black text-white">أشهر الأنميات</h2>
            </div>
            <p className="text-gray-400 text-sm">17 أنمي رائج في الوطن العربي حالياً</p>
          </div>

          {selectedGenre && (
            <button
              onClick={() => setSelectedGenre(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-[#b026ff]/30 text-[#d8a0ff] text-sm font-bold hover:bg-white/10 transition-all"
            >
              <Filter className="w-4 h-4" />
              {selectedGenre}
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {filteredAnime.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-gray-400">لا توجد أنميات مطابقة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5">
            {filteredAnime.map((anime, i) => (
              <AnimeCard key={anime.id} anime={anime} navigate={navigate} index={i} />
            ))}
          </div>
        )}

        {/* Movies section on home */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Film className="w-6 h-6 text-[#ff2d95]" />
                <h2 className="text-2xl lg:text-3xl font-black text-white">الأفلام السينمائية</h2>
              </div>
              <p className="text-gray-400 text-sm">أحدث الأفلام المضافة حديثاً</p>
            </div>
            <button
              onClick={() => navigate({ name: 'movies' })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              عرض الكل
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrichedMovieList.slice(0, 6).map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} navigate={navigate} index={i} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b026ff] via-[#ff2d95] to-[#00f0ff] flex items-center justify-center font-black text-white text-sm">
              O
            </div>
            <span className="text-lg font-black text-white">
              OTAKU<span className="text-gradient-neon">.HUB</span>
            </span>
          </div>
          <p className="text-gray-500 text-xs text-center max-w-md">
            منصة عربية متخصصة في عرض الأنمي والأفلام السينمائية بأعلى جودة. صُمم لعشاق الأنمي في الوطن العربي والشرق الأوسط.
          </p>
          <p className="text-gray-600 text-xs mt-2">© 2026 OTAKU.HUB — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}

function NotFound({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="min-h-screen bg-[#05030a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-black text-gradient-neon mb-4">404</p>
        <p className="text-gray-400 mb-6">الصفحة غير موجودة</p>
        <button
          onClick={() => navigate({ name: 'home' })}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b026ff] to-[#ff2d95] text-white font-bold text-sm"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
