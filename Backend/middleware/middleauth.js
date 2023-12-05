const { verify } = require("jsonwebtoken");

const validatetoken = (req, res, next) => {
  const token = req.headers.token;  // Fix here: use req.headers.token instead of req.headers("Token")

  if (!token) {
    console.log("No token found");
    return res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(token, "hellojani");
    console.log("Valid token:", validToken);

    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.json({ error: err.message || "Token verification failed" });
  }
};

module.exports = { validatetoken };
