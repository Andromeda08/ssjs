var expect = require('chai').expect;
var savePet = require('../middlewares/pet/savePet');

describe('savePet Middleware', function() {
  it('should set res.locals.pet with a pet from the database.',
  (done) => {
    const mw = savePet({
      PetModel: {}
    });
    
    mw(
      {
        body: {
          name: 'n',
          birthday: 'b',
          sex: 's',
          species: 's'
        },
        params: {
          ownerid: '7'
        }
      },
      {
        locals: {
          owner: {
            _id: 'ownerid',
          },
          pet: {
            save: (cb) => {
              cb(null);
            }
          }
        },
        redirect: (where) => {
          expect(where).to.be.eql('/pet/ownerid');
          done();
        }
      },
      (err) => {
        // Wont call next
      }
    )
  });
  it('should call next with error in case of database error.',
  (done) => {
    const mw = savePet({
      PetModel: {}
    });
    
    const expected = 'totally legit database error response 💚';

    mw(
      {
        body: {
          name: 'n',
          birthday: 'b',
          sex: 's',
          species: 's'
        },
        params: {
          ownerid: '7'
        }
      },
      {
        locals: {
          owner: {
            _id: 'ownerid',
          },
          pet: {
            save: (cb) => {
              cb(expected);
            }
          }
        },
        redirect: (where) => {
          // Ticking timebomb I guess
          //expect(true).to.be.eql(false);
        }
      },
      (err) => {
        expect(err).to.be.eql(expected);
        done();
      }
    )
  });
})