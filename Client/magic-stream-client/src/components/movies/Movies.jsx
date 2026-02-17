import Movie from '../movie/Movie.jsx';

const Movies = ({ movies, updateMovieReview, message }) => {
    return (
        <div className='container'>
            <div className='row'>
                {movies && movies.length > 0 ? movies.map((movie) => (
                    <Movie key={movie._id} updateMovieReview={updateMovieReview} movie={movie} />
                )) : <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}><h2>{message}</h2></div>
                }
            </div>
        </div>
    )
}


export default Movies;