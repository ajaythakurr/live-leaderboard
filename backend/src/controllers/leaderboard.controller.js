import {
  increaseScoreService,
  getLeaderboardService,
  getUserRankService,
} from "../services/leaderboard.service.js";

export const increaseScore = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { points } = req.body;

    const result = await increaseScoreService(userId, points);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboardService();

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserRank = async (req, res, next) => {
  try {
    const rank = await getUserRankService(req.user.userId);

    res.status(200).json({
      success: true,
      rank,
    });
  } catch (error) {
    next(error);
  }
};
