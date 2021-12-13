var expect = require('chai').expect;
var auth = require('../middlewares/auth/auth');

describe('auth Middleware', function() {
  it('should redirect if req.session.in is undefined',
  (done) => {
    const mw = auth({});
    const mock_req = {
      session: {
        save: (cb) => cb(null)
      }
    }
    const mock_res = {
      redirect: (to) => {
        expect(to).to.be.eql('/');
        done();
      }
    }
    mw(
      mock_req,
      mock_res,
      () => {}
    )
  });
  it('should redirect if req.session.in is false',
  (done) => {
    const mw = auth({});
    const mock_req = {
      session: {
        in: false,
        save: (cb) => cb(null)
      }
    }
    const mock_res = {
      redirect: (to) => {
        expect(to).to.be.eql('/');
        done();
      }
    }
    mw(
      mock_req,
      mock_res,
      () => {}
    )
  });
  it("should call next if authenticated.",
  (done) => {
    const mw = auth({});
    const mock_req = {
      session: {
        in: true,
        save: (cb) => cb(null)
      }
    }
    mw(
      mock_req,
      {},
      () => {
        expect(mock_req.session.in).to.be.eql(true);
        done();
      }
    )
  });
});