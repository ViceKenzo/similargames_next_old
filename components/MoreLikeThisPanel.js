import React from "react";
import { useRouter } from "next/router";

import ThumbnailImage from "../public/placeholders/thumbnail.jpg";

function MoreLikeThisPanel(props) {
  // Variables
  const router = useRouter();

  // Element Gets
  const getGamesProjection = () => {
    if (props.games != null && props.games.length > 0) {
      return props.games.map((game, index) => {
        return (
          <a
            key={index + "link"}
            href={"/game/" + game.id}
            className="morelikethis-game"
            onClick={(event) => {
              event.preventDefault();
              handleGameDetailClick(game.id);
            }}
          >
            <img
              key={index + "image"}
              className="morelikethis-game-image"
              src={
                props.serverAddress + "/header_images/" + game.image_id + ".jpg"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to prevent accidental looping
                currentTarget.src = ThumbnailImage;
              }}
              alt={game.title}
            />
            <div key={index + "title"} className="morelikethis-game-title">
              <p key={index + "title-p"}>{game.title}</p>
            </div>
          </a>
        );
      });
    } else return;
  };

  // Functions
  const handleMoreLikeThisClick = () => {
    router.push("/find-games-like/" + props.mainGame.web_name);
  };

  const handleGameDetailClick = (id) => {
    router.push("/game/" + id);
  };

  return (
    <div className="morelikethis-panel">
      <div className="morelikethis-title-wrapper">
        <a
          href={"/find-games-like/" + props.mainGame.web_name}
          className="morelikethis-title"
          onClick={(event) => {
            event.preventDefault();
            handleMoreLikeThisClick();
          }}
        >
          More like this
        </a>
      </div>
      <div className="morelikethis-game-wrapper">{getGamesProjection()}</div>
    </div>
  );
}

export default MoreLikeThisPanel;
