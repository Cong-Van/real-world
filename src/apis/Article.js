import request from "./request";

const Article = {
  /**
   * @param {Object: {offset, limit}} queryObj
   * @returns recent articles from users are followed
   */
  getFeed: (queryObj) => request.get("/articles/feed", queryObj),

  /**
   * @param {Object: {offset, limit, tag, favorite ,...}} queryObj
   * @returns recent articles globally
   */
  getGolbal: (queryObj) => request.get("/articles", queryObj),

  /**
   * @param {String} slug
   * @returns an article
   */
  getOne: (slug) => request.get(`/articles/${slug}`),

  /**
   * @param {Object: {title, body, description, tagList}} articleData
   * @returns a new article
   */
  create: (articleData) => request.post("/articles", articleData),

  /**
   * @param {String} slug
   * @param {Object: {title, body, description, tagList}} articleData
   * @returns an updated article
   */
  update: (slug, articleData) => request.put(`/articles/${slug}`, articleData),

  /**
   * @param {String} slug
   * Delete an article
   */
  delete: (slug) => request.delete(`/articles/${slug}`),

  /**
   * @param {String} slug
   * @returns an updated article (User follow article)
   */
  favorite: (slug) => request.post(`/articles/${slug}/favorite`),

  /**
   * @param {String} slug
   * @returns an updated article (User unfollow article)
   */
  unfavorite: (slug) => request.delete(`/articles/${slug}/favorite`),
};

export default Article;
