const express = require('express')
const router = express.Router()
const checkAuth = require('../midleware/check-auth');
const commentController = require('../controllers/comment')
//swagger documentation

router.post('/:id', checkAuth, commentController.addComment )
router.get('/:id', checkAuth, commentController.getComments)

module.exports = router