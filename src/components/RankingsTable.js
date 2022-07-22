import { useState } from "@hookstate/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDrag, useDrop } from "react-dnd";
import React, { useRef } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { ItemTypes } from "../ItemTypes";
import { getPlayerDetails, PlayerRankings } from "../state/PlayerData";

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(3),
    width: "100%",
  },
}));

function RankingsRow(props) {
  const ref = useRef(null);
  const playerId = props.playerId;
  const playerDetails = getPlayerDetails(playerId);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TableRow,
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      // item index and current ref are the same, do nothing
      if (item.rowIndex === props.rowIndex) {
        return;
      }
      props.changePlayerRank(
        item.rankingsKey,
        item.rowIndex,
        props.rankingsKey,
        props.rowIndex,
        item.playerId
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.TableRow,
      rankingsKey: props.rankingsKey,
      rowIndex: props.rowIndex,
      playerId: playerId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.2 : 1.0;
  drag(drop(ref));

  return (
    <TableRow
      ref={ref}
      style={{ backgroundColor: isOver ? "#6e6e6e" : null, opacity: opacity }}
    >
      <TableCell component="th" scope="row">
        {playerDetails.name}
      </TableCell>
      <TableCell>{playerDetails.position}</TableCell>
      <TableCell>{playerDetails.team}</TableCell>
    </TableRow>
  );
}

function RankingsTable(props) {
  const classes = useStyles();
  const rankingsState = useState(PlayerRankings);

  const rankingsKey = props.rankingsKey;
  const singleRankingsState = rankingsState[rankingsKey];
  console.log(
    "RankingsTable render(). props=",
    props,
    ", state=",
    singleRankingsState.get()
  );

  // the table itself is a drop source, if a row is dropped on the table it is immediately put at the end
  // this function uses 'rankingsKey' variable
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TableRow,
    drop(item, monitor) {
      if (monitor.didDrop()) {
        return;
      }
      if (item.rankingsKey === rankingsKey) {
        // dropping onto own table, do nothing
        return;
      }
      // add playerId to destination rankings and remove from source rankings
      const sourceRankingsState = rankingsState[item.rankingsKey];
      const destRankingsState = rankingsState[rankingsKey];
      sourceRankingsState.set((arr) =>
        arr.slice(0, item.rowIndex).concat(arr.slice(item.rowIndex + 1))
      );
      destRankingsState.merge([item.playerId]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // callback function that is called when a row is dropped onto another row
  let changePlayerRank = (
    srcRankingsKey,
    srcI,
    destRankingsKey,
    destI,
    playerId
  ) => {
    if (srcRankingsKey !== destRankingsKey) {
      console.log(
        "changePlayerRank: ",
        srcRankingsKey,
        srcI,
        destRankingsKey,
        destI,
        playerId
      );
      // If we are moving from one table to another, the dest row is always strictly below the src row
      const sourceRankingsState = rankingsState[srcRankingsKey];
      const destRankingsState = rankingsState[destRankingsKey];
      console.log();
      sourceRankingsState.set((arr) =>
        arr.slice(0, srcI).concat(arr.slice(srcI + 1))
      );
      destRankingsState.set((arr) =>
        arr.slice(0, destI + 1).concat([playerId], arr.slice(destI + 1))
      );
    } else {
      // If we are moving in the same table, we decide fluidly to put the source row above or below the dest row
      if (srcI < destI) {
        // If dragging DOWN the list, place item AFTER current ref
        singleRankingsState.set((arr) =>
          arr
            .slice(0, srcI)
            .concat(
              arr.slice(srcI + 1, destI + 1),
              [playerId],
              arr.slice(destI + 1)
            )
        );
      } else if (srcI > destI) {
        // If dragging UP the list, place item before current ref
        singleRankingsState.set((arr) =>
          arr
            .slice(0, destI)
            .concat([playerId], arr.slice(destI, srcI), arr.slice(srcI + 1))
        );
      }
    }
  };

  let table = singleRankingsState.map((playerId, i) => (
    <RankingsRow
      key={playerId.get()}
      playerId={playerId.get()}
      rankingsKey={rankingsKey}
      rowIndex={i}
      changePlayerRank={changePlayerRank}
    />
  ));
  return (
    <Table
      ref={drop}
      style={{ backgroundColor: isOver ? "#F5F5F5" : null }}
      size="small"
      className={classes.table}
      aria-label="simple table"
    >
      <TableHead>
        <TableRow key={"header_" + rankingsKey}>
          <TableCell>Player</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Team</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{table}</TableBody>
    </Table>
  );
}

export default RankingsTable;
