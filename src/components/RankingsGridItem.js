import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState as useHookState } from "@hookstate/core";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import RankingsTable from "./RankingsTable";
import { PlayerRankings } from "../state/PlayerData";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    margin: theme.spacing(1),
  },
}));

function RankingsSingleTier(props) {
  // Create the state before creating the RankingsTable
  const rankingsState = useHookState(PlayerRankings);
  console.log("RankingsSingleTier render(). props=", props);

  let rankingsKey;
  if (props.isUnranked) {
    rankingsKey = "all_unranked";
  } else {
    rankingsKey = props.pos + "_tier_" + props.tier;
  }

  // if the current rank doesn't exist in the state, create it and make it an empty array
  if (!(rankingsKey in rankingsState.get())) {
    rankingsState.merge({ [rankingsKey]: [] });
  }

  const titleText = props.isUnranked ? "Unranked" : "Tier " + props.tier;
  return (
    <div>
      <Typography variant="subtitle1">
        <b>{titleText}</b>
      </Typography>
      <RankingsTable rankingsKey={rankingsKey} />
    </div>
  );
}

function RankingsGridItem(props) {
  const classes = useStyles();
  const [highestTier, setTier] = useState(1);
  const pos = props.title.toLowerCase();

  let rankingsTiers = [];
  let addTierButton = <></>;
  if (!props.isUnranked) {
    for (let i = 1; i <= highestTier; ++i) {
      rankingsTiers.push(
        <RankingsSingleTier tier={i} pos={pos} isUnranked={props.isUnranked} />
      );
    }
    addTierButton = (
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setTier(highestTier + 1)}
        >
          <AddIcon />
          Add Tier
        </Button>
      </Grid>
    );
  } else {
    rankingsTiers.push(<RankingsSingleTier isUnranked={props.isUnranked} />);
  }

  return (
    <Grid item xs>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1} direction="column" alignItems="stretch">
          <Grid item>
            <Typography align="center" color="textPrimary" variant="h5">
              {props.title}
            </Typography>
          </Grid>
          {rankingsTiers.map((tier, i) => (
            <Grid item key={"rankings_grid_item_" + pos + "_" + i}>
              {tier}
            </Grid>
          ))}
          {addTierButton}
        </Grid>
      </Paper>
    </Grid>
  );
}
RankingsGridItem.defaultProps = {
  isUnranked: false,
};

export default RankingsGridItem;
