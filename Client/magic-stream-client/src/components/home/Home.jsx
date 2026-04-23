import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosConfig.js';
import Movies from '../movies/Movies.jsx';

const MOVIES_PER_PAGE = 6;

const Home = ({ updateMovieReview }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setMessage("");
            try {
                const response = await axiosClient.get(`/movies?page=${page}&limit=${MOVIES_PER_PAGE}`);
                setMovies(response.data.movies);
                setTotal(response.data.total);
                if (response.data.movies.length === 0) {
                    setMessage("No movies available.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMessage("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <h2>Loading movies...</h2>
                </div>
            ) : (
                <Movies
                    movies={movies}
                    updateMovieReview={updateMovieReview}
                    message={message}
                    page={page}
                    total={total}
                    limit={MOVIES_PER_PAGE}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default Home;