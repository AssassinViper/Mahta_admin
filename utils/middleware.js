const jwt = require('jsonwebtoken');
const secret = 'mysecretboozboozak';

const withAuth = function(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    console.log("no token");
    
    res.status(401).send('Unauthorized: No token provided');

  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {

        console.log("invalid token");
        
        res.status(401).send('Unauthorized: Invalid token');

      } else {
        console.log("valid token");
        
        req.username = decoded.username;
        next();

      }
    });
  }
};

module.exports = withAuth;