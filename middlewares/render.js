// Render view
module.exports = function (objectrepository, view) {
  return function (req, res) {
      res.render(view);
  };
};