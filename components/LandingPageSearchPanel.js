import React from "react";
import Image from "next/image";

import SearchBar from "./SearchBar.js";

import LogoEpicGamesStore from "../public/images/logo_epicgamesstore.png";
import LogoGog from "../public/images/logo_gog.png";
import LogoSteamStore from "../public/images/logo_steam.png";
import SimilarGamesHeaderImage from "../public/images/similargames_title.png";

function LandingPageSearchPanel(props) {
  // Functions
  return (
    <div className="landing-page-search-panel">
      <div className="search-panel-image-wrapper">
        <Image
          className="search-panel-header"
          src={SimilarGamesHeaderImage}
          alt="Similar Games Logo"
          width={700}
          height={152.17}
        />
      </div>
      <div className="search-panel-search-bar">
        <SearchBar
          submitSearch={props.submitSearch}
          searchSuggestions={props.searchSuggestions}
          handleSearchInputChange={props.handleSearchInputChange}
          clearSearchSuggestions={props.clearSearchSuggestions}
          searchInputValue={props.searchInputValue}
          serverAddress={props.serverAddress}
        ></SearchBar>
      </div>
      <div className="search-panel-main-phrase">
        Find the games you&apos;ll love.
      </div>
      <div className="search-panel-footer">
        <span className="search-panel-icon-announcer">On:</span>
        <div className="search-panel-icon-wrapper">
          <a
            href="https://www.epicgames.com/store"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="logo-epic"
              src={LogoEpicGamesStore}
              alt="Epic Games Store Logo"
              width={50}
              height={76.25}
            />
          </a>
          <a href="https://www.gog.com/" target="_blank" rel="noreferrer">
            <Image
              className="logo-gog"
              src={LogoGog}
              alt="Gog Logo"
              width={50}
              height={50}
            />
          </a>
          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="logo-steam "
              src={LogoSteamStore}
              alt="Steam Store Logo"
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPageSearchPanel;
