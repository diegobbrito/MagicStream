import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axiosClient from '../../api/axiosConfig';
import useAuth from '../../hook/useAuth';
import Spinner from '../spinner/Spinner';

const AddMovie = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imdbId, setImdbId] = useState('');
  const [title, setTitle] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [adminReview, setAdminReview] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && auth && auth.role !== 'ADMIN') {
      navigate('/', { replace: true });
    }
  }, [auth, loading, navigate]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosClient.get('/genres');
        setGenres(response.data);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
      }
    };
    fetchGenres();
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => {
      const exists = prev.some((g) => g.genre_id === genre.genre_id);
      if (exists) {
        return prev.filter((g) => g.genre_id !== genre.genre_id);
      }
      return [...prev, genre];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (selectedGenres.length === 0) {
      setError('Selecione pelo menos um gênero.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        imdb_id: imdbId.trim(),
        title: title.trim(),
        poster_path: posterPath.trim(),
        youtube_id: youtubeId.trim(),
        genre: selectedGenres,
        admin_review: adminReview.trim(),
        ranking: {
          ranking_name: 'Not Rated',
          ranking_value: 0,
        },
      };

      await axiosClient.post('/movies', payload);
      setSuccess('Filme adicionado com sucesso.');
      setImdbId('');
      setTitle('');
      setPosterPath('');
      setYoutubeId('');
      setAdminReview('');
      setSelectedGenres([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha ao adicionar o filme.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!auth || auth.role !== 'ADMIN') {
    return null;
  }

  return (
    <Container className="min-vh-100 py-4">
      <div className="p-4 bg-white rounded shadow-sm" style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 className="mb-4">Add new movie</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="imdbId">
            <Form.Label>IMDb ID</Form.Label>
            <Form.Control
              type="text"
              value={imdbId}
              onChange={(e) => setImdbId(e.target.value)}
              placeholder="Ex: tt0111161"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Movie title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="posterPath">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              type="url"
              value={posterPath}
              onChange={(e) => setPosterPath(e.target.value)}
              placeholder="Poster URL"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="youtubeId">
            <Form.Label>YouTube ID</Form.Label>
            <Form.Control
              type="text"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              placeholder="YouTube Video ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="genres">
            <Form.Label>Genre</Form.Label>
            <div className="row g-2">
              {genres.map((genre) => {
                const checked = selectedGenres.some((g) => g.genre_id === genre.genre_id);
                return (
                  <div className="col-12 col-md-6" key={genre.genre_id}>
                    <Form.Check
                      type="checkbox"
                      id={`genre-${genre.genre_id}`}
                      label={genre.genre_name}
                      checked={checked}
                      onChange={() => toggleGenre(genre)}
                    />
                  </div>
                );
              })}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="adminReview">
            <Form.Label>Admin Review (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={adminReview}
              onChange={(e) => setAdminReview(e.target.value)}
              placeholder="Admin comment"
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Add Movie'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddMovie;
