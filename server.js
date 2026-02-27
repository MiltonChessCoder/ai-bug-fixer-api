const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const usersRouter = require('./routes/users')



app.get('/', (req, res) => {
  res.send('Bug fixers are here to help!');
});

app.get('/status', (req, res) => {
  res.json({ status: "ok" });
});

app.use('/users', usersRouter)

app.listen(port, () => console.log(`Server running on port ${port}`));

