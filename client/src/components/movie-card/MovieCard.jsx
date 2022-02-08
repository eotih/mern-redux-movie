import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category as cate } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = ({ item, category }) => {
  const { id, poster_path, backdrop_path, title, name } = item;
  const link = "/" + cate[category] + "/" + id;
  const bg = apiConfig.w500Image(poster_path || backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{title || name}</h3>
    </Link>
  );
};

export default MovieCard;
