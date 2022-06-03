import React from "react";
import Image from "next/dist/client/image";

import ErrorImage from "../public/images/page_not_found.jpg";

function ConnectionErrorPanel() {
  // Functions
  return (
    <div className="connection-error-wrapper">
      <div className="connection-error-text-wrapper">
        <div className="connection-error-header">
          Could not connect to the server!
        </div>
        <div className="connection-error-report">
          Make sure to check your internet connection. If your connection works
          fine then our servers are probably down.
          <br />
          We apologize for the inconvenience and we'll be right back!
        </div>
      </div>
      <div className="connection-error-image-wrapper">
        <Image
          className="connection-error-image"
          src={ErrorImage}
          alt="Error image and funny meme about a man with sand"
        />
      </div>
    </div>
  );
}

export default ConnectionErrorPanel;
