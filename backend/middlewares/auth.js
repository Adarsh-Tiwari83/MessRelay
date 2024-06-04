const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.isAdmin = async (req, res, next) => {
  try{
    if(req.user.role !== 'Admin'){
      return res.status(403).json({success:false, message: 'Forbidden'});
    }
    next();
  }catch(error){
    res.status(500).json({success:false, message: error.message });
  }
}