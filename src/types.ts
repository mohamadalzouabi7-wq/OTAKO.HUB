export interface Anime {
  id: string;
  malId: number;
  title: string;
  titleAr: string;
  poster: string;
  banner: string;
  rating: number;
  year: string;
  genres: string[];
  studio: string;
  status: string;
  synopsis: string;
  episodeCount: number;
  trending?: boolean;
}

export interface Movie {
  id: string;
  animeId: string;
  malId?: number;
  title: string;
  titleAr: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: string;
  duration: string;
  genres: string[];
  synopsis: string;
}

export interface VideoSource {
  server: string;
  label: string;
  url: string;
}

export type Route =
  | { name: 'home' }
  | { name: 'anime'; animeId: string }
  | { name: 'movies' }
  | { name: 'movie'; movieId: string };
