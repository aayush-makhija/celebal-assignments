const express = require('express');
const app = express();
const port = 4000;

// Middleware for parsing URL encoded data for POST request.
app.use(express.urlencoded({ extended: false }));

// First route
app.get('/', (req, res) => {
  res.send('This is the homepage.');
});

// Second route
app.get('/second', (req, res) => {
  res.send('This is the second page.');
});

// Third route: Use with Postman or curl for a post request with url encoded data.
app.post('/submit', (req, res) => {
  const input = req.body.input;
  res.send(`You submitted: ${input}`);
});

// For unlisted or out of bound routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Selecting the port for the express application.
app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
