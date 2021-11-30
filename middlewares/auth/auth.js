/*
 * If the user is not logged in redirect to "/"
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof req.session.in === 'undefined' || req.session.in !== true)
      return res.redirect('/');
  
    next();
  };
};