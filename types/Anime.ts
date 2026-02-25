export interface TmdbResponseType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  name: string;
  vote_average: number;
  vote_count: number;
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
