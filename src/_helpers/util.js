import { categories } from "./const";
const _ = require("lodash");

const prodNum = function(user, users) {
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    let number = 0;
    if (!_.isEmpty(userDetail)) {
      if (userDetail[0].rental) {
        number = number + userDetail[0].rental.length;
      }
      if (userDetail[0].catering) {
        number = number + userDetail[0].catering.length;
      }
      if (userDetail[0].hall) {
        number = number + userDetail[0].hall.length;
      }
      return number;
    }
  } else {
    return 0;
  }
};

function calculateTax(total, taxRate = 8.5) {
  return (taxRate * total) / 100;
}

const getCheckoutSummary = function(user, users) {
  const summary = { itemNum: 0, itemTotal: 0, tax: 0, total: 0 };
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      let itemCount = 0;
      let total = 0;
      if (userDetail[0].rental && userDetail[0].rental.length > 0) {
        const rentals = userDetail[0].rental;
        itemCount = itemCount + rentals.length;
        total =
          total +
          parseFloat(
            rentals
              .map(rent => rent.price * rent.config.days)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)
          );
      }
      if (userDetail[0].catering && userDetail[0].catering.length > 0) {
        const catering = userDetail[0].catering;
        itemCount = itemCount + catering.length;
        total =
          total +
          parseFloat(
            catering
              .map(cat => cat.price * cat.config.people)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)
          );
      }
      if (userDetail[0].hall && userDetail[0].hall.length > 0) {
        const halls = userDetail[0].hall;
        itemCount = itemCount + halls.length;
        total =
          total +
          parseFloat(
            halls
              .map(cat => cat.price * cat.config.hallDays)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)
          );
      }

      if (itemCount > 0) {
        const tax = calculateTax(total).toFixed(2);
        summary.itemNum = itemCount;
        summary.itemTotal = total.toFixed(2);
        summary.tax = tax;
        summary.total = parseFloat(
          (parseFloat(total) + parseFloat(tax)).toFixed(2)
        );
        return summary;
      }
    }
  } else {
    return null;
  }
};

const getUserProducts = function(user, users) {
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      let items = [];
      if (userDetail[0].rental && userDetail[0].rental.length > 0) {
        const rentals = userDetail[0].rental;
        items = items.concat(rentals);
      }
      if (userDetail[0].catering && userDetail[0].catering.length > 0) {
        const caterings = userDetail[0].catering;
        items = items.concat(caterings);
      }
      if (userDetail[0].hall && userDetail[0].hall.length > 0) {
        const halls = userDetail[0].hall;
        items = items.concat(halls);
      }
      if (items.length > 0) {
        return items;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

const formatQuizes = function(allQuestion, category = "Your Knowledge") {
  const ourQuestions = allQuestion.map(q => {
    const ourQ = {};
    ourQ.question = q.question;
    ourQ.questionType = "text";
    ourQ.messageForCorrectAnswer = "Correct answer. Good job.";
    ourQ.messageForIncorrectAnswer = "Incorrect answer. Please try again.";
    let allAnswers = q.incorrect_answers;
    allAnswers.push(q.correct_answer);
    ourQ.answers = allAnswers;
    ourQ.correctAnswer = (allAnswers.indexOf(q.correct_answer) + 1).toString();
    return ourQ;
  });

  const finalQuestions = {
    quizTitle: `All About ${category}`,
    questions: ourQuestions
  };
  return finalQuestions;
};

const getRandomCategory = function() {
  return categories[Math.floor(Math.random() * categories.length)];
};

export {
  formatQuizes,
  prodNum,
  getCheckoutSummary,
  getUserProducts,
  getRandomCategory
};
