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
    console.log('connected as id ' + connection.threadId);
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
        //customOrder();

    })
};


// // prompt: item_id and quantity
// function customOrder() {
//     console.log('\n  ');
//     inquirer.prompt([
//     {
//         name: 'id',
//         type: 'input',
//         message: 'Provide an item id to start your purchase!',

//     }, {
//         name: 'quantity',
//         type: 'input',
//         message: 'How many units would you like to buy?',

//     }
//     // query DB to confirm quantity for order
//     ]).then(function (answer) {
//         connection.query('SELECT * FROM products WHERE ?', 
//         	{
//         		item_id: answer.id 
//         	},
//         	function (err, res) {
//             if (err) throw err;
//             },

// 			// generate bill of sale & update DB inventory
//             if (res[0].stock_quantity >= answer.quantity) {
//                 var stockDecrement = res[0].stock_quantity - answer.quantity;
//                 connection.query('UPDATE products SET ? WHERE ?', [{
//                     stock_quantity: stockDecrement
//                 },
//                 {
//                 	item_id: answer.id
//                 }], 
//                 function(err, res){
//                 	var cost = res[0].price * answer.quantity
// 	                console.log('Thank you for choosing Bamazon!\n' + 'You ordered: ' + (answer.quantity) + 'of' + (res[0].product_name));
// 	                console.log('Your total is: $' + cost);
//                 }
//                 ) //close update stock query
//             } else {
//                 //insufficient stock alert
//                 console.log('We are unable to fill your order at this time. Please consult our current inventory to complete your order.');
//                 customOrder();
//             }
//         }) //close connection.query
//     }); //close answer function
// } //close customOrder

merchInventory();
// customOrder();

// ================================================================
// var quantity = answer.quantity;
//         // var newQuantity = answer[0].stock_quantity - quantity
//         var id = answer.id;
//         if (id >= 10)   {
//             console.log("You have chosen a product that we do not carry. Please enter an Item ID from the above table.");
//             productPrompt();
//         } else  {
//             connection.query("SELECT * FROM products WHERE?", {item_id: id}, function(err, res) {
//                 if (err) throw err;
//                 if (res[0].stock_quantity - quantity >= 0)  {
//                     console.log("You have selected " + quantity + " units of the " + res[0].product_name + ".");
//                     console.log("\nYour total cost today is: $" + (quantity * res[0].price) + "." + "\nThanks for supporting Kimmy's Bamazon!");
//                     // updateInventory(newQuantity, id);
    
//                 } else if (res[0].stock_quantity - quantity <= 0) {
//                     console.log("I'm sorry. We currently do not have enough stock to fulfill that order.");
//                     productPrompt();