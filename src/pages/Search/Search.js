import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";


const Search = () => {
  const [type, setType] = useState(0);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const [noOfpages, setNoOfPages] = useState();
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const FetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=bae2c35f926e868a96431770c54ed145&language=en-US&page=${page}&query=${searchText}&include_adult=false`
    );

    setContent(data.results);
    setNoOfPages(data.total_pages);
  };

  useEffect(() => {
    FetchSearch();
    window.scroll(0, 0);
  }, [page, type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search" style={{ display: "flex" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchbox"
            id="standard-basic"
            label="Search"
            variant="filled"
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
            onClick={FetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ marginTop: 10 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV-Series" />
        </Tabs>
      </ThemeProvider>
      <div className="movie" style={{ marginTop: 40 }}>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? (
            <h2 style={{ marginTop: 100 }}>No Series Found</h2>
          ) : (
            <h2 style={{ marginTop: 100 }}>No Movies Found</h2>
          ))}
      </div>
      {noOfpages > 1 && <CustomPagination setPage={setPage} np={noOfpages} />}
    </div>
  );
};

export default Search;
