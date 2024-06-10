import React, { useState, useEffect } from "react";
import axios from "axios";

const ExternalApi = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("technology");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (searchQuery = "technology") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles?apiKey=96fc2acf-a8a9-4b69-8808-00ce4f8bf5ea&keyword=${searchQuery}`
      );
      // Initialize likes, dislikes, and user interaction state for each article
      const articlesWithLikes = response.data.articles.results.map(
        (article) => ({
          uri: article.uri,
          title: article.title,
          body: article.body,
          url: article.url,
          source: article.source.title,
          image: article.image,
          likes: 0,
          dislikes: 0,
          userInteraction: null, // 'like', 'dislike', or null
        })
      );
      setArticles(articlesWithLikes);
    } catch (error) {
      console.error("Error fetching the news data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  const shareOnFacebook = (articleUrl) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`;
    window.open(facebookShareUrl, "_blank", "noopener,noreferrer");
  };

  const handleLike = (index) => {
    const updatedArticles = [...articles];
    if (updatedArticles[index].userInteraction === "dislike") {
      updatedArticles[index].dislikes -= 1;
    }
    if (updatedArticles[index].userInteraction !== "like") {
      updatedArticles[index].likes += 1;
      updatedArticles[index].userInteraction = "like";
    }
    setArticles(updatedArticles);
    // console.log(updatedArticles);
  };

  const handleDislike = (index) => {
    const updatedArticles = [...articles];
    if (updatedArticles[index].userInteraction === "like") {
      updatedArticles[index].likes -= 1;
    }
    if (updatedArticles[index].userInteraction !== "dislike") {
      updatedArticles[index].dislikes += 1;
      updatedArticles[index].userInteraction = "dislike";
    }
    setArticles(updatedArticles);
    // console.log(articles);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Search News</h1>
      <form
        onSubmit={handleSearch}
        className="form-inline justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control mr-sm-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div key={article.uri} className="col-md-4 mb-4">
              <div className="card">
                {article.image && (
                  <img
                    src={article.image}
                    className="card-img-top"
                    alt={article.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p
                    className="card-text"
                    style={{ maxHeight: "6em", overflow: "hidden" }}
                  >
                    {article.body}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Read more
                  </a>
                  <button
                    onClick={() => shareOnFacebook(article.url)}
                    className="btn btn-secondary ml-2"
                  >
                    Share on Facebook
                  </button>
                  <div className="mt-2">
                    <button
                      onClick={() => handleLike(index)}
                      className="btn btn-success mr-2"
                      disabled={article.userInteraction === "like"}
                    >
                      Like {article.likes}
                    </button>
                    <button
                      onClick={() => handleDislike(index)}
                      className="btn btn-danger"
                      disabled={article.userInteraction === "dislike"}
                    >
                      Dislike {article.dislikes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalApi;
