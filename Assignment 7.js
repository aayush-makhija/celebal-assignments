const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || LtmyUQiOy2;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let users = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    password: bcrypt.hashSync('alice123', 10),
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    password: bcrypt.hashSync('bob123', 10),
  },
];

// middleware to veify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// Login route to generate JWT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const payload = { id: user.id, name: user.name, email: user.email };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Get all users (protected)
app.get('/api/users', authenticateToken, (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

// Get user by ID (protected)
app.get('/api/users/:id', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password, ...userData } = user;
  res.json(userData);
});

// CREATE a new user (protected)
app.post('/api/users', authenticateToken, (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  };
  users.push(newUser);
  const { password: pw, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// UPDATE a user(protected)
app.put('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email, password } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) user.password = bcrypt.hashSync(password, 10);

  const { password: pw, ...updatedUser } = user;
  res.json(updatedUser);
});

// DELETE a user (protected)
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: 'User not found' });
  const deletedUser = users.splice(userIndex, 1);
  const { password: pw, ...userData } = deletedUser[0];
  res.json(userData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}`);
});
