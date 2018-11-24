var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "polling",
  database: "polling"
});

con.connect(function(err) {
  if (err) throw err;
  alert("YEET");
  console.log("Connected!");
});