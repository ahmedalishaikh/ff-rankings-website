import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";

import RankingsGridItem from "./RankingsGridItem.js";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
}));

function MainContent() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Toolbar />
      <Grid container spacing={3}>
        <RankingsGridItem title="Unranked" isUnranked={true} />
        <RankingsGridItem title="QB" />
        <RankingsGridItem title="RB" />
        {/* <RankingsGridItem title="WR" /> */}
        {/* <RankingsGridItem title="TE" /> */}
      </Grid>
    </Container>
  );
}

export default MainContent;
