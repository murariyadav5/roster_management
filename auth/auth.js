const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  console.log("create token",user);
  const payload = {
    userId: user._id,
    role: user.role,
    email: user.email
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d'});
}

const authenticateUser = async(req,res,next) => {
  try {
    if(!req.headers.token) throw new Error('Authorization token is missing');
    const user = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    if(!user) throw new Error("User is not present");
    next();
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
}

const authorize = (req, res, next) => {
  try{
      const { token } = req.headers;
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if(user.role === "STAFF") throw new Error("You are not authorized to perform this action");
      next();
  } catch(error) {
      res.status(403).json({ msg: error.message });
  }
}

const authorizeAdmin = (req, res, next) => {
  try{
      const { token } = req.headers;
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if(user.role !== "ADMIN") throw new Error("You are not authorized to perform this action");
      next();
  } catch(error) {
      res.status(403).json({ msg: error.message });
  }
}

module.exports = { createToken, authenticateUser, authorize, authorizeAdmin};


