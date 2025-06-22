import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { StorageCache } from "../utils/LocalStorage";
import type { IMovie } from "../models/movie.model";
import type { RootState } from "../store/store";
import { setMovieList, toggleBookmark } from "../store/movieSlice";

const movieCache = new StorageCache<IMovie[]>("popularMovies", 24 * 60 * 60 * 1000); // 1 day TTL

const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state: RootState) => state.movies.movieList);
  const bookmarks = useSelector((state: RootState) => state.movies.bookmarks);
  const [error, setError] = useState<string | null>(null);

  const handleToggleBookmark = (movie: IMovie) => {
    dispatch(toggleBookmark(movie));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const cached = movieCache.get();
      if (cached) {
        dispatch(setMovieList(cached));
        return;
      }

      try {
        const response = await fetch("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "c24cfedb89mshfe9cbe856ff0cf8p17e921jsn6731d3c5c9d1",
            "x-rapidapi-host": "imdb236.p.rapidapi.com",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch movies.");
        const data = await response.json();
        const movies = Array.isArray(data) ? data : data.titles;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const simplified: IMovie[] = movies.map((movie: any) => ({
          id: movie.id,
          url: movie.url,
          primaryTitle: movie.primaryTitle,
          primaryImage: movie.primaryImage,
          averageRating: movie.averageRating,
          startYear: movie.startYear,
          genres: movie.genres || [],
          thumbnailUrl: movie.thumbnails?.[1]?.url || movie.primaryImage,
          description: movie.description,
        }));

        dispatch(setMovieList(simplified));
        movieCache.set(simplified);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading movies.");
      }
    };

    if (movieList.length === 0) {
      fetchMovies();
    }
  }, [dispatch, movieList.length]);

  return (
    <div className="p-6">
      <div className="w-full text-center text-3xl text-text font-bold p-5">
        Trending Movies
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {movieList.length === 0 ? (
        <div className="text-center text-text py-10">Loading movies...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {movieList.map((movie: IMovie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleBookmark={handleToggleBookmark}
              isWishlisted={bookmarks.some((m) => m.id === movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
