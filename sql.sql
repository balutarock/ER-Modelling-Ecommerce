PRAGMA foreign_keys=ON;
PRAGMA foreign_keys;

-- .schema

-----------1. User Table ----------------------------------------------

------ Create Table with colums

-- CREATE TABLE user(
--   user_id INTEGER NOT NULL PRIMARY KEY, 
--   full_name VARCHAR(200),
--   mobile_number INTEGER,
--   email VARCHAR(200),
--   password VARCHAR,
--   created_at TEXT,
--   updated_at TEXT,
-- );

------ Create Columns in Table

-- ALTER TABLE
--   user
-- ADD
--   password TEXT;

------ Add Rows in the Table

-- INSERT INTO user(full_name,mobile_number,email,created_at,updated_at,password)
-- VALUES ("Balu Tarock", 9398453013,"balutarock71117@gmail.com","22-12-2022","22-12-2022","password");


-- UPDATE user
-- SET email = "riyaz@gmail.com"
-- WHERE user_id=2;


-- DELETE FROM user
-- WHERE user_id = 4;


------- View the Rows in the Table

-- SELECT * FROM user WHERE email='subbu@gmail.com';

SELECT * FROM user;

--------------2. Address Table -----------------------------------------------------------------

-- CREATE TABLE address(
--   id INTEGER NOT NULL PRIMARY KEY,
--   pin_code INTEGER,
--   city VARCHAR(200),
--   country VARCHAR(200),
--   state VARCHAR(200),
--   door_no VARCHAR(200),
--   user_id INTEGER,
--   FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
-- );


-- ALTER TABLE
--   address
-- ADD
--   updated_date TEXT;


-- INSERT INTO address(pin_code,city,country,state,door_no,user_id)
-- VALUES (521001,"Machilipatnam","India","Andhra Pradesh","15/434",1);

-- SELECT * FROM address;


---------------3. Product Table -----------------------------------------------------------------

-- CREATE TABLE products(
--   id INTEGER NOT NULL PRIMARY KEY,
--   product_name VARCHAR(200),
--   brand VARCHAR(200),
--   category VARCHAR(200),
--   price INTEGER,
--   image_url TEXT,
--   created_at TEXT,
--   updated_at TEXT,
-- );


-- ALTER TABLE
--   products
-- ADD 
--   updated_at TEXT;



-- ALTER TABLE
--   table_name RENAME COLUMN c1 TO c2;


-- ALTER TABLE
--   table_name DROP COLUMN column_name;


-- INSERT INTO products(product_name,brand,category,price,image_url,created_at,updated_at)
-- VALUES ("Fogg 5","fogg","perfume",190,"https://res.cloudinary.com/dxnhvq8pl/image/upload/v1671056496/movie%20app%20mini%20project/image_vrkfsi.png","22-12-2022","22-12-2022");


-- UPDATE products
-- SET image_url = "https://res.cloudinary.com/dxnhvq8pl/image/upload/v1671056496/movie%20app%20mini%20project/image_vrkfsi.png", created_at="22-12-2022",updated_at="22-12-2022"
-- WHERE id=1;


SELECT * FROM products;


-------------------4. Cart Table -------------------------------------------------------------

-- CREATE TABLE cart(
--   id INTEGER NOT NULL PRIMARY KEY,
--   user_id INTEGER NOT NULL UNIQUE,
--   total_price INTEGER,
--   FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
-- );


-- ALTER TABLE
--   cart
-- ADD
--   updated_date TEXT;

-- INSERT INTO cart(user_id,total_price)
-- VALUES (3,1234);

SELECT * FROM cart;


-------------------- 5. cart_product Table ------------------------------

-- CREATE TABLE cart_product(
--   id INTEGER NOT NULL PRIMARY KEY,
--   cart_id INTEGER,
--   product_id INTEGER,
--   quantity INTEGER,
--   FOREIGN KEY(cart_id) REFERENCES cart(id) ON DELETE CASCADE
--   FOREIGN KEY(product_id) REFERENCES cart(id) ON DELETE CASCADE
-- );


ALTER TABLE Ecommerce.cart_product RENAME TO cart_productss;



-- ALTER TABLE
--   cart_product
-- ADD
--   updated_date TEXT;


INSERT INTO cart_product(cart_id,product_id,quantity)
VALUES (1,5,1);

SELECT * FROM cart_product;

SELECT *
FROM ((cart_product
INNER JOIN cart ON cart.id = cart_product.cart_id)
INNER JOIN products ON products.id = cart_product.product_id);
















------------------ Enable foreign_key -------------------------

 -- 0:Disable , 1: Enable

 -- chek enable or not
--  PRAGMA foreign_keys;

-- enable
-- PRAGMA foreign_keys=ON;


-- disable
-- PRAGMA foreign_keys=OFF;