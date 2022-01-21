const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const checkAuth = require('../midleware/check-auth');
const userController = require('../controllers/user');
//swagger documentation


/**
* @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: user's names
 *         email:
 *           type: string
 *           description: user's email
 *         password:
 *           type: string
 *           description: user's password
 *       example:
 *         fullname: jean damas
 *         email: jean@gmail.com
 *         password: test123
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/signup", userController.createUser);

router.post("/login", userController.userLogin);


 /**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/all', userController.getUsers);

router.delete("/:userId", checkAuth, userController.deleteUser);

module.exports = router;