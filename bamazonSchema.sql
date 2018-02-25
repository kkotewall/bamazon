DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;


USE bamazon_db;

CREATE TABLE products (
  -- unique id for each product --
  tem_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- nName of product --
  product_name VARCHAR(30) NOT NULL,
  -- department name --  
  department_name VARCHAR(30),
  -- cost to customer --
  price INTEGER(10),
  -- how much of the product is available in stores --
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Camping", 100, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canteen", "Camping", 20, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Insect Repellent", "Camping", 15, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rawhide", "Pets", 8, 3200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Furminator", "Pets", 45, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Tree", "Pets", 100, 170);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dry Kibble", "Pets", 35, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catnip Dispenser", "Pets", 30, 400);
