const jwt = require('jsonwebtoken');
const sql = require("./db.js");
exports.authenticate =  function(req, res, next) {
  if (req.cookies) {
    //get the jwt out of the cookie
    access = req.cookies.jwt;
    if (!access) {
      return res.sendStatus(401);
    }
    let payload;
    try {
      payload = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET);
      refreshSession(req, res, next);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return res.sendStatus(403);
      }
      console.log(e);
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
}

function refreshSession(req, res, next) {
  const oldToken = req.cookies.jwt;
  if (!oldToken) {
    return res.status(401).end();
  }
  var payload;
  try {
    payload = jwt.verify(oldToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (e) {
    console.log(e);
    return res.sendStatus(403);
  }
  let data = sql.executeQuery(`SELECT email, token FROM userProfile WHERE id = ${req.params.id};`,
    (e, r) => {
      if (e) {
        console.log(e);
        return res.sendStatus(401);
      }
      if (r['rows'].length !== 1) {
        return res.sendStatus(401);
      }
      try {
        jwt.verify(r['rows'][0].token, process.env.REFRESH_TOKEN_SECRET);
      } catch (e) {
        console.log(e);
        return res.sendStatus(401);
      }
      let newToken = jwt.sign({email: r['rows'][0].email}, process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
      return next();
    });
}

