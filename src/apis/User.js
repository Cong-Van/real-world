import axios from "axios";

import request from "./request";

const User = {
  // Set header token
  setHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  // User login
  login: (loginData) => request.post("/users/login", loginData),
  // Register a new user
  register: (registerData) => request.post("/users", registerData),
  // Get current logged-in user
  get: () => request.get("/user"),
  // Update current user
  update: (updateUserData) => request.put("/user", updateUserData),
};

export default User;
