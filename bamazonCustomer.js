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

// display items for sale (id, name, & price)
var merchInventory = function() {
	connection.query('SELECT * FROM Products', function (err, res) {
        if (err) throw err;
        console.log('Bamazon Items for Sale:')
		// product display loop
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id, res[i].product_name, res[i].price);
        }
    })
};


