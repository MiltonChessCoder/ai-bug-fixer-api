const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let users = []
let idCounter = 1

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON" })
  }
  next()
})
app.get('/', (req, res) => {
  res.send('Bug fixers are here to help!');
});

app.get('/status', (req, res) => {
  res.json({ status: "ok" });
});

// let users = [
//   { id: 1, name: "Milton" },
//   { id: 2, name: "Alex" }
// ];

app.get('/users', (req, res) => {
  const { name } = req.query

  if (name && name.trim() !== "") {
    // Partial, case-insensitive match
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    )
    return res.json(filtered)
  }

  // No query or empty → return all users
  res.json(users)
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" })
  }

  const newUser = {
    id: idCounter++,
    name,
    email
  }

  users.push(newUser)

  res.status(201).json(newUser)
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) return res.status(404).json({ error: "User not found" })

  const { name, email } = req.body
  if (!name && !email) return res.status(400).json({ error: "Nothing to update" })

  if (name) user.name = name
  if (email) user.email = email

  res.json(user)
})


app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "User not found" })
  }

  const deletedUser = users.splice(index, 1)[0] // remove from array

  res.json({ message: "User deleted", user: deletedUser })
})






app.use((err, req, res, next) => {
  console.error(err.stack) // logs error in console
  res.status(500).json({ error: "Something went wrong!" })
})
app.listen(port, () => console.log(`Server running on port ${port}`));


