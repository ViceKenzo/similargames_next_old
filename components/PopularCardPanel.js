import React, { useState, useEffect } from "react";
import Image from "next/image";

import ThumbnailImage from "../public/placeholders/thumbnail.jpg";

function PopularCardPanel(props) {
  // Variables
  const [popularGames, setPopularGames] = useState([]);
  //const navigate = useNavigate();

  // Effects
  useEffect(() => {
    requestPopularGames();
  }, []);

  // Class Gets
  const getPopularCardPanel = () => {
    return (
      <div className="popular-card-panel">
        <div className="popular-card-panel-header">Popular</div>
        <div className="popular-card-projector">
          {popularGames.map((game, index) => {
            return (
              <div className="popular-card" key={index}>
                <div
                  className="popular-card-image-wrapper"
                  key={index + "image-wrapper"}
                >
                  <a to={"/game?id=" + game.id}>
                    <img
                      className="popular-card-image"
                      key={index + "card-image"}
                      src={
                        props.serverAddress +
                        "/header_images/" +
                        game.image_id +
                        ".jpg"
                      }
                      width={325}
                      height={170}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // This is to prevent accidental looping
                        currentTarget.src = ThumbnailImage;
                      }}
                      alt={game.title}
                    />
                  </a>
                </div>
                <div
                  className="popular-card-text-wrapper"
                  key={index + "card-text-wrapper"}
                >
                  <div
                    className="popular-card-title"
                    key={index + "card-title"}
                  >
                    {game.title}
                  </div>
                  <div className="popular-card-tags" key={index + "card-tags"}>
                    <p>{game.tags.join(" | ")}</p>
                  </div>
                </div>
                <a
                  className="popular-card-button"
                  key={index + "card-button"}
                  to={"/find-games-like?q=" + game.web_name}
                >
                  <span
                    className="popular-card-button-text"
                    key={index + "card-button-text"}
                  >
                    Find Games Like This
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Functions
  const requestPopularGames = () => {
    const xhttp = new XMLHttpRequest();

    let requestUrl = props.serverAddress + "/populargames";

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onerror = () => {
      //navigate("/connection-error");
    };

    xhttp.onload = () => {
      if (!xhttp.response) return;

      let tempPopularGames = JSON.parse(xhttp.response);

      if (!tempPopularGames || tempPopularGames.length === 0) {
        //navigate("/connection-error");
      }

      setPopularGames(tempPopularGames);
    };
  };

  return <React.Fragment>{getPopularCardPanel()}</React.Fragment>;
}

export default PopularCardPanel;
