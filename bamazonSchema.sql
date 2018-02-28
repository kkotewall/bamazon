DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

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
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Garage Floor Mat", "Auto", 65, 330);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tire Pressure Gauge", "Auto", 12, 4000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Floor Mats", "Auto", 55, 780);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Auto Glass Cleaner", "Auto", 15, 650);
