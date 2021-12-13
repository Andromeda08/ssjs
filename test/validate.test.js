var expect = require('chai').expect;
var validate = require('../middlewares/auth/validate');
require('dotenv').config();

describe('validate Middleware', function() {
  it("should set res.locas.err if password is incorrect.",
  (done) => {
    const mw = validate({});
    const mock_res = { locals: {} }
    mw(
      {
        body: {
          password: 'password123'
        }
      },
      mock_res,
      (err) => {
        expect(mock_res.locals.err).to.be.eql('Incorrect password!');
        done();
      }
    )
  });
  it("should do nothing if password is empty.",
  (done) => {
    const mw = validate({});
    mw(
      { body: {} },
      {},
      (err) => {
        done();
      }
    )
  });
  it("should redirect if password is correct.",
  (done) => {
    const mw = validate({});
    const mock_req = {
      body: {
        password: process.env.PW
      },
      session: {
        save: (cb) => cb(null)
      }
    }
    const mock_res = {
      redirect: (to) => {
        expect(to).to.be.eql('/owner');
        done();
      }
    }
    mw(
      mock_req,
      mock_res,
      () => {}
    )
  });
});