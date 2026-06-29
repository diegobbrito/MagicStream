

import { useState } from 'react';
import Movie from '../movie/Movie.jsx';
import FilterPanel from './FilterPanel.jsx';
import './FilterPanel.css';


const Movies = ({
    movies,
    updateMovieReview,
    message,
    page,
    total,
    limit,
    onPageChange,
    genres = [],
    rankings = [],
    selectedGenres = [],
    setSelectedGenres,
    selectedRankings = [],
    setSelectedRankings,
    searchTerm,
    setSearchTerm,
    onApplyFilters,
    showFilters = true
}) => {


    const totalPages = Math.ceil(total / limit);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className='container'>
            {}
            {showFilters && (
                <div className='row mb-4 align-items-end'>
                    <div className='col-md-10 mb-2'>
                        <label htmlFor='search-bar' className='form-label visually-hidden'>Search by name</label>
                        <input
                            id='search-bar'
                            className='form-control'
                            type='text'
                            placeholder='Search movie by name...'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ minWidth: 180 }}
                        />
                    </div>
                    <div className='col-md-2 mb-2 d-flex justify-content-end'>
                        <button
                            className='btn btn-outline-secondary'
                            style={{ fontSize: '1.5rem', padding: '0.3rem 0.7rem' }}
                            title='Filter options'
                            onClick={() => setShowFilter(true)}
                        >
                            <span role="img" aria-label="filter">🔎</span>
                        </button>
                    </div>
                </div>
            )}
            {showFilters && showFilter && (
                <FilterPanel
                    genres={genres}
                    rankings={rankings}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedRankings={selectedRankings}
                    setSelectedRankings={setSelectedRankings}
                    onApplyFilters={() => { setShowFilter(false); onApplyFilters(); }}
                    onClose={() => setShowFilter(false)}
                />
            )}
            <div className='row'>
                {movies.length === 0 ? (
                    <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
                        <h2>{message}</h2>
                    </div>
                ) : (
                    movies.map((movie) => (
                        <Movie key={movie._id} updateMovieReview={updateMovieReview} movie={movie} />
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <button
                        className='btn btn-outline-secondary mx-2'
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
                    <button
                        className='btn btn-outline-secondary mx-2'
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Movies;