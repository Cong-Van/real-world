import request from "./request";

const Article = {
  // Get recent articles from users are followed
  getFeed: (page) => request.get("/articles/feed", page),
  // Get recent articles globally
  getGolbal: (page) => request.get("/articles", page),
  // Get an article
  getOne: (slug) => request.get(`/articles/${slug}`),
  // Create an article
  create: (articleData) => request.post("/articles", articleData),
  // Update an article
  update: (slug, articleData) => request.put(`/articles/${slug}`, articleData),
  // Delete an article
  delete: (slug) => request.delete(`/articles/${slug}`),
  // Favorite an article
  favorite: (slug) => request.post(`/articles/${slug}/favorite`),
  // Unfavorite an artcle
  unfavorite: (slug) => request.delete(`/articles/${slug}/favorite`),
};

export default Article;
