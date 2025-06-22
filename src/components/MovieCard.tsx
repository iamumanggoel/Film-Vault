import { useState, useEffect } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import { ImageCache } from '../utils/imageCache';
import type { IMovie } from '../models/movie.model';

interface MovieCardProps {
  movie: IMovie;
  onToggleBookmark: (movie: IMovie) => void;
  isWishlisted: boolean;
}

function MovieCard({ movie, onToggleBookmark, isWishlisted }: MovieCardProps) {
  const [imageSrc, setImageSrc] = useState(movie.primaryImage || movie.thumbnailUrl);

  useEffect(() => {
    ImageCache.fetchAndCacheBlob(movie.thumbnailUrl || movie.primaryImage, `img-${movie.id}`)
      .then(setImageSrc);
  }, [movie]);

  return (
    <div 
      className="relative w-full h-[360px] rounded-xl overflow-hidden bg-surface shadow-md hover:scale-105 duration-300 cursor-pointer"
      onClick={() => window.open(movie.url, "_blank")}
    >
      <img src={imageSrc} alt={movie.primaryTitle} className="w-full h-full object-cover" />

      {/* Rating */}
      <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center gap-1 backdrop-blur-md">
        <StarIcon fontSize="small" className="text-yellow-400" />
        {(movie.averageRating / 2).toFixed(1)}
      </div>

      {/* Bookmark */}
      <div
        className="absolute top-2 left-2 text-white bg-black/60 p-1 rounded-full backdrop-blur-md"
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark(movie);
        }}
        title="Toggle Watchlist"
      >
        {isWishlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </div>

      {/* Bottom Title */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-3">
        <div className="text-lg font-semibold truncate">{movie.primaryTitle}</div>
        <div className="text-xs opacity-80">{movie.genres?.join(', ') || 'Unknown'} • {movie.startYear || 'N/A'}</div>
      </div>
    </div>
  );
}

export default MovieCard;
