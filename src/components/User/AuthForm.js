import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { UserContext } from "../../store";
import { userAPI } from "../../apis";

function AuthForm({ isLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const user = {
      email: formData.email,
      password: formData.password,
    };

    let data;
    if (isLogin) {
      data = await userAPI.login({ user });
    } else {
      user.username = formData.username;
      data = await userAPI.register({ user });
    }

    if (data.errors) {
      const errors = Object.entries(data.errors).map((error) =>
        error.join(" ")
      );
      setErrors(errors);
    }

    if (data.user) {
      const user = data.user;
      localStorage.setItem("token", user.token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 6);
      localStorage.setItem("expiration", expiration.toISOString());
      localStorage.setItem("user", JSON.stringify(user));
      setAuthenticated(true);

      navigate("/");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors && (
        <ul className="error-messages">
          {Object.values(errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {isLogin || (
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </fieldset>
      )}
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          required
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="password"
          required
        />
      </fieldset>
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        disabled={isLoading}
      >
        {isLogin ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
}

export default AuthForm;
