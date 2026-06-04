import api from "./axios";

export const getLeaderboard = () => api.get("/leaderboard");

export const increaseScore = (points) =>
  api.patch("/leaderboard/increase", { points });

export const getRank = () => api.get("/leaderboard/rank");
