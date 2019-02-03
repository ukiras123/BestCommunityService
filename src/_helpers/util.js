const _ = require("lodash");

const prodNum = function getProdNum(user, users) {
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
        if(userDetail[0].rental){
            return userDetail[0].rental.length;
        }
    }
  } else {
    return 0;
  }
};

module.exports = {
  prodNum
};
