import {
  newsService
} from "../services";
import {
  newsConstants
} from "../constants";

export const newsActions = {
  getNews
};

function getNews(details) {
  return dispatch => {
    newsService.getNews().then(
      news => {
        dispatch({
          type: newsConstants.GET_NEWS,
          news
        });
      }
    )
  };
}