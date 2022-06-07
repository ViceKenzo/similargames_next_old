import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function PopularCardPanel(props) {
  // Variables
  const router = useRouter();

  // Class Gets
  const getPopularCardPanel = () => {
    return (
      <div className="popular-card-panel">
        <div className="popular-card-panel-header">Popular</div>
        <div className="popular-card-projector">
          {props.popularGames.map((game, index) => {
            return (
              <div className="popular-card" key={index}>
                <div
                  className="popular-card-image-wrapper"
                  key={index + "image-wrapper"}
                >
                  <a
                    href={"/game/" + game.id}
                    onClick={(event) => {
                      event.preventDefault();
                      handleGameDetailClick(game.id);
                    }}
                  >
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
                        currentTarget.src = "/placeholders/thumbnail.jpg";
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
                  href={"/find-games-like/" + game.web_name}
                  value={game.web_name}
                  onClick={(event) => {
                    event.preventDefault();
                    handleGamesLikeClick(game.web_name);
                  }}
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

  const handleGamesLikeClick = (webName) => {
    router.push("/find-games-like/" + webName);
  };

  const handleGameDetailClick = (id) => {
    router.push("/game/" + id);
  };

  return <React.Fragment>{getPopularCardPanel()}</React.Fragment>;
}

export default PopularCardPanel;
