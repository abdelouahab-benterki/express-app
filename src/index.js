// Dependencies
const express = require("express");
const process = require("process");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Routes
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const { authRouter, authMiddleware } = require("./routes/auth");

// Starting our Database
require("./database");

// Passport strategy
require("./strategies/local");

const app = express();
const PORT = process.env.PORT || 3000;

// General Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "APOEFJOSDNFJDSNFINEJFSDKF?DSK?F",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://admin:${process.env.DBPASS}@cluster0.xk7dano.mongodb.net/?retryWrites=true&w=majority`,
    }),
  })
);

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// App Middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/groceries", authMiddleware, groceriesRoute);
app.use("/api/v1/markets", authMiddleware, marketsRoute);

app.listen(PORT, () => console.log(`Running express server on port ${PORT}`));
