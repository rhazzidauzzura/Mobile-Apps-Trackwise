if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routers = require("./routers");
const errMsg = require("./middleware/errHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Live",
    status: "OK",
  });
});
app.use(routers);
app.use(errMsg);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
