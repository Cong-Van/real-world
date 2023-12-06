import request from "./request";

const Profile = {
  /**
   * @param {String} username
   * @returns a user profile
   */
  getOne: (username) => request.get(`/profiles/${username}`),

  /**
   * @param {String} username
   * @returns a user profile (Current user follow that user)
   */
  follow: (username) => request.post(`/profiles/${username}/follow`),

  /**
   * @param {String} username
   * @returns a user profile (Current user unfollow that user)
   */
  unFollow: (username) => request.delete(`/profiles/${username}/follow`),
};

export default Profile;
