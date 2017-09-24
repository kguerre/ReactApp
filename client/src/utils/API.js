import axios from "axios";

const API = {
  //NYT API

  runQuery: (topic, start, end) => {
    const apiKey = "b90a0369585147ff84a74744acfc5773";
    const queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      apiKey +
      "&q=" +
      topic +
      "&begin_date=" +
      start +
      "0101&end_date=" +
      end +
      "0101";

    console.log(queryURL);
    return axios.get(queryURL)
  },
  // // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};

export default API;
