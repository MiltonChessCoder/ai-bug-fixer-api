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

// GET all users with optional pagination & filtering
exports.getAllUsers = (req, res) => {
  const users = readUsers()
  const { name, page = 1, limit = 5 } = req.query

  let filteredUsers = users
  if (name && name.trim() !== "") {
    filteredUsers = users.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  const pageInt = parseInt(page)
  const limitInt = parseInt(limit)
  const startIndex = (pageInt - 1) * limitInt
  const endIndex = startIndex + limitInt

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  res.json({
    page: pageInt,
    limit: limitInt,
    total: filteredUsers.length,
    data: paginatedUsers
  })
}

// GET single user by ID
exports.getUserById = (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) return res.status(404).json({ error: "User not found" })

  res.json(user)
}

// POST user
exports.createUser = (req, res) => {
  const users = readUsers()
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1

  const newUser = { id: newId, name, email }
  users.push(newUser)
  writeUsers(users)

  res.status(201).json(newUser)
}

// PUT user
exports.updateUser = (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) return res.status(404).json({ error: "User not found" })

  const { name, email } = req.body
  if (!name && !email) return res.status(400).json({ error: "Nothing to update" })

  if (name) user.name = name
  if (email) user.email = email

  writeUsers(users)
  res.json(user)
}

// DELETE user
exports.deleteUser = (req, res) => {
  const users = readUsers()
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)

  if (index === -1) return res.status(404).json({ error: "User not found" })

  const deletedUser = users.splice(index, 1)[0]
  writeUsers(users)
  res.json({ message: "User deleted", user: deletedUser })
}