import React, { useEffect } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { createFave, deleteFave, fetchFave, loginWithToken } from "../store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Face } from "@mui/icons-material";

const FavoritePhotos = () => {
  const { auth } = useSelector((state) => state);
  const { fave } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFave());
    dispatch(loginWithToken());
  }, []);

  console.log(auth);
  console.log(fave);

  const favoritedByAuth = fave.filter((post) => post.userId === auth.id);

  if (favoritedByAuth.length === 0)
    return <h4 style={{ margin: "1rem" }}>Save some photos first</h4>;

  return (
    <section className="photos">
      <div className="photos-center">
        {favoritedByAuth.map((post) => {
          return (
            <div key={post.id}>
              <article className="photo" key={post.id}>
                <img src={post.imageUrl} alt={post.alt_description} />
                <div className="photo-info">
                  <div>
                    <h4>{post.name}</h4>
                    <p>{post.likes} likes</p>
                    <div>
                      {auth.id ? (
                        <Button
                          variant="text"
                          style={{ color: "white", borderColor: "white" }}
                          onClick={() => {
                            dispatch(deleteFave(post));
                          }}
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      ) : null}
                      <Button
                        href={post.imageUrl}
                        download={post.alt_description}
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
                  <a href={post.portfolio_url}>
                    <img src={post.profileImage} alt={post.username} />
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FavoritePhotos;
