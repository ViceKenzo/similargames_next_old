import React, { useState, useEffect } from "react";
import Head from "next/head";
import Config from "../../../config/config";

import GameDetailCard from "../../../components/GameDetailCard.js";
import MoreLikeThisPanel from "../../../components/MoreLikeThisPanel.js";

function GameDetailPage(props) {
  // Element Gets
  const getCardRender = () => {
    if (props.game)
      return (
        <React.Fragment>
          {console.log(props)}

          <Head>
            <title>SimilarGames - {props.game.title}</title>
            <meta
              name="description"
              content={
                props.game.title +
                " can be found on " +
                getSourcesMetaDesc() +
                ". " +
                getMoreGamesLikeMetaDesc()
              }
            />
            <meta
              name="keywords"
              content={props.game.title + ", " + Config.metaTags}
            />
          </Head>
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
  const getSourcesMetaDesc = () => {
    if (props.game.sources.length == 1) return props.game.sources[0].name;
    if (props.game.sources.length == 2)
      return (
        "" + props.game.sources[0].name + " and " + props.game.sources[1].name
      );

    let output = "" + props.game.sources[0].name;
    for (let i = 1; i < props.game.sources.length - 1; ++i) {
      output += ", " + props.game.sources[i].name;
    }
    output += " and " + props.game.sources[props.game.sources.length - 1].name;

    return output;
  };

  const getMoreGamesLikeMetaDesc = () => {
    if (props.moreLikeThisGames.similarGames.length == 0) return "";

    let output =
      "Some other games are similar to " +
      props.game.title +
      " are: " +
      props.moreLikeThisGames.similarGames[0].title;

    if (props.moreLikeThisGames.length == 2)
      output += " and " + props.moreLikeThisGames.similarGames[1].title;
    else {
      output +=
        ", " +
        props.moreLikeThisGames.similarGames[1].title +
        " and " +
        props.moreLikeThisGames.similarGames[2].title;
    }

    output += ".";

    return output;
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
