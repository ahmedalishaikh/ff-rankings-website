import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import MainContent from "../components/MainContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: "100vh",
    width: "100%",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <MainContent />
    </div>
  );
}

export default Home;
