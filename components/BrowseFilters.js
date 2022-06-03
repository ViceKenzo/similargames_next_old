import React from "react";

function BrowseFilters(props) {
  // Functions
  return (
    <div className="search-filters">
      <div className="search-filter-wrapper" id="match-filter-wrapper">
        <div className="search-filter-title">Minimum Match</div>
        <div className="search-filter-frame">
          <input
            type="range"
            id="matching"
            name="matching"
            min="50"
            max="100"
            value={props.matchValue}
            onChange={props.handleChangeMatching}
          />
          <div className="search-filter-slider-perctentage">
            {props.matchValue + "%"}
          </div>
        </div>
      </div>

      <div className="search-filter-wrapper" id="bonus-filter-wrapper">
        <div className="search-filter-title">Bonus</div>
        <div className="search-filter-frame">
          <div className="search-filter-bonus-checkbox-list">
            <div className="search-filter-checkbox-wrapper">
              <input
                type="checkbox"
                className="search-filter-checkbox"
                id="nsfw-checkbox"
                name="nsfw-checkbox"
                onClick={props.handleNSFWClick}
              />
              <div
                className="search-filter-checkbox-name"
                title="Show games that have an NSFW tag"
              >
                NSFW
              </div>
            </div>

            <div className="search-filter-checkbox-wrapper">
              <input
                type="checkbox"
                className="search-filter-checkbox"
                id="same-developer-checkbox"
                name="same-developer-checkbox"
                onClick={props.handleSameDeveloperClick}
              />
              <div
                className="search-filter-checkbox-name"
                title="Show games that have the same developer as the requested game"
              >
                Same Dev.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseFilters;
