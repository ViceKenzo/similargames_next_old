import React, { useEffect, useState } from "react";
import Head from "next/head";
import Config from "../config/config";

import BrowseNavigator from "../components/BrowseNavigator.js";
import BrowseFilters from "../components/BrowseFilters.js";

function BrowsePage(props) {
  // Variables
  const [sorting, setSorting] = useState("Relevance");
  const [matchValue, setMatchValue] = useState(60);
  const [showNSFW, setShowNSFW] = useState(false);
  const [showSameDeveloper, setShowSameDeveloper] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageing] = useState(20);

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [targetGame, setTargetGame] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchResultMessage, setSearchResultMessage] = useState(
    "Search for a game and see others like it!"
  );

  //Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handlers
  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);

    window.scrollTo(0, 0);
  };

  const handleChangeMatching = (event) => {
    setMatchValue(event.target.value);
  };

  const handleNSFWClick = () => {
    if (!targetGame) return;

    setShowNSFW(!showNSFW);
  };

  const handleSameDeveloperClick = () => {
    if (!targetGame) return;

    setShowSameDeveloper(!showSameDeveloper);
  };

  // Functions
  return (
    <React.Fragment>
      <Head>
        <title>SimilarGames - Search</title>
        <meta name="description" content="Search for similar games." />
        <meta name="keywords" content={Config.metaTags} />
      </Head>
      <div className="browsing-wrapper">
        <div className="browse-header no-game">
          <div className="browse-header-search-announcer">
            Search for a game
          </div>
        </div>
        <div className="browsing-navigation-filter-wrapper">
          <div className="browsing-filters-wrapper-left">
            <BrowseFilters
              matchValue={matchValue}
              handleChangeMatching={handleChangeMatching}
              handleNSFWClick={handleNSFWClick}
              handleSameDeveloperClick={handleSameDeveloperClick}
            />
          </div>
          <div className="browsing-navigator-wrapper">
            <BrowseNavigator
              currentPage={currentPage}
              totalPages={totalPages}
              sorting={sorting}
              searchResults={searchResults.filter(
                function () {
                  let itemIsWorthy = false;

                  if (this.count >= this.startIdx && this.count < this.endIdx) {
                    itemIsWorthy = true;
                  }

                  this.count++;
                  return itemIsWorthy;
                },
                {
                  count: 0,
                  startIdx: (currentPage - 1) * pageing,
                  endIdx: currentPage * pageing,
                }
              )}
              handleSortChange={handleSortChange}
              handlePageChange={handlePageChange}
              searchResultMessage={searchResultMessage}
              config={Config}
            />
          </div>
          <div className="browsing-filters-wrapper-right">
            <BrowseFilters
              matchValue={matchValue}
              handleChangeMatching={handleChangeMatching}
              handleNSFWClick={handleNSFWClick}
              handleSameDeveloperClick={handleSameDeveloperClick}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BrowsePage;
