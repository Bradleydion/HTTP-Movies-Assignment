import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Button, ButtonGroup} from 'reactstrap';

function Movie({ addToSavedList, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  
  const updateMovie = () => {
    history.push(`/update-movie/${params.id}`)
  }
  
  const handleDelete = () => {
    console.log('deleting movie', params.id)
    deleteMovie(params.id);
    history.push('/');
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <ButtonGroup size='md'>
        <Button  color='primary' onClick={updateMovie}>Update Movie</Button>
        <Button  color='secondary' onClick={handleDelete}>Delete Movie</Button>
      </ButtonGroup>
    </div>
  );
}

export default Movie;
