const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bug fixers are here to help!');
});

app.get('/status', (req, res) => {
  res.json({ status: "ok" });
});


app.listen(port, () => console.log(`Server running on port ${port}`));
