const uuidv4 = require("uuid/v4");
const dwolla = require("dwolla-v2");

const dwollaKeys = require("../config/dwolla");
const helpers = require("../utils");

const client = new dwolla.Client({
  key: dwollaKeys.appKey,
  secret: dwollaKeys.appSecret,
  environment: "sandbox" // optional - defaults to production
});

module.exports = {
  add(req, res) {
    const requestBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.user.email,
      type: "personal",
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      dateOfBirth: req.body.dateOfBirth,
      ssn: req.body.ssn
    };
    let errors = [];

    if (
      !requestBody.firstName ||
      !requestBody.lastName ||
      !requestBody.email ||
      !requestBody.address1 ||
      !requestBody.address2 ||
      !requestBody.city ||
      !requestBody.state ||
      !requestBody.postalCode ||
      !requestBody.dateOfBirth ||
      !requestBody.ssn
    ) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (requestBody.postalCode.length !== 5) {
      errors.push({ msg: "Postal code must be 5 digits long" });
    }

    if (requestBody.ssn.length !== 4) {
      errors.push({ msg: "Social security number must be 4 digits long" });
    }

    if (requestBody.address1.length > 50 || requestBody.address2.length > 50) {
      errors.push({ msg: "Address fields must be 50 characters or less" });
    }

    if (helpers.greaterThan18(requestBody.dateOfBirth) === false) {
      errors.push({ msg: "You must be at least 18 years old" });
    }

    if (errors.length > 0) {
      res.render("create-customer", {
        errors,
        requestBody
      });
    } else {
      client.auth.client().then(appToken =>
        appToken
          .post("customers", requestBody, { "Idempotency-Key": uuidv4() })
          .then(res => {
            req.user.customerURL = res.headers.get("location");
            req.user.firstName = requestBody.firstName;
            req.user.save();
            req.flash("success_msg", "Customer created");
            res.redirect("/dashboard");
          })
          .catch(error => {
            if (error.status == 400) {
              req.flash("error_msg", "Duplicate customer or validation error.");
            }
            if (error.status === 403) {
              req.flash("error_msg", "Not authorized to create customers.");
            }
            res.redirect("/dashboard");
          })
      );
    }
  },
  view(req, res) {
    res.render("create-customer");
  }
};
