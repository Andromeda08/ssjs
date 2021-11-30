/*
 * Load all pets from the database into res.locals.pets
*/

module.exports = function (objectrepository) {
  const PetModel = require('../../models/Pet.model');

  return function (req, res, next) {
    //res.locals.pets = pets.filter(p => p.ownerId === res.locals.owner.id);

    if (typeof res.locals.owner === 'undefined') {
      return next();
    }

    PetModel.find({ _owner: res.locals.owner._id }, (error, pets) => {
      if (error) {
        return next(error);
      }

      res.locals.pets = pets;
      return next();
    });
  };
};