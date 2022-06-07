import React, { useEffect } from "react";
import Head from "next/head";

import Error from "../components/Error.js";

function ErrorPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <React.Fragment>
      <Head>
        <title>SimilarGames - Error 404</title>
      </Head>
      <Error />
    </React.Fragment>
  );
}

export default ErrorPage;
