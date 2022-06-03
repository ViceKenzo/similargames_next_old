import React from "react";
import Image from "next/dist/client/image";

import ThumbnailImage from "../public/placeholders/thumbnail.jpg";

function MoreLikeThisPanel(props) {
  // Variables
  //const navigate = useNavigate();

  // Element Gets
  const getGamesProjection = () => {
    if (props.games != null && props.games.length > 0) {
      return props.games.map((game, index) => {
        return (
          <a
            key={index + "link"}
            className="morelikethis-game"
            onClick={() => {
              //navigate("/game?id=" + game.id);
              props.requestAndSetGameDetail(game.id);
            }}
          >
            <Image
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
  return (
    <div className="morelikethis-panel">
      <div className="morelikethis-title-wrapper">
        <a
          to={"/find-games-like?q=" + props.mainGame.web_name}
          className="morelikethis-title"
        >
          More like this
        </a>
      </div>
      <div className="morelikethis-game-wrapper">{getGamesProjection()}</div>
    </div>
  );
}

export default MoreLikeThisPanel;
