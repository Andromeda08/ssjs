/*
 * Update or create owner using post params
 * if owner exists in res.locals.owners update, else create new owner
 * then redirect to /owner
*/

module.exports = function (objectrepository) {
  const OwnerModel = require('../../models/Owner.model');

  return function (req, res, next) {
    if (
      typeof req.body.name        === 'undefined' ||
      typeof req.body.address     === 'undefined' ||
      typeof req.body.birthday    === 'undefined' ||
      typeof req.body.phonenumber === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.owner === 'undefined') {
      res.locals.owner = new OwnerModel();
    }

    res.locals.owner.name        = req.body.name;
    res.locals.owner.birthday    = req.body.birthday;
    res.locals.owner.address     = req.body.address;
    res.locals.owner.phonenumber = req.body.phonenumber;
  
    res.locals.owner.save((error) => {
      if(error) {
        return next(error);
      }

      return res.redirect('/owner');
    });
  };
};