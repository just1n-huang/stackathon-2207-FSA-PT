import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material/";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
          <div>
            <Button
              variant="text"
              style={{ color: "white", borderColor: "white" }}
            >
              <FavoriteBorderIcon />
            </Button>
            <Button
              href={regular}
              download={alt_description}
              variant="text"
              style={{ color: "white", borderColor: "white" }}
            >
              <DownloadIcon />
            </Button>
          </div>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} />
        </a>
      </div>
    </article>
  );
};

export default Photo;
