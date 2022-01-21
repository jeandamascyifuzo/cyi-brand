const express = require('express')
const router = express.Router()
const checkAuth = require('../midleware/check-auth');
const contactController = require('../controllers/contact')
//swagger documentation

/**
* @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: user's names
 *         email:
 *           type: string
 *           description: user's email
 *         subject:
 *           type: string
 *           description: write subject
 *         message:
 *           type: string
 *           description: write subject
 *       example:
 *         name: cyifuzo
 *         email: jean@gmail.com
 *         subject: change the following
 *         message: placeholder text commonly used to demonstrate the visual form of a document or a typeface w
 * 
 */

/**
 * @swagger
 * /send:
 *   post:
 *     summary: write your message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The message was send successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Some server error
 */

router.post('/send',contactController.sendMessage)

 /**
 * @swagger
 * /read:
 *   get:
 *     summary: find all message
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of the messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/read',contactController.getMessages)

module.exports = router