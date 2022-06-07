import "../styles/globals.css";
import "../styles/AboutPage.css";
import "../styles/AboutPanel.css";
import "../styles/ArrowButton.css";
import "../styles/BrowseFilters.css";
import "../styles/BrowseHeader.css";
import "../styles/BrowseNavigator.css";
import "../styles/BrowsePage.css";
import "../styles/CardProjector.css";
import "../styles/ConnectionErrorPanel.css";
import "../styles/Error.css";
import "../styles/Footer.css";
import "../styles/GameDetailCard.css";
import "../styles/GameDetailPage.css";
import "../styles/LandingPageSearchPanel.css";
import "../styles/MoreLikeThisPanel.css";
import "../styles/NavBar.css";
import "../styles/PopularCardPanel.css";
import "../styles/ProjectorControlPanel.css";
import "../styles/SearchBar.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
import Head from "next/head";
import Config from "../config/config";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

if (process.env.NODE_ENV === "development") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

function MyApp({ Component, pageProps }) {
  // Variables
  const router = useRouter();
  ReactGA.initialize(Config.GA_TRACKING_CODE);

  // Effects
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [router.pathname, router.query.slug]);

  // Functions
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
