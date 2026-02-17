import useAxiosPrivate from "../../hook/useAxiosPrivate";
import { useEffect, useState } from "react";
import Movies from "../movies/Movies";

const Recommended = () => {
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState();
   const axiosPrivate = useAxiosPrivate();

   useEffect(() => {
    const fetchRecommendedMovies = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await axiosPrivate.get('/movies/recommendations');
            setMovies(response.data);
        } catch (err) {
            console.error('Error fetching recommended movies:', err);
            setMessage("Failed to load recommendations. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchRecommendedMovies();
   }, [])

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <h2>Loading recommendations...</h2>
                </div>
            ) : <Movies movies={movies} message={message} />}
        </>
    )
}

export default Recommended;

