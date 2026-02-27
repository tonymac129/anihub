export interface TmdbResponseType {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: GenreType[];
  id: number;
  homepage?: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: Company[];
  first_air_date: Date;
  last_air_date: Date;
  number_of_episodes: number;
  name: string;
  vote_average: number;
  vote_count: number;
  status: string;
  created_by: Credit[];
}
export interface EpisodeType {
  id: string;
  title: string;
  primaryImage: PrimaryImage;
  season: string;
  episodeNumber: number;
  runtimeSeconds: number;
  plot: string;
  rating: Rating;
  releaseDate: ReleaseDate;
}

export interface ReleaseDate {
  year: number;
  month: number;
  day: number;
}

export interface Credit {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: null;
}

export interface Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface ImdbResponseType {
  id: string;
  type: string;
  primaryTitle: string;
  primaryImage: PrimaryImage;
  startYear: number;
  endYear: number;
  runtimeSeconds: number;
  genres: string[];
  rating: Rating;
  plot: string;
  directors: Director[];
  writers: Director[];
  stars: Director[];
  originCountries: OriginCountry[];
  spokenLanguages: OriginCountry[];
  interests: Interest[];
}

export interface Director {
  id: string;
  displayName: string;
  primaryImage?: PrimaryImage;
  primaryProfessions: string[];
  alternativeNames?: string[];
}

export interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}

export interface Interest {
  id: string;
  name: string;
  isSubgenre?: boolean;
}

export interface OriginCountry {
  code: string;
  name: string;
}

export interface Rating {
  aggregateRating: number;
  voteCount: number;
}

export interface RatingType {
  rating: number;
  count: number;
}

export interface KeywordsType {
  id: number;
  results: Result[];
}

export interface Result {
  name: string;
  id: number;
}
