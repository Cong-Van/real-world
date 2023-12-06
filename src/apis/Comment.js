import request from "./request";

const Comment = {
  /**
   * @param {String} slug
   * @returns comments for an article
   */
  getByArticleSlug: (slug) => request.get(`/articles/${slug}/comments`),

  /**
   * @param {String} articleSlug
   * @param {Object: {body}} commentData
   * @returns a new comment for an article
   */
  create: (articleSlug, commentData) =>
    request.post(`/articles/${articleSlug}/comments`, commentData),

  /**
   * @param {String} articleSlug
   * @param {String} commentId
   * Delete a comment for an article
   */
  delete: (articleSlug, commentId) =>
    request.delete(`/articles/${articleSlug}/comments/${commentId}`),
};

export default Comment;
