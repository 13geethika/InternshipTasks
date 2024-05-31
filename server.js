const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const applications = require('./routes/applications'); // Import the applications router

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern-email-request', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/applications', applications); // Use the applications router

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
