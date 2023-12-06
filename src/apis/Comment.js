import request from "./request";

const Comment = {
  // Get comments for an article
  getByArticleSlug: (slug) => request.get(`/articles/${slug}/comments`),
  // Create a comment for an article
  create: (articleSlug, commentData) =>
    request.post(`/articles/${articleSlug}/comments`, commentData),
  // Delete a comment for an article
  delete: (articleSlug, commentId) =>
    request.delete(`/articles/${articleSlug}/comments/${commentId}`),
};

export default Comment;
