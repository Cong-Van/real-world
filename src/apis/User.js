import axios from "axios";

import request from "./request";

const User = {
  /**
   * Add Authorization on Header for each request
   * @param {String} token
   */
  setHeader: (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  /**
   * @param {Object: {email, password}} loginData
   * @returns current user
   */
  login: (loginData) => request.post("/users/login", loginData),

  /**
   * @param {Object: {username, email, password}} loginData
   * @returns current user (After register)
   */
  register: (registerData) => request.post("/users", registerData),

  /**
   * @returns current user
   */
  get: () => request.get("/user"),

  /**
   * @param {Object : {email, username, password, image, bio }} updateUserData
   * @returns current user after update
   */
  update: (updateUserData) => request.put("/user", updateUserData),
};

export default User;
