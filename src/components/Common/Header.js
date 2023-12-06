import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store";

function Header() {
  const { authenticated, currentUser } = useContext(UserContext);

  const homeBtn = (
    <li className="nav-item">
      <Link className="nav-link active" to="/">
        Home
      </Link>
    </li>
  );

  const navBar = authenticated ? (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/article/new">
          <i className="ion-compose"></i>&nbsp;New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to={`/user/${currentUser.username}`}>
          <img
            src={currentUser.image}
            className="user-pic"
            alt={currentUser.username}
          />
          {currentUser.username}
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/auth?mode=login">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/auth?mode=register">
          Sign up
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {homeBtn}
          {navBar}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
