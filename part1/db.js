const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Conchimbrown123!',
  database: 'DogWalkService',
  multipleStatements: true
});

module.exports = pool;
