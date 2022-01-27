const express = require('express');
const router = express.Router();
// const multer = require('multer');
const checkAuth = require('../midleware/check-auth');
const BlogsController = require('../controllers/blogs');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) =>{
//   if(file.minetype === 'image/JPG' || 'image/jpeg' || 'image/png'){
//     cb(null, true);
//   }else{
//     cb(null, false);
//   }
// } 
// const upload = multer({storage: storage, fileFilter: fileFilter});


/**
* @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - blogImage
 *       parameter:
 *         name: auth-token
 *         in: header
 *         description: Authorization reqiured
 *         required: true
 *         schema:
 *         type: string
 *       properties:
 *         id:
 *           type: string
 *           description: blog Id
 *         title:
 *           type: string
 *           description: The blog title
 *         content:
 *           type: string
 *           description: The content of blog
 *         blogImage:
 *           type: string
 *           description: The blog Image
 *       example:
 *         id: d5fE_aszhjgggggbjasgj989870
 *         title: software development
 *         content: Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without
 *         blogImage: png87uyjbggnghncx778nugngxm 
 */

 /**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */

router.get('/', BlogsController.getBlogs);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new Blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The Blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */


router.post('/', BlogsController.createBloges);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get the Blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The Blog obtained by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The Blog was not found
 */

router.get('/:blogId', BlogsController.getBlog);

/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    summary: Update the Blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The Blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: The Blog was not found
 *      500:
 *        description: Some error happened
 */

router.patch('/:blogId', checkAuth, BlogsController.updateBlog);


/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete the Blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Blog id
 * 
 *     responses:
 *       200:
 *         description: The Blog was deleted
 *       404:
 *         description: The Blog was not found
 */
router.delete('/:blogId', checkAuth, BlogsController.deleteBlog);
module.exports = router;