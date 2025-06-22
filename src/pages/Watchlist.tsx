import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { IMovie } from '../models/movie.model';
import { deleteBookmark } from '../store/movieSlice';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';


function WatchList() {
  const bookmarked = useSelector((state: RootState) => state.movies.bookmarks);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<keyof IMovie>('primaryTitle');
  const dispatch = useDispatch();

  const filteredMovies = useMemo(() => {
    return bookmarked
      .filter(movie =>
        movie.primaryTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortBy] ?? '';
        const valB = b[sortBy] ?? '';
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [bookmarked, searchQuery, sortBy, sortOrder]);

  const handleSort = (property: keyof IMovie) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-text pb-6">Your Watchlist</h2>

      <TextField
        label="Search by Title"
        variant="filled"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="!mb-8 [&_label]:text-text [&_div]:text-text"
        slotProps={{
          input: {
            style: {
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)'
            }
          }
        }}
      />



      <Paper
        className="bg-surface text-text shadow-md rounded overflow-hidden"
        sx={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-background">
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'primaryTitle'}
                    direction={sortOrder}
                    onClick={() => handleSort('primaryTitle')}
                    sx={{ color: 'var(--color-text)' }}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>Genres</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'averageRating'}
                    direction={sortOrder}
                    onClick={() => handleSort('averageRating')}
                    sx={{ color: 'var(--color-text)' }}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'startYear'}
                    direction={sortOrder}
                    onClick={() => handleSort('startYear')}
                    sx={{ color: 'var(--color-text)' }}
                  >
                    Year
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    sx={{ color: 'var(--color-text)' }}
                  >
                    Action
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMovies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow key={movie.id} hover>
                    <TableCell>
                      <a
                        href={movie.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        {movie.primaryTitle}
                      </a>
                    </TableCell>
                    <TableCell className="text-muted">{movie.genres?.join(', ')}</TableCell>
                    <TableCell>{(movie.averageRating / 2).toFixed(1)}</TableCell>
                    <TableCell>{movie.startYear || 'N/A'}</TableCell>
                    <TableCell>
                      <BookmarkRemoveIcon
                        className="text-danger cursor-pointer"
                        onClick={() => dispatch(deleteBookmark(movie))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredMovies.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
          }}
        />
      </Paper>
    </div>
  );
}

export default WatchList;
