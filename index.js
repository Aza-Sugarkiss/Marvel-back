require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(formidable());
app.use(cors());

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);
const comicsRoute = require("./routes/comics");
app.use(comicsRoute);
const userRoute = require("./user");
app.use(userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Marvel API !" });
});

app.all("*", (req, res) => {
  res.status({ message: "Page not found. " });
});

app.listen(process.env.PORT, () =>
  console.log("Server has started ! :male_superhero:")
);
