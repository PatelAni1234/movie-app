import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/SingleContent/SingleContent";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Movies.css'
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres"
import useGenre  from "../../Hooks/useGenre";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [np ,setNumber_of_pages] = useState();
  const [selectedgenres , setSelectedGenres] = useState([]);
  const [genres , setGenres] =useState([]);
  const genreForURL = useGenre(selectedgenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      ` 
            https://api.themoviedb.org/3/discover/movie?api_key=bae2c35f926e868a96431770c54ed145&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}
      `
    );

    setContent(data.results);
    
    setNumber_of_pages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
      
  }, [page , genreForURL]);
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedgenres={selectedgenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage = {setPage}
      />
      <div className="movie">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
        <CustomPagination setPage={setPage} np={np} />
      </div>
    </div>
  );
};

export default Movies;
