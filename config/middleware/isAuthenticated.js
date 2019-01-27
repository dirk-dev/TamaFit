module.exports = function(req, res, next) {
  // If authenticated, allow access to restricted route
  if (req.user) {
    return next();
  }

  // when not authenticated
  return res.redirect("/");
};
