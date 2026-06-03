import User from "../models/user.js";
import redis from "../config/redis.js";

export const increaseScoreService = async (userId, points) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        score: points,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new Error("User not found");
  }

  await redis.zincrby("leaderboard", points, userId);

  return {
    username: user.username,
    score: user.score,
  };
};

export const getLeaderboardService = async () => {
  const leaderboard = await redis.zrevrange("leaderboard", 0, 9, "WITHSCORES");

  const result = [];

  for (let i = 0; i < leaderboard.length; i += 2) {
    const userId = leaderboard[i];

    const score = Number(leaderboard[i + 1]);

    const user = await User.findById(userId).select("username");

    if (user) {
      result.push({
        rank: result.length + 1,
        username: user.username,
        score,
      });
    }
  }

  return result;
};

export const getUserRankService = async (userId) => {
  const rank = await redis.zrevrank("leaderboard", userId);

  if (rank === null) {
    return null;
  }

  return rank + 1;
};
