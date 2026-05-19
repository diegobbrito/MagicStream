
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosConfig.js';
import Movies from '../movies/Movies.jsx';

const MOVIES_PER_PAGE = 6;
const FIXED_RANKINGS = [
    'Excellent',
    'Good',
    'Okay',
    'Bad',
    'Terrible',
    'Not_Rated',
];

const Home = ({ updateMovieReview, setHomeResetRef }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedRankings, setSelectedRankings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingFilters, setPendingFilters] = useState({
        genres: [],
        rankings: [],
        search: ''
    });
    useEffect(() => {
        if (setHomeResetRef) {
            setHomeResetRef(() => () => {
                setSelectedGenres([]);
                setSelectedRankings([]);
                setSearchTerm('');
                setPage(1);
            });
        }
    }, [setHomeResetRef]);

    useEffect(() => {
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
                let query = `/movies?page=${page}&limit=${MOVIES_PER_PAGE}`;
                if (selectedGenres.length > 0) {
                    const genreParam = selectedGenres.join(',');
                    query += `&genre_id=${genreParam}`;
                }
                if (selectedRankings.length > 0) {
                    const rankingParam = selectedRankings.map(rk => encodeURIComponent(rk)).join(',');
                    query += `&ranking_name=${rankingParam}`;
                }
                if (searchTerm) {
                    query += `&search=${encodeURIComponent(searchTerm)}`;
                }
                const response = await axiosClient.get(query);
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
    }, [page, selectedGenres, selectedRankings, searchTerm]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Handler para aplicar filtros
    const handleApplyFilters = () => {
        setSelectedGenres(pendingFilters.genres);
        setSelectedRankings(pendingFilters.rankings);
        setSearchTerm(pendingFilters.search);
        setPage(1);
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
                    rankings={FIXED_RANKINGS}
                    selectedGenres={Array.isArray(pendingFilters.genres) ? pendingFilters.genres : []}
                    setSelectedGenres={genres => setPendingFilters(f => ({ ...f, genres }))}
                    selectedRankings={Array.isArray(pendingFilters.rankings) ? pendingFilters.rankings : []}
                    setSelectedRankings={rankings => setPendingFilters(f => ({ ...f, rankings }))}
                    searchTerm={pendingFilters.search}
                    setSearchTerm={search => setPendingFilters(f => ({ ...f, search }))}
                    onApplyFilters={handleApplyFilters}
                />
            )}
        </>
    );
};

export default Home;