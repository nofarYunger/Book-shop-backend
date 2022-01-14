const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const http = require("http").createServer(app);

const session = expressSession({
  secret: "coding is amazing",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
// Express App Config
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session);

// app.use() it a middleware that gets 3 parameters(req,res,next)
// call next() if u want to continue to the next middleware
//  u can also send a res , you can use res.send() to send html
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const booksRoutes = require("./api/books/books.routes");
const ordersRoutes = require("./api/orders/orders.routes");
// const {connectSockets} = require('./services/socket.service')

// routes
// const setupAsyncLocalStorage = require("./middlewares/setupAls.middleware");
// app.all("*", setupAsyncLocalStorage);

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/order", ordersRoutes);
// connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3000/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const sequelize = require("./models");
const db = require("./models");

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  const port = process.env.PORT || 3030;

  console.log(`Starting server + sequlize on port ${port}...`);

  http.listen(port, () => {
    logger.info("Server is running on port: " + port);
  });
}

init();
