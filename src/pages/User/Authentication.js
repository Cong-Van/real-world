import { Link, useSearchParams } from "react-router-dom";

import AuthForm from "../../components/User/AuthForm";

function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "register";
  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              {isLogin ? "Sign in" : "Sign up"}
            </h1>
            <p className="text-xs-center">
              <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                {isLogin ? "Need an account?" : "Have an account?"}
              </Link>
            </p>
            <AuthForm isLogin={isLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
