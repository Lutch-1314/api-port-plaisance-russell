module.exports = (req, res, next) => {

    console.log("USER JWT :", req.user);
    
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Accès réservé aux administrateurs"
    });
  }

  next();
};