module.exports = app => {
  const userProfile = require("../controllers/userProfile.js");

  app.post("/userProfile", userProfile.create);
  app.get("/userProfile/:userID", userProfile.getOne);
  app.put("/userProfile/:id", userProfile.update);
  app.delete("/userProfile/:id", userProfile.delete);
};

