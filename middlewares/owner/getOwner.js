/*
 * Load owner from database into res.locals.owners using :ownerid param
*/

module.exports = function (objectrepository) {
  const OwnerModel = require('../../models/Owner.model');

  return function (req, res, next) {
    OwnerModel.findOne({ _id: req.params.ownerid }, (error, owner) => {
      if(error || !owner) {
        return next(error);
      }
      res.locals.owner = owner;
      return next();
    })
  };
};