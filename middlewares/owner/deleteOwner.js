/*
 * Delete owner from database (:ownerid param) then redirect to '/owner'
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
      if (typeof res.locals.owner === 'undefined') {
        return next();
      }

      res.locals.owner.remove((error) => {
        if (error) {
          return next(error);
        }
        
        return res.redirect('/owner');
      })
  };
};