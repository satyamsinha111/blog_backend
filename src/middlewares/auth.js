const jwt = require("jsonwebtoken");
exports.is_authenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        error: "Authorisation headers not found",
      });
    }
    const token = req.headers.authorization.split(",")[0].split(" ")[1];
    jwt.verify(token, "shhh", (error, decoded) => {
      if (error) {
        return res.status(403).json({
          error: "User is not authenticated",
        });
      }
      console.log(decoded);
      req.user = decoded;
      return next();
    });
  } catch (error) {
    console.log("Error occured", error);
    return res.status(500).json({
      error: "Internal server error occured",
    });
  }
};
