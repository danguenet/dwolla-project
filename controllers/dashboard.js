module.exports = {
  view(req, res) {
    res.render("dashboard", {
      customerURL: req.user.customerURL,
      firstName: req.user.firstName
    });
  }
};
