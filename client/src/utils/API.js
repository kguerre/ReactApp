import axios from "axios";

const API = {
  //NYT API

  runQuery: (topic, start, end) => {
    var apiKey = "b90a0369585147ff84a74744acfc5773";
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

    return axios.get(queryURL);
    // console.log(queryURL);
    // .then(function(response){

    // 	const newArticles = [];
    // 	const allArticles = response.data.response.docs;
    // 	const counter = 0;
    //   console.log(response)
    //Gets first 5 articles that have all 3 components
    // 		for(let i = 0; i < allArticles.length; i++){

    // 			if(counter > 4) {
    // 				return newArticles;
    // 			}

    // 			if(allArticles[counter].headline.main && allArticles[counter].pub_date && allArticles[counter].web_url) {
    // 				newArticles.push(allArticles[counter]);
    // 				counter++;
    // 			}
    // 		}

    // 		return newArticles;
    // })
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
