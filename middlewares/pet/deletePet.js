/*
 * Delete a pet from the database (:petid param) then redirect to '/pet/:ownerid'
*/
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof res.locals.pet === 'undefined') {
      return next();
    }
    res.locals.pet.remove((error) => {
      if (error) {
        return next(error);
      }
      return res.redirect(`/pet/${res.locals.owner._id}`);
    })
  };
};