const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Bug fixers are here to help!');
});

app.get('/status', (req, res) => {
  res.json({ status: "ok" });
});

let users = [
  { id: 1, name: "Milton" },
  { id: 2, name: "Alex" }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});



app.listen(port, () => console.log(`Server running on port ${port}`));
