/*
 * Destroy session and redirect to '/'
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
      req.session.destroy(err => {
        res.redirect('/');
        console.log(res.session)
      });
      return next();
  };
};