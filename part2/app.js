const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const app = express();
const db = require('./models/db');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'Conchimbrown123!', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

//gettingn all the dogs to display: 
app.get('/api/dogs', async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT Dogs.dog_id, Dogs.name, Dogs.size, Dogs.owner_id FROM Dogs;`
    );
    res.json(result);
  } catch {
    res.status(500).json({ error:'dog data error' });
  }
});



// Export the app instead of listening here
module.exports = app;