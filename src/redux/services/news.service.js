const rp = require("request-promise");

const NEWS_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b55aaacfb87a46aaa3e4a426d03790d1"

export const newsService = {
    getNews
};

async function getNews() {
    const requestOptions = {
        uri: NEWS_URL,
        method: "GET",
        json: true
    };
    const response = await rp(requestOptions);
    return response.articles;
}