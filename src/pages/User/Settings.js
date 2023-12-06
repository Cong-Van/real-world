import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { logout } from "../../util/logout";
import { userAPI } from "../../apis";
import { UserContext } from "../../store";

function SettingPage() {
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    image: "",
  });

  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const user = { user: userData };
    console.log(user);
    const data = await userAPI.update(user);

    if (data.errors) {
      const errors = Object.entries(data.errors).map((error) =>
        error.join(" ")
      );
      setErrors(errors);
    }
    if (data) {
      const updatedUser = data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("token", updatedUser.token);
      userAPI.setHeader(updatedUser.token);
      setCurrentUser(updatedUser);
      navigate(`/user/${updatedUser.username}`);
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    userAPI.setHeader("");
    navigate("/");
  };

  useEffect(() => {
    const curUser = { ...JSON.parse(localStorage.getItem("user")) };
    delete curUser.token;
    curUser.password = "";
    curUser.bio = curUser.bio || "";
    console.log(curUser);
    setUserData(curUser);
  }, []);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {errors && (
              <ul className="error-messages">
                {Object.values(errors).map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    value={userData.image}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={isLoading}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
