require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const firebase = require("firebase");
const cors = require("cors");
const { errors } = require("celebrate");
const port = process.env.PORT || 6969;

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(port, () => {
  console.log("🔥 Listening on port: " + port);
});
