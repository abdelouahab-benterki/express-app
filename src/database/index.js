const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.DBPASS}@cluster0.xk7dano.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
