const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../users.json')
function readUsers() {
  const data = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(data)
}

function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
}
const express = require('express')
const router = express.Router()

// let users = []
// let idCounter = 1

// GET all users (with optional name query)
router.get('/', (req, res) => {
  const users = readUsers()
  const { name } = req.query

  if (name && name.trim() !== "") {
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    )
    return res.json(filtered)
  }

  res.json(users)
})

// GET single user
router.get('/:id', (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  res.json(user)
})

// POST user
router.post('/', (req, res) => {
  const users = readUsers()
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  const newId =
    users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1

  const newUser = {
    id: newId,
    name,
    email
  }

  users.push(newUser)
  writeUsers(users)

  res.status(201).json(newUser)
})

// PUT user
router.put('/:id', (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  const { name, email } = req.body

  if (!name && !email) {
    return res.status(400).json({ error: "Nothing to update" })
  }

  if (name) user.name = name
  if (email) user.email = email

  writeUsers(users)

  res.json(user)
})

// DELETE user
router.delete('/:id', (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)

  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "User not found" })
  }

  const deletedUser = users.splice(index, 1)[0]

  writeUsers(users)

  res.json({ message: "User deleted", user: deletedUser })
})

module.exports = router