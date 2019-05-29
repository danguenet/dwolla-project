var moment = require("moment");

const greaterThan18 = dob => {
  const a = moment();
  const b = moment(dob);

  if (a.diff(b, "year") < 18) {
    return false;
  } else {
    return true;
  }
};

exports.greaterThan18 = greaterThan18;
