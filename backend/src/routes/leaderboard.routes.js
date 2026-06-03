import express from "express";

import {
  increaseScore,
  getLeaderboard,
  getCurrentUserRank,
} from "../controllers/leaderboard.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Redis Live Leaderboard APIs
 */

/**
 * @swagger
 * /api/leaderboard/increase:
 *   patch:
 *     summary: Increase current user's score
 *     tags: [Leaderboard]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - points
 *             properties:
 *               points:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Score updated successfully
 */
router.patch("/increase", verifyJWT, increaseScore);

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get Top 10 Players
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Leaderboard fetched successfully
 */
router.get("/", getLeaderboard);

/**
 * @swagger
 * /api/leaderboard/rank:
 *   get:
 *     summary: Get current user's rank
 *     tags: [Leaderboard]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Rank fetched successfully
 */
router.get("/rank", verifyJWT, getCurrentUserRank);

export default router;
