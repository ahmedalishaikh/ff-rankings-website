import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
  },
  title: {
    padding: "10px",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Typography variant="h5" align="center" className={classes.title}>
        Fantasy Football Draft Assistant
      </Typography>
    </AppBar>
  );
}

export default Header;
