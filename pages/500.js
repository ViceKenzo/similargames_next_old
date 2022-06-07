import React, { useEffect } from "react";
import Head from "next/head";

import ConnectionErrorPanel from "../components/ConnectionErrorPanel.js";

function ConnectionErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <React.Fragment>
      <Head>
        <title>SimilarGames - Connection Error</title>
      </Head>
      <ConnectionErrorPanel />
    </React.Fragment>
  );
}

export default ConnectionErrorPage;
