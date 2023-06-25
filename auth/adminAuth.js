const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token)
    return res.status(400).json({
      message: "Silahkan login.",
    });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
module.exports = verifyToken;
