import React, { Component } from "react";
import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { select: false };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.onClick(e);
    console.log(1);
    this.setState(({ select }) => ({ select: !select }));
  }

  render() {
    const { data } = this.props;
    const { select } = this.state;

    console.log(select);

    return (
      <div onClick={this.handleOnClick}>
        <div className="cl-teacher">
          <div
            className={"cl-teacher-wrapper " + (select ? "select-profile" : "")}
          >
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
  }
}

export default Profile;
