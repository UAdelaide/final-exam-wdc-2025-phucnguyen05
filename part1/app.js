const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.get('/api/dogs', async (req, res) => {
  try {
    [result] = await db.query(
    `SELECT Dogs.name, Dogs.size, Users.username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id;`);
    res.json(result);
  } catch {
    res.status(500).json({ error:'dog data error' });
  }
});

app.get('/api/walkrequests/open', async (req, res) => {
  try {
    [result] = await db.query(`
      SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username FROM WalkRequests
      JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
      JOIN Users ON Dogs.owner_id = Users.user_id
      WHERE WalkRequests.status = 'open';`);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'walk requests error' });
  }
});

app.get('/api/walkers/summary', async (req, res) => {
  try {
    [result] = await db.query(
    `SELECT Users.username, COUNT(WalkRatings.rating) total_ratings, AVG(WalkRatings.rating) average_rating,
    (SELECT COUNT(*) FROM WalkRequests JOIN WalkApplications ON WalkRequests.request_id = WalkApplications.request_id WHERE WalkApplications.walker_id = Users.user_id AND WalkRequests.status = 'completed') completed_walks
    FROM Users LEFT JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id WHERE Users.role = 'walker' GROUP BY Users.user_id, Users.username;`);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'walker summary error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
