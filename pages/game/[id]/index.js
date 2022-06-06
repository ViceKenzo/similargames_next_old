import React, { useState, useEffect } from "react";
import Config from "../../../config/config";

import GameDetailCard from "../../../components/GameDetailCard.js";
import MoreLikeThisPanel from "../../../components/MoreLikeThisPanel.js";

function GameDetailPage(props) {
  // Variables
  const [game, setGame] = useState(null);
  const [moreLikeThisGames, setMoreLikeThisGames] = useState(null);
  const location = { pathname: "bleep bloop", search: "blaap" };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

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
  const requestAndSetGameDetail = (gameId) => {
    setMoreLikeThisGames([]);

    const xhttp = new XMLHttpRequest();
    let requestUrl = Config.serverAddress + "/gamedetail/" + gameId;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGame = JSON.parse(xhttp.response);
      setGame(requestedGame);

      requestMoreLikeThisGames(gameId);
    };
  };

  const requestMoreLikeThisGames = (gameId) => {
    let amountRequested = 8;

    const xhttp = new XMLHttpRequest();
    let requestUrl =
      Config.serverAddress + "/gameslike/" + gameId + "/" + amountRequested;

    xhttp.open("get", requestUrl, true);

    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.statusText.toLowerCase() != "ok") {
        window.location.href = "/Error";
        return;
      }

      let requestedGames = JSON.parse(xhttp.response);

      setMoreLikeThisGames(requestedGames.similarGames);
    };
  };

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
