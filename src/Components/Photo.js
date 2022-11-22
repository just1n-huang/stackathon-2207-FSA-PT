import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { createFave, loginWithToken } from "../store";

const Photo = ({
  id,
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
          <div>
            {auth.id ? (
              <Button
                variant="text"
                style={{ color: "white", borderColor: "white" }}
                onClick={() => {
                  dispatch(
                    createFave({
                      id,
                      imageUrl: regular,
                      alt_description,
                      likes,
                      username: name,
                      portfolioUrl: portfolio_url,
                      profileImage: medium,
                      userId: auth.id,
                    })
                  );
                }}
              >
                <FavoriteBorderIcon />
              </Button>
            ) : null}
            <Button
              href={regular}
              download={alt_description}
              variant="text"
              style={{ color: "white", borderColor: "white" }}
            >
              <DownloadIcon />
            </Button>
            <Button
              variant="text"
              style={{ color: "white", borderColor: "white" }}
              onClick={() => {
                navigator.clipboard.writeText(`${regular}`);
              }}
            >
              <ContentCopyIcon />
            </Button>
          </div>
        </div>
        <a href={portfolio_url}>
          <img className="profile-photo" src={medium} alt={name} />
        </a>
      </div>
    </article>
  );
};

export default Photo;
