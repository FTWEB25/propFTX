const { validateToken } = require("../config/token");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = validateToken(token);
    if (decoded) {
       req.role = decoded.userRole;
       req.userId=decoded.userId
      next();
    } else {
      res.status(201).json({ msg: "Not authorized" });
    }
  } else {
    res.status(201).json({ msg: "Please login first" });
  }
};

module.exports = auth;
