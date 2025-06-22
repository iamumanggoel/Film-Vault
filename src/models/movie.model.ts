export interface IMovie {
  id: string;
  url: string;
  primaryTitle: string;
  primaryImage: string;
  averageRating: number;
  startYear?: number;
  genres: string[];
  thumbnailUrl?: string;
  bookmarked?: boolean;
  description?: string;
}