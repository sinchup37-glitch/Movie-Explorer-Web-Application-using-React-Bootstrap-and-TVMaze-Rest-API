
import { useState } from 'react';

function MovieCard({ movie }) {
  const show = movie.show;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card movie-card h-100 shadow">
        <img
          src={
            show.image
              ? show.image.medium
              : 'https://placehold.co/300x450?text=No+Poster'
          }
          className="card-img-top"
          alt={show.name}
        />

        <div className="card-body text-center">
          <h5 className="card-title">{show.name}</h5>

          <p className="text-muted">
            {show.premiered
              ? show.premiered.substring(0, 4)
              : 'Year unavailable'}
          </p>

          <p>
            ⭐ Rating: {show.rating?.average || 'N/A'}
          </p>

          <a
            href={show.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-warning"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchMovies() {
    if (search.trim() === '') {
      alert('Please enter a movie name!');
      return;
    }

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      if (data.length > 0) {
        setMovies(data);
      } else {
        setError('No movies found. Try another name!');
      }
    } catch (error) {
      setError('Unable to connect to the API. Check your internet.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">
          🎬 Movie Explorer
        </span>
      </nav>

      <div className="container py-5">
        <h1 className="text-center fw-bold">
          Discover Your Favorite Movies
        </h1>

        <p className="text-center text-secondary">
          Search movies and explore the world of cinema
        </p>

        <div className="input-group my-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchMovies();
              }
            }}
          />

          <button
            className="btn btn-warning"
            onClick={searchMovies}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {loading && (
          <div className="text-center mt-4">
            <div className="spinner-border text-warning"></div>
            <p>Searching movies...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center mt-3">
            {error}
          </div>
        )}

        <div className="row mt-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.show.id}
              movie={movie}
            />
          ))}
        </div>

        <footer className="footer text-center mt-5">
          <h5>🎬 Movie Explorer</h5>

          <p>
            Discover movies and explore the world of cinema.
          </p>

          <p>
            Developed using React.js, Bootstrap and TVMaze REST API.
          </p>

          <p>© 2026 Movie Explorer | MCA Project</p>
        </footer>
      </div>
    </div>
  );
}

export default App;