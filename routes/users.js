const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

// GET all users (with optional pagination & filtering)
router.get('/', usersController.getAllUsers)

// GET single user by ID
router.get('/:id', usersController.getUserById)

// POST user
router.post('/', usersController.createUser)

// PUT user
router.put('/:id', usersController.updateUser)

// DELETE user
router.delete('/:id', usersController.deleteUser)

module.exports = router