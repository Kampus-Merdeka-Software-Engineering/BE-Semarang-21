const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pengiriman_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Terhubung ke MySQL');
});

module.exports = db;
