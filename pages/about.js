import React, { useEffect } from "react";
import Head from "next/head";
import Config from "../config/config";

import AboutPanel from "../components/AboutPanel.js";

function AboutPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <React.Fragment>
      <Head>
        <title>SimilarGames - About</title>
        <meta
          name="description"
          content="You want to find a game that plays, looks and feels like a game you’ve loved, such that you can fall in love again? What a coincidence! This website was created exactly for that!"
        />
        <meta name="keywords" content={Config.metaTags} />
      </Head>
      <div className="about-wrapper">
        <AboutPanel />
      </div>
    </React.Fragment>
  );
}

export default AboutPage;
