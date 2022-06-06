import React, { useState, useEffect } from "react";
import Config from "../../../config/config";

import GameDetailCard from "../../../components/GameDetailCard.js";
import MoreLikeThisPanel from "../../../components/MoreLikeThisPanel.js";

function GameDetailPage(props) {
  // Element Gets
  const getCardRender = () => {
    if (props.game)
      return (
        <React.Fragment>
          <GameDetailCard
            serverAddress={Config.serverAddress}
            game={props.game}
          />
          <MoreLikeThisPanel
            games={props.moreLikeThisGames.similarGames}
            serverAddress={Config.serverAddress}
            mainGame={props.game}
          />
        </React.Fragment>
      );
  };

  // Functions
  return <div className="game-detail-wrapper">{getCardRender()}</div>;
}

export async function getServerSideProps(context) {
  const res_game = await fetch(
    Config.serverAddress + "/gamedetail/" + context.params.id
  );
  const res_morelikethis = await fetch(
    Config.serverAddress + "/gameslike/" + context.params.id + "/8"
  );

  const game = await res_game.json();
  const moreLikeThisGames = await res_morelikethis.json();

  return { props: { game, moreLikeThisGames } };
}

export default GameDetailPage;
