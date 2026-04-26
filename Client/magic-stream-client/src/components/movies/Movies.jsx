

import { useState } from 'react';
import Movie from '../movie/Movie.jsx';

const Movies = ({ movies, updateMovieReview, message, page, total, limit, onPageChange, genres = [], rankings = [], selectedGenre, setSelectedGenre, selectedRanking, setSelectedRanking }) => {

    if (!movies || movies.length === 0) {
        return (
            <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}><h2>{message}</h2></div>
        );
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className='container'>
            {/* Filtros */}
            <div className='row mb-4'>
                <div className='col-md-4'>
                    <label htmlFor='genre-filter' className='form-label'>Filtrar por Gênero</label>
                    <select
                        id='genre-filter'
                        className='form-select'
                        value={selectedGenre}
                        onChange={e => setSelectedGenre(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        {genres.map(genre => (
                            <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
                        ))}
                    </select>
                </div>
                <div className='col-md-4'>
                    <label htmlFor='ranking-filter' className='form-label'>Filtrar por Classificação</label>
                    <select
                        id='ranking-filter'
                        className='form-select'
                        value={selectedRanking}
                        onChange={e => setSelectedRanking(e.target.value)}
                    >
                        <option value=''>Todas</option>
                        {rankings.map(ranking => (
                            <option key={ranking} value={ranking}>{ranking}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='row'>
                {movies.length === 0 ? (
                    <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}><h4>Nenhum filme encontrado com os filtros selecionados.</h4></div>
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