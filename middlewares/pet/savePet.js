/*
 * Update or create pet using post params
 * if pet exists in res.locals.pets update, else create new pet
 * then redirect to /pet/:ownerid
*/
module.exports = function (objectrepository) {
  const PetModel = require('../../models/Pet.model');

  return function (req, res, next) {
      if (
        typeof req.body.name      === 'undefined' ||
        typeof req.body.birthday  === 'undefined' ||
        typeof req.body.species   === 'undefined' ||
        typeof req.body.sex       === 'undefined' ||
        typeof res.locals.owner   === 'undefined'
      ) {
        return next();
      }

      if (typeof res.locals.pet === 'undefined') {
        res.locals.pet = new PetModel();
      }

      res.locals.pet.name     = req.body.name;
      res.locals.pet.birthday = req.body.birthday;
      res.locals.pet.species  = req.body.species;
      res.locals.pet.sex      = req.body.sex;
      res.locals.pet._owner   = res.locals.owner._id;

      res.locals.pet.save((error) => {
        if (error) {
          return next(error);
        }

        return res.redirect(`/pet/${res.locals.owner._id}`);
      })
  };
};