/*
 * Validates login password
 * If the password is incorrect redirect to "/" with error message
 * Else redirect to "/owner"
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
    // Empty field
    if (typeof req.body.password === 'undefined')
      return next();
    
    // Check password'
    if (req.body.password === process.env.PW) {
      req.session.in = true;
      return req.session.save((err) => {
        //console.log(req.session);
        res.redirect('/owner');
      });
    }
    
    // Incorrect password
    res.locals.err = 'Incorrect password!';
    return next();
  };
};