const express = require("express");
const passport = require("passport");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  validateToken
} = require("../controllers/authController");
const middlewares = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/logout", middlewares.optionalAuthMiddleware, logout);

/**
 * @swagger
 * /api/auth/validate-token:
 *   get:
 *     summary: Validate user token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/validate-token", middlewares.authMiddleware, validateToken);



module.exports = router;
