const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const checkSign = (req, res, next) => {
  const auth = req.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = auth.slice(7);
  try {
    const verify = jwt.verify(token, TOKEN_KEY);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = { checkSign };
