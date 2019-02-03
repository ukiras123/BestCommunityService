import { categories } from "./const";
const _ = require("lodash");

const prodNum = function(user, users) {
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

const getCheckoutSummary = function(user, users) {
  const summary = { itemNum: 0, itemTotal: 0, tax: 0, total: 0 };
  if (user && users && !_.isEmpty(users)) {
    const userId = user.id;
    const userDetail = users.filter(user => user.id === userId);
    if (!_.isEmpty(userDetail)) {
      if (userDetail[0].rental && userDetail[0].rental.length > 0) {
        const rentals = userDetail[0].rental;
        const itemTotal = rentals
          .map(rent => rent.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2);
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

const getUserProducts = function(user, users) {
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
  getRandomCategory,
};
