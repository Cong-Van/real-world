export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("user");
};
