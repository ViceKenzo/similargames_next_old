import React, { useEffect, useState } from "react";
import Config from "../config/config";
//import ReactGA from "react-ga";

import BrowseHeader from "../components/BrowseHeader.js";
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

  //const location = useLocation();
  const location = { pathname: "lmaoexdee", search: "loooool" };
  //ReactGA.initialize(Config.GA_TRACKING_CODE);

  //Effects
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props);
    setSimilarGames();
  }, []);

  useEffect(() => {
    updateSearchResults();
  }, [gameData]);

  useEffect(() => {
    updateSearchResults();
  }, [sorting]);

  useEffect(() => {
    updateSearchResults();
  }, [showNSFW]);

  useEffect(() => {
    updateSearchResults();
  }, [showSameDeveloper]);

  // useEffect(() => {
  //   if (location.search && location.search != "") {
  //     let qParam = new URLSearchParams(location.search).get("q");
  //     if (!qParam || qParam != "") {
  //       requestSimilarGames(qParam);
  //     }
  //   }
  // }, [location.search]);

  useEffect(() => {
    if (targetGame) {
      const delay = setTimeout(() => {
        // ReactGA.event({
        //   category: "Filter Change",
        //   action: "Match Value",
        //   label: matchValue,
        // });
        updateSearchResults();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [matchValue]);

  // Handlers
  const handleSortChange = (event) => {
    if (targetGame) {
      //   ReactGA.event({
      //     category: "Filter Change",
      //     action: "Sort Change",
      //     label: event.target.value,
      //   });
    }

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

    if (targetGame) {
      //   ReactGA.event({
      //     category: "Filter Change",
      //     action: "NSFW Click",
      //     label: !showNSFW + "",
      //   });
    }

    setShowNSFW(!showNSFW);
  };

  const handleSameDeveloperClick = () => {
    if (!targetGame) return;

    if (targetGame) {
      //   ReactGA.event({
      //     category: "Filter Change",
      //     action: "Same Developer Click",
      //     label: !showSameDeveloper + "",
      //   });
    }

    setShowSameDeveloper(!showSameDeveloper);
  };

  // Functions
  const updateSearchResults = () => {
    if (!targetGame) return;

    function sortComparator(sortingDef) {
      return function (a, b) {
        switch (sortingDef) {
          case "Release Date":
            let timeValuesA = a.release_date.split("/");
            let timeValuesB = b.release_date.split("/");

            for (let i = 2; i >= 0; --i) {
              if (timeValuesA[i] < timeValuesB[i]) return 1;
              if (timeValuesA[i] > timeValuesB[i]) return -1;
            }
            return 0;
          case "Name":
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
          case "Relevance":
            if (a.matching < b.matching) return 1;
            if (a.matching > b.matching) return -1;
            return 0;
        }
      };
    }

    // Filter the gameData, then sort it
    let newSearchResults = gameData.filter((item) => {
      // If the item matching is lower than the set matching, return false
      if (item.matching < matchValue) {
        return false;
      }

      // If NSFW is not checked, return false for all items with the NSFW tag
      if (!showNSFW) {
        for (let i = 0; i < item.tags.length; ++i) {
          if (item.tags[i] == "NSFW") return false;
        }
      }

      // Developer
      if (!showSameDeveloper) {
        if (item.developer == targetGame.developer) return false;
      }

      return true;
    });
    newSearchResults = newSearchResults.sort(sortComparator(sorting));

    let newTotalPages = 1;
    if (newSearchResults.length > 0)
      newTotalPages = Math.ceil(newSearchResults.length / pageing);
    let newCurrentPage = 1;

    setTotalPages(newTotalPages);
    handlePageChange(newCurrentPage);
    setSearchResults(newSearchResults);

    window.scrollTo(0, 0);
  };

  const setSimilarGames = () => {
    // if (xhttp.status == 400) {
    //   setSearchResultMessage(
    //     "Sorry! The game you entered does not exist in our system."
    //   );
    //   setGameData([]);
    //   return;
    // } else if (xhttp.status == 404) {
    //   setSearchResultMessage(
    //     "Sorry! The game you entered does not exist in our system."
    //   );
    //   setGameData([]);
    //   return;
    // } else if (xhttp.status == 200) {
    //   if (!xhttp.response) {
    //     setSearchResultMessage("Sadly, no similar games were found.");
    //     setGameData([]);
    //     return;
    //   }
    // }

    if (
      props.responseObject == null ||
      props.responseObject.game == null ||
      props.responseObject.similarGames == null
    )
      return;

    if (props.responseObject.similarGames.length <= 0) {
      setSearchResultMessage("No similar games were found.");
      setTargetGame(props.responseObject.game);
      setGameData([]);
    } else {
      setTargetGame(props.responseObject.game);
      setGameData(props.responseObject.similarGames);
    }
  };

  return (
    <div className="browsing-wrapper">
      <BrowseHeader
        searchSuggestions={searchSuggestions}
        clearSearchSuggestions={() => {
          setSearchSuggestions([]);
        }}
        serverAddress={Config.serverAddress}
        targetGame={targetGame}
      />
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
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    Config.serverAddress + "/similargames" + "/" + "God_of_War"
  );
  const responseObject = await res.json();

  return { props: { responseObject } };
}

export default BrowsePage;
