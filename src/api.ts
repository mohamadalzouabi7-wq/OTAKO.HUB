import { useState, useEffect } from 'react';
import type { Anime, Movie } from '@/types';

// ═══════════════════════════════════════════════════════════════════
// Jikan API (MyAnimeList) integration
// Fetches real official posters/synopsis/ratings from the open API
// ═══════════════════════════════════════════════════════════════════

const JIKAN_BASE = 'https://api.jikan.moe/v4';
const cache = new Map<string, unknown>();

async function jikanGet<T>(path: string): Promise<T | null> {
  const url = `${JIKAN_BASE}${path}`;
  if (cache.has(url)) return cache.get(url) as T;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    cache.set(url, json);
    return json as T;
  } catch {
    return null;
  }
}

interface JikanAnime {
  mal_id: number;
  images: {
    jpg: { large_image_url: string; image_url: string };
    webp: { large_image_url: string; image_url: string };
  };
  title: string;
  title_english: string;
  score: number;
  year: number;
  status: string;
  synopsis: string;
  episodes: number;
  studios: { name: string }[];
  genres: { name: string }[];
  themes: { name: string }[];
  trailer?: { youtube_id: string; url: string; embed_url: string };
}

interface JikanResponse<T> {
  data: T;
}

// ── Hook: fetch real anime data by MAL ID ──
export function useJikanAnime(malId: number | undefined) {
  const [data, setData] = useState<JikanAnime | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!malId) return;
    setLoading(true);
    jikanGet<JikanResponse<JikanAnime>>(`/anime/${malId}/full`).then((res) => {
      setData(res?.data ?? null);
      setLoading(false);
    });
  }, [malId]);

  return { data, loading };
}

// ── Merge: combine static Arabic data with real Jikan images ──
export function mergeAnimeData(anime: Anime, jikan: JikanAnime | null): Anime {
  if (!jikan) return anime;
  const poster = jikan.images?.webp?.large_image_url || jikan.images?.jpg?.large_image_url || anime.poster;
  const banner = jikan.trailer?.youtube_id
    ? `https://img.youtube.com/vi/${jikan.trailer.youtube_id}/maxresdefault.jpg`
    : poster;
  return {
    ...anime,
    poster,
    banner,
    rating: jikan.score ?? anime.rating,
    synopsis: jikan.synopsis ? translateSynopsis(jikan.synopsis) : anime.synopsis,
    episodeCount: jikan.episodes ?? anime.episodeCount,
  };
}

function translateSynopsis(en: string): string {
  // Keep it simple — return the English synopsis trimmed; the Arabic synopsis
  // from data.ts is already good. We only override images/rating/episodes.
  return en.split('\n\n')[0].slice(0, 500);
}

// ── Hook: fetch all anime posters in batch on home page ──
export function useJikanBatch(animeList: Anime[]): Record<string, JikanAnime> {
  const [results, setResults] = useState<Record<string, JikanAnime>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const newResults: Record<string, JikanAnime> = {};
      for (const anime of animeList) {
        if (!anime.malId || cancelled) continue;
        const res = await jikanGet<JikanResponse<JikanAnime>>(`/anime/${anime.malId}`);
        if (cancelled) break;
        if (res?.data) {
          newResults[anime.id] = res.data;
        }
        // Jikan rate limit: ~3 req/sec, wait 400ms between calls
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!cancelled) setResults(newResults);
    })();
    return () => { cancelled = true; };
  }, [animeList]);

  return results;
}

// ── Hook: fetch movie posters from Jikan by searching ──
export function useJikanMovies(movies: Movie[]): Record<string, JikanAnime> {
  const [results, setResults] = useState<Record<string, JikanAnime>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const newResults: Record<string, JikanAnime> = {};
      for (const movie of movies) {
        if (!movie.malId || cancelled) continue;
        const res = await jikanGet<JikanResponse<JikanAnime>>(`/anime/${movie.malId}`);
        if (cancelled) break;
        if (res?.data) {
          newResults[movie.id] = res.data;
        }
        await new Promise((r) => setTimeout(r, 400));
      }
      if (!cancelled) setResults(newResults);
    })();
    return () => { cancelled = true; };
  }, [movies]);

  return results;
}

export function mergeMovieData(movie: Movie, jikan: JikanAnime | null): Movie {
  if (!jikan) return movie;
  const poster = jikan.images?.webp?.large_image_url || jikan.images?.jpg?.large_image_url || movie.poster;
  const backdrop = jikan.trailer?.youtube_id
    ? `https://img.youtube.com/vi/${jikan.trailer.youtube_id}/maxresdefault.jpg`
    : poster;
  return {
    ...movie,
    poster,
    backdrop,
    rating: jikan.score ?? movie.rating,
  };
}
