const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.token;
//     if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//             if (err) res.status(403).json("Token is not valid!");
//             req.user = user;
//             next();
//         });
//     } else {
//         return res.status(401).json("You are not authenticated!");
//     }
// };

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      console.log("Authorization denied!");
      return res.status(401).json({ message: 'Authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      if (req.user.role !== 'admin') {
        console.log(":Forbidden");
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      console.log("Invalid token!");
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  module.exports = authMiddleware;