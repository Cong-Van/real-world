import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "./store";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ArticleDetailPage from "./pages/Article/ArticleDetail";
import EditArticlePage from "./pages/Article/EditArticle";
import NewArticlePage from "./pages/Article/NewArticle";
import ProfilePage from "./pages/User/Profile";
import SettingUserPage from "./pages/User/Settings";
import AuthenticationPage from "./pages/User/Authentication";
import { getAuthToken } from "./util/auth";
import { userAPI } from "./apis";

function App() {
  const { authenticated, setAuthenticated, setCurrentUser } =
    useContext(UserContext);

  const token = getAuthToken();

  useEffect(() => {
    if (!token || token === "EXPIRED") {
      setAuthenticated(false);
      setCurrentUser({});
    } else {
      setAuthenticated(true);
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      userAPI.setHeader(token);
    }
  }, [token, authenticated, setAuthenticated, setCurrentUser]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path="/article/:slug" element={<ArticleDetailPage />} />
        <Route path="/article/:slug/edit" element={<EditArticlePage />} />
        <Route path="/article/new" element={<NewArticlePage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingUserPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
