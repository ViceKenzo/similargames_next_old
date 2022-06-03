import React, { useState } from "react";
import Link from "next/dist/client/link";

function Footer() {
  // Variables
  const [menuItems] = useState([
    {
      title: "Browse",
      href: "/find-games-like",
    },
    {
      title: "About",
      href: "/about",
    },
  ]);

  // Functions
  return (
    <div className="footer">
      <div className="footer-contact">
        <div>Contact & Feedback</div>
        <div>contact@similargames.io</div>
      </div>
      <div className="footer-title">
        <Link href="/">
          <a>SimilarGames</a>
        </Link>
      </div>
      <div className="footer-nav">
        {menuItems.map((item, index) => {
          return (
            <Link key={index * 3} href={item.href}>
              <a>{item.title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
