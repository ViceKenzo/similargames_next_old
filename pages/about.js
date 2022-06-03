import React, { useEffect } from "react";

import AboutPanel from "../components/AboutPanel.js";

function AboutPage() {
  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Functions
  return (
    <div className="about-wrapper">
      <AboutPanel />
    </div>
  );
}

export default AboutPage;
