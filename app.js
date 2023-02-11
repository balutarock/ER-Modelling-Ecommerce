const express = require("express");
const path = require("path");
const cors = require('cors')

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

app.use(cors());

const dbPath = path.join(__dirname, "Ecommerce.db");
// console.log("Current directory:", __dirname);
// console.log("Current directory:", process.cwd());

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3002, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


app.get("/users/", async (request, response) => {
  const getBooksQuery = `
      SELECT
        *
      FROM
        user`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

app.get("/products/", async (request, response) => {
  const getAllProducts = `
      SELECT
        *
      FROM
      products`;
  const productsArray = await db.all(getAllProducts);
  response.send(JSON.stringify({ "status": 200, "data": productsArray }));
});

app.get("/products/:id", async (request, response) => {
  const { id } = request.params
  const getOneProducts = `
      SELECT
        *
      FROM
      products
      WHERE id=${id}`;
  const productsArray = await db.get(getOneProducts);
  response.send(JSON.stringify({ "status": 200, "data": productsArray }));
});

