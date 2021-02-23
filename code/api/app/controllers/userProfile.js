const UserProfile = require("../models/userProfile.js");

exports.create = (r, response) => {
  if (!r.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var u = new UserProfile({
    email: r.body.email,
    name: r.body.name,
    profilePicture: r.body.profilePicture,
    phone: r.body.phone,
    bio: r.body.bio,
  });
  UserProfile.create(u, (err, data) => {
    if (err)
      result.status(500).send({
        message:
        err.message || "Error while creating user profile"
      });
        else result.send(data);
  });
};

exports.getOne = (r, result) => {
  UserProfile.getOne(r.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        result.status(404).send({
          message: `Cannot find user profile with id ${ r.params.id }`
        });
      } else {
        result.status(500).send({
          message: "Error retrieving profile"
        });
      }
    } else 
      result.send(data);
  });
};

exports.update = (r, result) => {
  if (!r.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UserProfile.update(
    r.params.id,
    new UserProfile(r.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          result.status(404).send({
            message: `Cannot find user profile with id ${ r.params.id }`
          });
        } else {
          result.status(500).send({
            message: "Error retrieving profile"
          });
        }
      } else 
        result.send(data);
    });
};

exports.delete = (r, result) => {
  UserProfile.delete(r.params.id, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
          result.status(404).send({
            message: `Cannot find user profile with id ${ r.params.id }`
          });
        } else {
          result.status(500).send({
            message: "Error retrieving profile"
          });
        }
      } else 
        require("./app/routes/userProfile.js")(app);
        result.send({ message: "Deleted successfully" });
    });
};

