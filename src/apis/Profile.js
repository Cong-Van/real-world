import request from "./request";

const Profile = {
  // Get a profile
  getOne: (username) => request.get(`/profiles/${username}`),
  // Follow a user
  follow: (username) => request.post(`/profiles/${username}/follow`),
  // Unfollow a user
  unFollow: (username) => request.delete(`/profiles/${username}/follow`),
};

export default Profile;
