const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemsRoute = require('./routes/items');

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.log('MongoDB connection error: ', err));

app.use('/api/items', itemsRoute);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
