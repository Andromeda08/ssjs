/*
 * Load all owners from the database into res.locals.owners
*/

module.exports = function (objectrepository) {
  const OwnerModel = require('../../models/Owner.model');

  return function (req, res, next) {
    OwnerModel.find({}, (error, owners) => {
      if (error) {
        return next(error);
      }
      
      res.locals.owners = owners;
      return next();
    })
    
  };
};