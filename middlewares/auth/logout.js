/*
 * Destroy session and redirect to '/'
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
    req.session.in = false;
    res.redirect('/');
  };
};