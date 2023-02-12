const express = require("express");
const path = require("path");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

app.use(express.json());

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
      console.log("Server Running at http://localhost:3002/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/signup/", async (request, response) => {
  const todayDateTime = new Date().toUTCString();
  console.log(todayDateTime);
  const { name, email, password, mobile } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const getUserQuery = `
      SELECT
        *
      FROM
        user
      WHERE email='${email}'`;
  const usersArray = await db.get(getUserQuery);
  console.log("userArray > ", usersArray);
  // const dbUser = await User.findOne({ name: name });
  if (usersArray !== undefined) {
    response.status(400);
    response.send({ status: 400, error: "User Already exist with Email ID" });
  } else {
    const createUserQuery = `
    INSERT INTO user(full_name,mobile_number,email,created_at,updated_at,password)
    VALUES ('${name}', '${mobile}','${email}','${todayDateTime}','${todayDateTime}','${hashedPassword}');`;
    const usersArray = await db.run(createUserQuery);
    response.send({ status: 200, msg: "Registraction success" });
  }
});

app.post("/login/", async (request, response) => {
  console.log("body > ", request.body);
  const { email, password } = request.body;
  console.log("email pass ", email, password);
  const getUserQuery = `
      SELECT
        *
      FROM
        user
      WHERE email='${email}'`;
  const usersArray = await db.get(getUserQuery);
  console.log("user> ", usersArray);
  // console.log("dbuser >> ",dbUser)
  // console.log("ispa >> ",isPasswordMatched)
  if (usersArray === undefined) {
    response.status(400);
    response.send({ status: 400, errror: "Email ID is not Valid" });
  } else {
    const isPasswordMatched = await bcrypt.compare(
      password,
      usersArray.password
    );
    if (isPasswordMatched) {
      const payload = { username: usersArray.full_name };
      const jwtToken = jwt.sign(payload, "MY_SECREAT_TOKEN");
      response.status(200);
      response.send({ status: 200, msg: "Login success", jwtToken: jwtToken });
    } else {
      response.status(401);
      response.send({ status: 200, msg: "Invalid Password" });
    }
  }
});

const authonticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send({ status: 401, msg: "Unauthorized, Empty accesstoken" });
  } else {
    jwt.verify(jwtToken, "MY_SECREAT_TOKEN", async (err, payload) => {
      if (err) {
        response.status(401);
        response.send({ status: 401, msg: "Invalid Access Token" });
      } else {
        // console.log("user>> ",payload)
        request.username = payload.username;
        next();
      }
    });
  }
};

app.get("/users/", async (request, response) => {
  const getBooksQuery = `
      SELECT
        *
      FROM
        user`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

app.get("/products/", authonticateToken, async (request, response) => {
  const getAllProducts = `
      SELECT
        *
      FROM
      products`;
  const productsArray = await db.all(getAllProducts);
  response.send(JSON.stringify({ status: 200, data: productsArray }));
});

app.get("/products/:id", authonticateToken, async (request, response) => {
  const { id } = request.params;
  const getOneProducts = `
      SELECT
        *
      FROM
      products
      WHERE id=${id}`;
  const productArray = await db.get(getOneProducts);
  response.send(JSON.stringify({ status: 200, data: productArray }));
});

app.get("/cart/:id", authonticateToken, async (request, response) => {
  const { id } = request.params;
  const getCartProducts = `
      SELECT *
      FROM ((cart_product
      INNER JOIN cart ON cart.id = cart_product.cart_id)
      INNER JOIN products ON products.id = cart_product.product_id)
      WHERE user_id=${id};`;
  const CartProducts = await db.all(getCartProducts);
  response.send(JSON.stringify({ status: 200, data: CartProducts }));
});
