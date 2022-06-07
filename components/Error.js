import React from "react";
import Image from "next/dist/client/image";

import ErrorImage from "../public/images/page_not_found.jpg";

function Error() {
  // Functions
  return (
    <div className="error-wrapper">
      <div className="error-text-wrapper">
        <div className="error-header">Page not found!</div>
        <div className="error-report">
          (If you&apos;ve found a bug, please report it at our contact email.)
        </div>
      </div>
      <div className="error-image-wrapper">
        <Image
          className="error-image"
          src={ErrorImage}
          alt="Error image and funny meme about a man with sand"
        />
      </div>
    </div>
  );
}

export default Error;
