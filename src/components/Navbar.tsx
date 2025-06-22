import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ThemeSwitchBtn from './ThemeSwitchBtn';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-surface text-text shadow-md px-6 py-4 flex items-center justify-between flex-wrap">
      
      {/* Logo + Title */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90">
        <MovieCreationOutlinedIcon />
        <span className="hidden sm:inline">FilmVault</span>
      </Link>

      {/* Links + Theme Switch */}
      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <ul className="flex gap-6 text-base font-medium flex-wrap">
          <li>
            <Link to="/" className="hover:text-primary transition">Home</Link>
          </li>
          <li>
            <Link to="/watchlist" className="hover:text-primary transition">WatchList</Link>
          </li>
        </ul>
        <ThemeSwitchBtn />
      </div>
    </nav>
  );
};

export default Navbar;
