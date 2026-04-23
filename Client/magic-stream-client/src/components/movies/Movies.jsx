
import Movie from '../movie/Movie.jsx';

const Movies = ({ movies, updateMovieReview, message, page, total, limit, onPageChange }) => {
    if (!movies || movies.length === 0) {
        return (
            <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}><h2>{message}</h2></div>
        );
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className='container'>
            <div className='row'>
                {movies.map((movie) => (
                    <Movie key={movie._id} updateMovieReview={updateMovieReview} movie={movie} />
                ))}
            </div>
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <button
                        className='btn btn-outline-secondary mx-2'
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span style={{ alignSelf: 'center' }}>Página {page} de {totalPages}</span>
                    <button
                        className='btn btn-outline-secondary mx-2'
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    );
}

export default Movies;