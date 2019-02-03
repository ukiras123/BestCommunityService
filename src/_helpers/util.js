const _ = require("lodash");

const prodNum = function (user, users) {
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      if (userDetail[0].rental) {
        return userDetail[0].rental.length;
      }
    }
  } else {
    return 0;
  }
};

function calculateTax(total, taxRate = 8.5) {
  return (taxRate * total) / 100;
}

const checkoutSummary = function (user, users) {
  const summary = { itemNum: 0, itemTotal: 0, tax: 0, total: 0 };
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      if (userDetail[0].rental && userDetail[0].rental.length > 0) {
        const rentals = userDetail[0].rental;
        const itemTotal = rentals
          .map(rent => rent.price)
          .reduce((a, b) => a + b, 0).toFixed(2);
        const tax = calculateTax(itemTotal).toFixed(2);
        summary.itemNum = rentals.length;
        summary.itemTotal = itemTotal;
        summary.tax = tax;
        summary.total = (parseFloat(itemTotal) + parseFloat(tax)).toFixed(2);
        return summary;
      }
    }
  } else {
    return null;
  }
};

const getUserProducts = function (user, users) {
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      if (userDetail[0].rental && userDetail[0].rental.length > 0) {
        const rentals = userDetail[0].rental;
        return rentals;
      }
    }
  } else {
    return null;
  }
};

module.exports = {
  prodNum,
  checkoutSummary,
  getUserProducts
};
