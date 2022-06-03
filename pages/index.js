import React, { useState, useEffect } from "react";
import Config from "../config/config";

import LandingPageSearchPanel from "../components/LandingPageSearchPanel.js";
import PopularCardPanel from "../components/PopularCardPanel.js";

function LandingPage(props) {
  // Variables
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  let timeOut = null;

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInputValue]);

  // Handlers
  const handleSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  // Functions
  const submitSearch = (event) => {
    if (event) event.preventDefault();

    setSearchSuggestions([]);
  };

  const requestSuggestionsFromServer = () => {
    if (!searchInputValue || searchInputValue == "") return;

    setSearchSuggestions([]);

    const xhttp = new XMLHttpRequest();

    const tempSearchInputValue = searchInputValue.replace(/[\W_]+/g, "");

    xhttp.open(
      "get",
      Config.serverAddress + "/suggestedgames/" + tempSearchInputValue,
      true
    );

    xhttp.send();

    xhttp.onload = () => {
      let suggestedGames = JSON.parse(xhttp.response);
      setSearchSuggestions(suggestedGames);
    };
  };

  return (
    <React.Fragment>
      <a
        style={{ display: "hidden" }}
        to={"/find-games-like?q=" + searchInputValue}
      />

      <LandingPageSearchPanel
        submitSearch={submitSearch}
        searchSuggestions={searchSuggestions}
        handleSearchInputChange={handleSearchInputChange}
        clearSearchSuggestions={() => {
          setSearchSuggestions([]);
        }}
        searchInputValue={searchInputValue}
        serverAddress={Config.serverAddress}
      />
      <PopularCardPanel serverAddress={Config.serverAddress} />
    </React.Fragment>
  );
}

export default LandingPage;
