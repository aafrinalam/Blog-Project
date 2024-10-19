const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];
    if (!token) return res.status(404).send({ status: false, message: "Token must be present" });

    let decodedtoken = jwt.verify(token, "Secret-key");
    if (!decodedtoken) return res.status(400).send({ status: false, message: "Invalid token" })
    next()
  }
  catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}


module.exports.authentication = authentication;

