/*
 * Load pet from database into res.locals.pets using :petid param
*/

module.exports = function (objectrepository) {
  const PetModel = require('../../models/Pet.model');

  return function (req, res, next) {
    PetModel.findOne({ _id: req.params.petid }, (error, pet) => {
      if (error || !pet) {
        return next(error);
      } 
      res.locals.pet = pet;
      return next();
    });
  };
};