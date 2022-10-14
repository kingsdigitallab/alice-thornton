const express = require("express");
const app = express();

const routes = require("./api_routes/routes");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

routes(app);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
