

import { useState } from 'react';
import Movie from '../movie/Movie.jsx';


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
    onApplyFilters
}) => {


    const totalPages = Math.ceil(total / limit);

    return (
        <div className='container'>
            {/* Barra de pesquisa e filtros */}
            <div className='row mb-4'>
                <div className='col-md-4 mb-2'>
                    <label htmlFor='search-bar' className='form-label'>Buscar por nome</label>
                    <input
                        id='search-bar'
                        className='form-control'
                        type='text'
                        placeholder='Digite o nome do filme...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='col-md-4 mb-2'>
                    <label htmlFor='genre-filter' className='form-label'>Filtrar por Gênero</label>
                    <select
                        id='genre-filter'
                        className='form-select'
                        multiple
                        value={selectedGenres}
                        onChange={e => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedGenres(options);
                        }}
                    >
                        {genres.map(genre => (
                            <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
                        ))}
                    </select>
                </div>
                <div className='col-md-4 mb-2'>
                    <label htmlFor='ranking-filter' className='form-label'>Filtrar por Ranking</label>
                    <select
                        id='ranking-filter'
                        className='form-select'
                        multiple
                        value={selectedRankings}
                        onChange={e => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            setSelectedRankings(options);
                        }}
                    >
                        {rankings.map(ranking => (
                            <option key={ranking} value={ranking}>
                                {ranking === 'Not_Rated' ? 'Not Rated' : ranking}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-md-12 mt-2'>
                    <button className='btn btn-primary' onClick={onApplyFilters}>
                        Aplicar Filtros
                    </button>
                </div>
            </div>
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