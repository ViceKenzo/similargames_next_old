import React, { useState, useEffect } from "react";
import Head from "next/head";
import Config from "../config/config";

import LandingPageSearchPanel from "../components/LandingPageSearchPanel.js";
import PopularCardPanel from "../components/PopularCardPanel.js";

function LandingPage(props) {
  // Variables
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Head>
        <meta
          name="description"
          content="Find games that look, play and feel like other games you’ve played before. With this new and free 'Games Like Engine', you can explore the entire catalog of games found on Gog, Steam and Epic Games Store."
        />
        <meta name="keywords" content={Config.metaTags} />
        <title>SimilarGames - Find Related Games</title>
      </Head>

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
      <PopularCardPanel
        serverAddress={Config.serverAddress}
        popularGames={props.popularGames}
      />
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const res = await fetch(Config.serverAddress + "/populargames");
  const popularGames = await res.json();

  return { props: { popularGames } };
}

export default LandingPage;
