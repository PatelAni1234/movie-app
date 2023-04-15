import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../config/config";
import { Badge } from "@material-ui/core";




const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const num = vote_average.toFixed(1);
  
  return (
    <div className="media">
      <Badge
        badgeContent={num}
        color={vote_average > 6 ? "primary" : "secondary"}
      />

      <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className="combine">
        {media_type === "tv" ? "TV series" : "Movie"}
        <span className="date">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
