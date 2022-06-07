import React from "react";

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
        <img
          className="error-image"
          src={"/images/page_not_found.jpg"}
          alt="Error image and funny meme about a man with sand"
        />
      </div>
    </div>
  );
}

export default Error;
