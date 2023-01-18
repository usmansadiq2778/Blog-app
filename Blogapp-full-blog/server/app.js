
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./server/routes");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json());
app.use("/", routes);
app.use(express.static('./images'));

const server = app.listen(8000, "localhost", function () {
  console.log(`Blog App listening at http://localhost:${8000}`);
  
});
