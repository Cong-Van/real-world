import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../store";

function UserInfo({ user, handleFollow }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={user.image} className="user-img" alt={user.username} />
            <h4>{user.username}</h4>
            <p>{user.bio}</p>
            {user.username === currentUser.username ? (
              <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                to={"/settings"}
              >
                <i className="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </Link>
            ) : (
              <button
                className={`btn btn-sm btn-outline-secondary action-btn ${
                  user.following ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => handleFollow(user.username, user.following)}
              >
                <i className="ion-plus-round"></i>
                &nbsp;{" "}
                {`${user.following ? "Unfollow" : "Follow"} ${user.username}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
