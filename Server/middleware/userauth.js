const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ error: "Internal server error while verifying your token!" });
  }
};

module.exports = fetchuser;
