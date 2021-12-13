const renderMW = require('../middlewares/render');

const authMW = require('../middlewares/auth/auth');
const validateMW = require('../middlewares/auth/validate');
const logoutMW = require('../middlewares/auth/logout');

const getOwnerMW = require('../middlewares/owner/getOwner');
const getOwnersMW = require('../middlewares/owner/getOwners');
const deleteOwnerMW = require('../middlewares/owner/deleteOwner');
const saveOwnerMW = require('../middlewares/owner/saveOwner');

const getPetMW = require('../middlewares/pet/getPet');
const getPetsMW = require('../middlewares/pet/getPets');
const deletePetMW = require('../middlewares/pet/deletePet');
const savePetMW = require('../middlewares/pet/savePet');

const OwnerModel = require('../models/Owner.model');
const PetModel = require('../models/Pet.model');

module.exports = function(app) {
  const objectRepository = {
    OwnerModel: OwnerModel,
    PetModel:PetModel
  };

  app.use(
    '/owner/new',
    authMW(objectRepository),
    saveOwnerMW(objectRepository),
    renderMW(objectRepository, 'editorOwner')
  );

  app.use(
    '/owner/edit/:ownerid',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    saveOwnerMW(objectRepository),
    renderMW(objectRepository, 'editorOwner')
  );
  
  app.get(
    '/owner/delete/:ownerid',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    deleteOwnerMW(objectRepository)
  );

  app.get(
    '/owner',
    authMW(objectRepository),
    getOwnersMW(objectRepository),
    renderMW(objectRepository, 'ownerList'),
  );

  app.use(
    '/pet/:ownerid/new',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    savePetMW(objectRepository),
    renderMW(objectRepository, 'editorPet')
  );

  app.use(
    '/pet/:ownerid/edit/:petid',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    getPetMW(objectRepository),
    savePetMW(objectRepository),
    renderMW(objectRepository, 'editorPet')
  );

  app.get(
    '/pet/:ownerid/delete/:petid',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    getPetMW(objectRepository),
    deletePetMW(objectRepository)
  );

  app.get(
    '/pet/:ownerid',
    authMW(objectRepository),
    getOwnerMW(objectRepository),
    getPetsMW(objectRepository),
    renderMW(objectRepository, 'petsList'),
  );

  app.use(
    '/',
    validateMW(objectRepository),
    renderMW(objectRepository, 'index')
  );
  
  app.use(
    '/logout',
    logoutMW(objectRepository)
  );
}