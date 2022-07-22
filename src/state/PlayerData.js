import { createState } from "@hookstate/core";

const PlayerData = {
  1: {
    id: 1,
    name: "Cam Newton",
    position: "QB",
    team: "NE",
  },
  2: {
    id: 2,
    name: "Tom Brady",
    position: "QB",
    team: "TB",
  },
  3: {
    id: 3,
    name: "Christian McCaffrey",
    position: "RB",
    team: "CAR",
  },
  4: {
    id: 4,
    name: "Saquon Barkley",
    position: "RB",
    team: "NYG",
  },
  5: {
    id: 5,
    name: "Davante Adams",
    position: "WR",
    team: "GB",
  },
  6: {
    id: 6,
    name: "Tyreek Hill",
    position: "WR",
    team: "KC",
  },
  7: {
    id: 7,
    name: "Travis Kelce",
    position: "TE",
    team: "KC",
  },
  8: {
    id: 8,
    name: "George Kittle",
    position: "TE",
    team: "KC",
  },
  9: {
    id: 9,
    name: "AJ Green",
    position: "WR",
    team: "CIN",
  },
};

export const PlayerRankings = createState({
  all_unranked: Object.keys(PlayerData),
});

// UTILITY FUNCTIONS
export function getPlayerDetails(playerId) {
  if (playerId in PlayerData) {
    return PlayerData[playerId];
  }
  return undefined;
}
