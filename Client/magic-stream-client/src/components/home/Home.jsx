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
    const [genres, setGenres] = useState([]);
    const [rankings, setRankings] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedRanking, setSelectedRanking] = useState('');

    useEffect(() => {
        // Busca gêneros
        const fetchGenres = async () => {
            try {
                const response = await axiosClient.get('/genres');
                setGenres(response.data);
            } catch (err) {
                setGenres([]);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setMessage("");
            try {
                // Monta query string com filtros
                let query = `/movies?page=${page}&limit=${MOVIES_PER_PAGE}`;
                if (selectedGenre) query += `&genre_id=${selectedGenre}`;
                if (selectedRanking) query += `&ranking_name=${encodeURIComponent(selectedRanking)}`;
                const response = await axiosClient.get(query);
                setMovies(response.data.movies);
                setTotal(response.data.total);
                // Extrai rankings únicos dos filmes
                const allRankings = (response.data.movies || [])
                    .map(m => m.ranking?.ranking_name)
                    .filter(Boolean);
                setRankings([...new Set(allRankings)]);
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
    }, [page, selectedGenre, selectedRanking]);

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
                    genres={genres}
                    rankings={rankings}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    selectedRanking={selectedRanking}
                    setSelectedRanking={setSelectedRanking}
                />
            )}
        </>
    );
};

export default Home;