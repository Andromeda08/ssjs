var expect = require('chai').expect;
var logout = require('../middlewares/auth/logout');

describe('logout Middleware', function() {
  it('should req.session.in to false and redirect to \'/\'',
  (done) => {
    const mw = logout({});
    const mock_req = {
      session: {
        in: true,
        save: (cb) => cb(null),
      }
    }
    const mock_res = {
      redirect: (to) => {
        expect(to).to.be.eql('/');
        expect(mock_req.session.in).to.be.eql(false);
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