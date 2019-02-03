const RENT = "RENT";
const CATERING = "CATERING";
const HALL = "HALL";
const paypal = {
  sandBoxEnv: "sandbox",
  prodEnv: "production", // you can set here to 'production' for production
  currency: "USD", // or you can set this value from your props or state
  client: {
    sandbox:
      "AcTjgh9xmz-3HYSvvGA3UEyAhhaz2p5t_5mMb9Uj05s4ZMjHXWjN5MvCNhGwj2Llvfi4fHKCSZKKo4Mc",
    production:
      "AR-uw6Ali0Eny1ZfYNb9ijDt_ZY0GGBiUinzPUiR555Gjpc6wV0-b5JE5Yjc9BJClzlc1OtktXd6mMum"
  }
};

const categories = [
  {
    id: 9,
    name: "General Knowledge"
  },
  {
    id: 10,
    name: "Entertainment: Books"
  },
  {
    id: 11,
    name: "Entertainment: Film"
  },
  {
    id: 12,
    name: "Entertainment: Music"
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres"
  },
  {
    id: 14,
    name: "Entertainment: Television"
  },
  {
    id: 15,
    name: "Entertainment: Video Games"
  },
  {
    id: 16,
    name: "Entertainment: Board Games"
  },
  {
    id: 17,
    name: "Science & Nature"
  },
  {
    id: 18,
    name: "Science: Computers"
  },
  {
    id: 19,
    name: "Science: Mathematics"
  },
  {
    id: 20,
    name: "Mythology"
  },
  {
    id: 21,
    name: "Sports"
  },
  {
    id: 22,
    name: "Geography"
  },
  {
    id: 23,
    name: "History"
  },
  {
    id: 24,
    name: "Politics"
  },
  {
    id: 25,
    name: "Art"
  },
  {
    id: 26,
    name: "Celebrities"
  },
  {
    id: 27,
    name: "Animals"
  },
  {
    id: 28,
    name: "Vehicles"
  },
  {
    id: 29,
    name: "Entertainment: Comics"
  },
  {
    id: 30,
    name: "Science: Gadgets"
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga"
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations"
  }
];

const reactQuestions = {
  quizTitle: "All About React",
  quizSynopsis: "Lets test how much you know about React.",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again."
      // explanation:
      // "Ask Google for more details"
    }
  ]
};
module.exports = {
  types: {
    RENT,
    CATERING,
    HALL
  },
  Paypal: paypal,
  quizQuestion: {
    reactQuestions
  },
  categories
};
