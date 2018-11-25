import React from "react";
import "./Profile.scss";

const Profile = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="cl-teacher">
        <div className="cl-teacher-wrapper">
          <div className="teacher-about">
            <div className="profile-img">
              <img
                className="profile-img"
                alt={data["login"]}
                src={data["avatar_url"]}
              />
            </div>
            <div className="teacher-introduce">
              <p className="name">{data["login"]}</p>
              <p className="description">{data["bio"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
