// require packages
var inquirer = require ('inquirer');
var mysql = require ('mysql');
require("dotenv").config();
var Table = require('cli-table');


// local host, no password
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.MYSQL_PASSWORD,
  database : 'bamazon_db'
});

// connect to server & db
connection.connect(function (err) {
    if (err) throw err;
    //console.log('connected as id ' + connection.threadId);
});

// display items for sale (id, name, & price)
function merchInventory() {
    console.log('Bamazon Items for Sale:')
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        //console.log(res);
        var table = new Table({ 
            head: ["Item ID", "Product", "Price"],
            colWidths: [10, 30, 10]
        });

        for (var i = 0; i < res.length; i++)    {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price]  
            );
        }
        console.log(table.toString());
        customOrder();

    })
};

// prompt: item_id and quantity
function customOrder() {
    inquirer.prompt([
    {
        name: 'id',
        type: 'input',
        message: 'Provide an item id to start your purchase!',

    }, {
        name: 'quantity',
        type: 'input',
        message: 'How many units would you like to buy?',

    }
    // query DB to confirm quantity for order
    ]).then(function(answer) {
        if (res[0].stock_quantity >= answer.quantity) {
            var stockUpdate = res[0].stock_quantity - answer.quantity;
            connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: itemQuantity
                    }, 
                    {
                        item_id: answer.id
                    }
                ], 
                function (err, res) { 
                    console.log(res.affectedRows + " products updated!\n");
                }
            );
        console.log(query.sql);
        //console.log("You have ordered " + quantity + " units of the " + res[0].product_name + ".");
        // console.log("\nYour total is: $" + (quantity * res[0].price) + "." + "\nThank you for shopping Bamazon!");
        }

        else if (res[0].stock_quantity - quantity < 0) {
                    console.log("We cannot currently fill this order.");
                    customOrder();
                }
    });
}

merchInventory();

