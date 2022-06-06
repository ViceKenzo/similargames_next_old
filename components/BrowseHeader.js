import React from "react";
import { useRouter } from "next/router";

import ThumbnailImage from "../public/placeholders/thumbnail.jpg";

function BrowseHeader(props) {
  // Variables
  const router = useRouter();

  // Class Gets
  const getDeveloperClass = () => {
    let cName = "browse-header-developer";

    if (
      !props.targetGame ||
      !props.targetGame.developer ||
      props.targetGame.developer == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getPublisherClass = () => {
    let cName = "browse-header-publisher";

    if (
      !props.targetGame ||
      !props.targetGame.publisher ||
      props.targetGame.publisher == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getInfoPanelRightClass = () => {
    let cName = "browse-header-game-info-right";

    if (
      !props.targetGame ||
      !props.targetGame.release_date ||
      props.targetGame.release_date == ""
    ) {
      cName += " no-display";
    }

    return cName;
  };

  const getInfoPanelLeftClass = () => {
    let cName = "browse-header-game-info-left";

    if (
      !props.targetGame ||
      (!props.targetGame.developer && !props.targetGame.publisher)
    ) {
      cName += " no-display";
    } else if (
      !props.targetGame.release_date ||
      props.targetGame.release_date == ""
    ) {
      cName += " no-release-date";
    }

    return cName;
  };

  const getBrowseHeaderClass = () => {
    let cName = "browse-header";

    if (!props.targetGame) {
      cName += " no-game";
    }

    return cName;
  };

  // Element Gets
  const getGameTitle = () => {
    if (props.targetGame) {
      return props.targetGame.title;
    } else return null;
  };

  const getDeveloper = () => {
    if (props.targetGame) {
      return props.targetGame.developer;
    } else return null;
  };

  const getPublisher = () => {
    if (props.targetGame) {
      return props.targetGame.publisher;
    } else return null;
  };

  const getReleaseDate = () => {
    if (props.targetGame) {
      return props.targetGame.release_date;
    } else return null;
  };

  const getImageSrc = () => {
    if (props.targetGame) {
      return (
        props.serverAddress +
        "/header_images/" +
        props.targetGame.image_id +
        ".jpg"
      );
    } else return { ThumbnailImage };
  };

  const getImageAlt = () => {
    if (props.targetGame) {
      return props.targetGame.title;
    } else return "Find games that play like..";
  };

  // Functions
  const getLinkTo = () => {
    if (props.targetGame) {
      return "/game/" + props.targetGame.id;
    } else return "";
  };

  const handleGameDetailClick = () => {
    router.push(getLinkTo());
  };

  return (
    <div className={getBrowseHeaderClass()}>
      <div className="browse-header-search-announcer">Search for a game</div>
      <div className="browse-header-left">
        <a
          href={getLinkTo()}
          onClick={(event) => {
            event.preventDefault();
            handleGameDetailClick();
          }}
          className="browse-header-image-wrapper"
        >
          <img
            alt={getImageAlt()}
            src={getImageSrc()}
            className="browse-header-image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // This is to prevent accidental looping
              currentTarget.src = ThumbnailImage;
            }}
          />
        </a>
        <div className="browse-header-announcer-wrapper">
          <div className="browse-header-gameslike-announcer">Games like:</div>
          <a
            className="browse-header-game-title"
            href={getLinkTo()}
            onClick={(event) => {
              event.preventDefault();
              handleGameDetailClick();
            }}
          >
            {getGameTitle()}
          </a>
        </div>
      </div>
      <div className="browse-header-right">
        <div className={getInfoPanelLeftClass()}>
          <div className={getDeveloperClass()}>
            {"Developer: " + getDeveloper()}
          </div>
          <div className={getPublisherClass()}>
            {"Publisher: " + getPublisher()}
          </div>
        </div>
        <div className={getInfoPanelRightClass()}>
          <div className="browse-header-release-date-announcer">
            Release Date:
          </div>
          <div className="browse-header-release-date">{getReleaseDate()}</div>
        </div>
      </div>
    </div>
  );
}

export default BrowseHeader;
