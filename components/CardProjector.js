import React from "react";
import { useRouter } from "next/router";

function CardProjector(props) {
  // Variables
  const router = useRouter();

  // Element Gets
  const getProjection = () => {
    if (!props.searchResults || props.searchResults.length == 0) {
      return getNoSearchResultsCard(props.searchResultMessage);
    } else {
      return getSearchResultsProjection();
    }
  };

  const getSearchResultsProjection = () => {
    return props.searchResults.map((game, index) => {
      return (
        <a
          key={index + "card"}
          className="card"
          href={"/game/" + game.id}
          onClick={(event) => {
            event.preventDefault();
            handleGameDetailClick(game.id);
          }}
        >
          <div
            key={index + "card-image-wrapper"}
            className="card-image-wrapper"
          >
            <img
              key={index + "card-image"}
              className="card-image"
              src={
                props.config.serverAddress +
                "/header_images/" +
                game.image_id +
                ".jpg"
              }
              width={175}
              height={85}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // This is to prevent accidental looping
                currentTarget.src = "/placeholders/thumbnail.jpg";
              }}
              alt={game.title}
            />
          </div>
          <div key={index + "card-text-wrapper"} className="card-text-wrapper">
            <div key={index + "card-title"} className="card-title">
              {game.title}
            </div>
            <div key={index + "card-tags"} className="card-tags">
              {game.tags.join(" | ")}
            </div>
          </div>
          <div key={index + "card-release-date"} className="card-release-date">
            {getReleaseDate(game)}
          </div>
        </a>
      );
    });
  };

  const getNoSearchResultsCard = (cardDescription) => {
    return (
      <div className="card" id="no-search-result-card">
        <div className="card-image-wrapper">
          <img
            className="card-image"
            src="/../placeholders/thumbnail.jpg"
            width={175}
            height={85}
            alt="Search For Similar Games Question Mark Image"
          />
        </div>
        <div className="card-text-wrapper">
          <div className="card-title">{cardDescription}</div>
        </div>
      </div>
    );
  };

  // Functions
  const getReleaseDate = (game) => {
    if (
      game.release_date &&
      !game.release_date.includes("1970") &&
      !game.release_date.includes("1969")
    )
      return game.release_date;
    else return null;
  };

  const handleGameDetailClick = (id) => {
    router.push("/game/" + id);
  };

  return <div className="card-projector">{getProjection()}</div>;
}

export default CardProjector;
