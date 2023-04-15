import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import "../pages/Movies/Movies.css";
const Genres = ({
  type,
  selectedgenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const genereFetch = async () => {
    const { data } = await axios.get(
      ` 
      https://api.themoviedb.org/3/genre/${type}/list?api_key=bae2c35f926e868a96431770c54ed145&language=en-US

      `
    );

    setGenres(data.genres);
  };

  const handleDelete = (genre) =>{
        
        setSelectedGenres(
          selectedgenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
  }
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedgenres, genre]);
    setGenres(genres.filter((x) => x.id !== genre.id));
    setPage(1);
  };

  useEffect(() => {
    genereFetch();
  }, []);

  return (
    <div className="g">
      {selectedgenres &&
        selectedgenres.map((genre) => (
          <Chip
            style={{ margin: 4 }}
            label={genre.name}
            clickable
            size="small"
            color="primary"
            key={genre.id}
            onDelete={()=>{
                handleDelete(genre);
            }}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: 4 }}
            label={genre.name}
            clickable
            size="small"
            
            key={genre.id}
            onClick = {()=>{
                handleAdd(genre);
            }}
            
          />
        ))}
    </div>
  );
};

export default Genres;
