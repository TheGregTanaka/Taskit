const express = require("express");
const parse = require("body-parser");

const app = express();

//parse requests of content-type: application/json
app.use(parse.json());
app.use(parse.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.json({message: "Welcome"});
});

require("./app/routes/userProfile.js")(app);
app.listen(3200, () => {
  console.log("Server running on port 3200.");
});
