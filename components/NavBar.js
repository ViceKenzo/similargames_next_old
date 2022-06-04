import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Config from "../config/config";
//import ReactGA from "react-ga";

import SearchBar from "./SearchBar.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  // Variables
  const [menuItems] = useState([
    {
      title: "Browse",
      href: "/find-games-like",
      cName: "nav-links",
    },
    {
      title: "About",
      href: "/about",
      cName: "nav-links",
    },
  ]);
  const [clicked, setClicked] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  //const location = useLocation();
  const location = { pathname: "lmao", search: "saveme" };

  //ReactGA.initialize(Config.GA_TRACKING_CODE);

  // Effects
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    //ReactGA.pageview(window.location.href);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      requestSuggestionsFromServer();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInputValue]);

  // Refs
  const landingRoutingEl = useRef(null);

  // Class Gets
  const getSearchBarNavBarWrapperClass = () => {
    if (location.pathname == "/") {
      return "search-bar-hidden";
    } else {
      return "search-bar-visible";
    }
  };

  // Handlers
  const handleSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  // Functions
  const closeMobileMenu = () => {
    setClicked(false);
  };

  const submitSearch = (event) => {
    if (event) event.preventDefault();

    setSearchSuggestions([]);

    landingRoutingEl.current.click();
  };

  const requestSuggestionsFromServer = () => {
    if (!searchInputValue || searchInputValue == "") return;
    setSearchSuggestions([]);

    const xhttp = new XMLHttpRequest();

    let tempSearchInputValue = searchInputValue.replace(/[\W_]+/g, "");

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
    <div className="navbar-wrapper">
      <nav className="NavBarItems">
        <Link href="/">
          <a className="navbar-logo">SimilarGames</a>
        </Link>
        <div
          className={
            "search-bar-wrapper" + " " + getSearchBarNavBarWrapperClass()
          }
        >
          <a
            style={{ display: "hidden" }}
            to={"/find-games-like?q=" + searchInputValue}
            ref={landingRoutingEl}
          />
          <SearchBar
            submitSearch={submitSearch}
            searchSuggestions={searchSuggestions}
            handleSearchInputChange={handleSearchInputChange}
            clearSearchSuggestions={() => {
              setSearchSuggestions([]);
            }}
            searchInputValue={searchInputValue}
            serverAddress={Config.serverAddress}
          />
        </div>
        <div className="menu-icon-wrapper">
          <div className="menu-icon">
            <FontAwesomeIcon
              onClick={handleClick}
              icon={clicked ? faXmark : faBars}
              width={21}
              height={24}
            />
          </div>

          {/* Mobile Menu, hidden */}
          <ul
            className={clicked ? "nav-menu-mobile active" : "nav-menu-mobile"}
          >
            {menuItems.map((item, index) => {
              return (
                <Link key={index * 2 + item.cName} href={item.href}>
                  <a
                    className={item.cName}
                    onClick={() => {
                      closeMobileMenu();
                    }}
                  >
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link key={index + item.cName} href={item.href}>
                  <a
                    className={item.cName}
                    onClick={() => {
                      closeMobileMenu();
                    }}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={"search-bar-mobile " + getSearchBarNavBarWrapperClass()}>
        <SearchBar
          submitSearch={submitSearch}
          searchSuggestions={searchSuggestions}
          handleSearchInputChange={handleSearchInputChange}
          clearSearchSuggestions={() => {
            setSearchSuggestions([]);
          }}
          searchInputValue={searchInputValue}
          serverAddress={Config.serverAddress}
        />
      </div>
    </div>
  );
}

export default NavBar;
