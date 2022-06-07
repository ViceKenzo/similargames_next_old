import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  // Variables
  const [searchBarHidden, setSearchBarHidden] = useState(true);
  const [xIconVisible, setXIconVisible] = useState(false);

  const router = useRouter();

  // Refs
  const compSearchInput = useRef(null);
  const compSearchResults = useRef(null);
  const searchBar = useRef(null);

  // Effects
  useEffect(() => {
    compSearchInput.current.focus();

    window.addEventListener("mousedown", handleClickOutside, false);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, []);

  // Class Gets
  const getSearchIconClass = () => {
    var temp = "search-bar-icon ";
    temp += temp + xIconVisible ? "sbi-xmark" : "sbi-magnifying-glass";

    return temp;
  };

  const getSearchResultsClass = () => {
    var temp = "search-results ";

    if (searchBarHidden) temp += "inactive";

    return temp;
  };

  // Handlers
  const handleChange = (event) => {
    if (compSearchInput.current.value == "") {
      setSearchBarHidden(true);
      setXIconVisible(false);
    } else {
      setSearchBarHidden(false);
      setXIconVisible(true);
    }

    if (props.handleSearchInputChange) props.handleSearchInputChange(event);
  };

  const handleIconClick = () => {
    if (xIconVisible) {
      props.handleSearchInputChange({ target: { value: "" } });
      if (props.clearSearchSuggestions) props.clearSearchSuggestions();

      setSearchBarHidden(true);
    }

    compSearchInput.current.focus();

    setXIconVisible(!xIconVisible);
  };

  const handleClickOutside = (event) => {
    if (searchBar && !searchBar.current.contains(event.target)) {
      setSearchBarHidden(true);
    }
  };

  const handleClickSearchInput = (event) => {
    if (compSearchInput.current.value.length > 0) {
      setSearchBarHidden(false);
    }
  };

  // Functions
  const handleSuggestionsClick = (webName) => {
    router.push("/find-games-like/" + webName);
    setSearchBarHidden(true);
  };

  return (
    <div className="search-bar" ref={searchBar}>
      <div className="search-bar-input">
        <form onSubmit={props.submitSearch}>
          <input
            type="text"
            onChange={handleChange}
            value={props.searchInputValue}
            placeholder="Search for games that play like..."
            ref={compSearchInput}
            onClick={handleClickSearchInput}
            maxLength="100"
          />
          <input
            type="submit"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
            }}
            tabIndex="-1"
          />
        </form>
        <FontAwesomeIcon
          className={getSearchIconClass()}
          icon={xIconVisible ? faXmark : faMagnifyingGlass}
          onClick={() => {
            handleIconClick();
          }}
        />
      </div>

      <div className={getSearchResultsClass()} ref={compSearchResults}>
        {props.searchSuggestions.length != 0 &&
          props.searchSuggestions.map((game, index) => {
            return (
              <div key={index}>
                <a
                  key={index + "result"}
                  className="search-product-result"
                  href={"/find-games-like/" + game.web_name}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSuggestionsClick(game.web_name);
                  }}
                >
                  <div
                    key={index + "result-image"}
                    className="search-product-result-image"
                  >
                    <img
                      src={
                        props.serverAddress +
                        "/header_images/" +
                        game.image_id +
                        ".jpg"
                      }
                      width={162}
                      height={76}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // This is to prevent accidental looping
                        currentTarget.src = "/placeholders/thumbnail.jpg";
                      }}
                      alt={"Search for games similar to " + game.title}
                    ></img>
                  </div>
                  <div
                    key={index + "result-desc"}
                    className="search-product-result-desc"
                  >
                    <div
                      key={index + "result-title"}
                      className="search-product-result-title"
                    >
                      {game.title}
                    </div>
                    <div
                      key={index + "result-tags"}
                      className="search-product-result-tags"
                    >
                      {game.tags.join(" | ")}
                    </div>
                  </div>
                  <div
                    key={index + "result-release"}
                    className="search-product-result-release"
                  >
                    {game.release_date}
                  </div>
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
