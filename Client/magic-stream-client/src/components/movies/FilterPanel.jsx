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
          {genres.map((genre) => (
            <label key={genre.genre_id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.genre_id)}
                onChange={() => toggleGenre(genre.genre_id)}
              />
              {genre.genre_name}
            </label>
          ))}
        </div>
        <h5>Rankings</h5>
        <div className="filter-options">
          {rankings.map((ranking) => (
            <label key={ranking} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedRankings.includes(ranking)}
                onChange={() => toggleRanking(ranking)}
              />
              {ranking === 'Not_Rated' ? 'Not Rated' : ranking}
            </label>
          ))}
        </div>
        <button className="apply-btn" onClick={onApplyFilters}>
          <span role="img" aria-label="search">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
