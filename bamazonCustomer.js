// require packages
var inquirer = require ('inquirer');
var mysql = require ('mysql');


// local host, no password
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password : '',
  database : 'bamazon_db'
});

// connect to server & db
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
});

// display items for sale (id, name, & price)
var merchInventory = function() {
	connection.query('SELECT * FROM Products', 
		function (err, result) {
        if (err) throw err;
        console.log('Bamazon Items for Sale:')
		// product display loop
        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id, result[i].product_name, result[i].price);
        }
    })
};


// prompt: item_id and quantity
var customOrder = function () {
    console.log('\n  ');
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
    ]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE ?', 
        	{
        		item_id: answer.id 
        	},
        	function (err, result) {
            if (err) throw err;
			
			// missing query parameter
            if (result.length === 0) {
                console.log('Unable to process order without quantity.');
                customOrder();
            }

			// generate bill of sale & update DB inventory
            if (result[0].stock_quantity >= answer.quantity) {
                var stockDecrement = result[0].stock_quantity - answer.quantity;
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: stockDecrement
                },
                {
                	item_id: answer.id
                }], 
                function(err, result){
                	var cost = result[0].price * answer.quantity
	                console.log('Thank you for choosing Bamazon!\n' + 'You ordered: ' + (answer.quantity) + 'of' + (result[0].product_name));
	                console.log('Your total is: $' + cost);
                }
                ) //close update stock query
            } else {
                //insufficient stock alert
                console.log('We are unable to fill your order at this time. Please consult our current inventory to complete your order.');
                customOrder();
            }
        }) //close connection.query
    }); //close answer function
} //close customOrder

merchInventory();
customOrder();