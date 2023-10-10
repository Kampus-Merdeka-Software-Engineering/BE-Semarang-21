const mysql = require('mysql2');
const url = require('url');
const databaseUrl = new URL('mysql://root:yF7JdTWzEWBTfsevgCf1@containers-us-west-200.railway.app:6022/railway');

const db = mysql.createConnection({
  host: databaseUrl.hostname,
  port: databaseUrl.port,
  user: databaseUrl.username,
  password: databaseUrl.password,
  database: databaseUrl.pathname.substr(1), 
});

db.connect((err) => {
  if (err) {
    console.error('Server tidak berhasil terkoneksi ke database MySQL Railway:', err);
    return;
  }
  console.log('Server berhasil terkoneksi ke database MySQL Railway');
});

module.exports = db;