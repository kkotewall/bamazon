// require packages
var inquirer = require ("inquirer");
var mysql = require ("mysql");


// local host, no password
var connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  port: 3306,
  password : "",
  database : "bamazon_db"
});

// connect to server & db
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// display items for sale (ids, names, & prices)


