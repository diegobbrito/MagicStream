import React from 'react';

const FilterPanel = ({ genres, rankings, selectedGenres, setSelectedGenres, selectedRankings, setSelectedRankings, onApplyFilters, onClose }) => {
  // Toggle genre selection
  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  // Toggle ranking selection
  const toggleRanking = (ranking) => {
    setSelectedRankings((prev) =>
      prev.includes(ranking)
        ? prev.filter((rk) => rk !== ranking)
        : [...prev, ranking]
    );
  };

  return (
    <div className="filter-panel-modal">
      <div className="filter-panel-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h5>Genres</h5>
        <div className="filter-options">
          {genres.map((genre) => {
            const checked = selectedGenres.includes(genre.genre_id);
            return (
              <div
                key={genre.genre_id}
                className={`filter-checkbox form-check${checked ? ' filter-checkbox--active' : ''}`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`filter-genre-${genre.genre_id}`}
                  checked={checked}
                  onChange={() => toggleGenre(genre.genre_id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`filter-genre-${genre.genre_id}`}
                >
                  {genre.genre_name}
                </label>
              </div>
            );
          })}
        </div>
        <h5>Rankings</h5>
        <div className="filter-options">
          {rankings.map((ranking) => {
            const checked = selectedRankings.includes(ranking);
            return (
              <div
                key={ranking}
                className={`filter-checkbox form-check${checked ? ' filter-checkbox--active' : ''}`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`filter-ranking-${ranking}`}
                  checked={checked}
                  onChange={() => toggleRanking(ranking)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`filter-ranking-${ranking}`}
                >
                  {ranking === 'Not_Rated' ? 'Not Rated' : ranking}
                </label>
              </div>
            );
          })}
        </div>
        <button className="apply-btn" onClick={onApplyFilters}>
          <span role="img" aria-label="search">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
