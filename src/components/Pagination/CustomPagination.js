import React from "react";
import Pagination from "@material-ui/lab/Pagination";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const CustomPagination = ({ setPage , np = 340 }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  const darkTheme = createTheme({
    palette:{
        type:"dark",
    }
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={np}
          color="primary"
          onChange={(event, value) => {
            handleChange(value);
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
