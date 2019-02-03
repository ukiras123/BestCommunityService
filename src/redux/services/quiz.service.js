import { formatQuizes } from "../../_helpers/util";
const rp = require("request-promise");

export const quizService = {
  getQuizQuestions
};

async function getQuizQuestions(category, number, dispatch) {
  const requestOptions = {
    uri: `https://opentdb.com/api.php?amount=${number}&type=multiple&category=${
      category.id
    }`,
    method: "GET",
    json: true
  };
  const response = await rp(requestOptions);
  const formattedQuestinos = formatQuizes(response.results, category.name);
  return formattedQuestinos;
}
