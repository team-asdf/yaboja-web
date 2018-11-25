import React, { Component } from "react";
import Select, { createFilter } from "react-select";

import { AuthConsumer } from "../contexts/AuthContext";

import { languages } from "../consts/lang";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      selected: [],
      findKey: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnUpdateKeyword = this.handleOnUpdateKeyword.bind(this);
  }

  componentDidMount() {
    const userkey = this.props.profile["keyword"][0]["keyword"]
      .split(",")
      .map(k => k.toLowerCase());

    const selected = languages.filter(lang => {
      return userkey.indexOf(lang["name"].toLowerCase()) !== -1;
    });

    this.setState({
      selected: selected,
      init: true
    });
  }

  handleChange(newValue, actionMeta) {
    this.setState({ select: newValue });
  }

  handleOnUpdateKeyword(e) {
    let selected = this.state.select;
    e.preventDefault();
    this.props.updateKeywod(selected.map(t => t["name"]).join(","));
  }

  render() {
    const { init, selected } = this.state;

    return (
      <section id="login">
        <div className="col login-wrapper">
          <form onSubmit={this.handleOnUpdateKeyword}>
            <div className="row">
              <div className="login-title">
                <h3>
                  더 <b>정확한</b> 글을
                </h3>
                <h3>추천해드리고 싶어요!</h3>
                <div className="desc">
                  <p>
                    <span className="ic-right">
                      회원님의 깃허브 프로필을 분석해 추출한 언어입니다.
                    </span>
                    <br />
                    <span className="ic-right">
                      최대 10개의 관심 기술을 선택해주세요!
                    </span>
                  </p>
                </div>
                {init ? (
                  <Select
                    onChange={this.handleChange}
                    defaultValue={selected}
                    className="multiselect"
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        color: "black"
                      })
                    }}
                    filterOption={createFilter({
                      ignoreCase: true
                    })}
                    isMulti
                    placeholder="관심기술을 선택해주세요!"
                    options={languages}
                  />
                ) : (
                  ""
                )}
              </div>
              <h1>kk</h1>
            </div>
            <div className="row submit">
              <button className="btn btn-disabled" type="submit" disabled="">
                <span>저장하기</span>
              </button>
            </div>
          </form>
        </div>
        <div className="image-view" />
      </section>
    );
  }
}

const SettingContainer = () => (
  <AuthConsumer>
    {({ state, actions }) => (
      <Setting
        profile={state.profile}
        login={actions.login}
        verify={actions.verify}
        select={actions.select}
        updateKeywod={actions.updateKeywod}
      />
    )}
  </AuthConsumer>
);

export default SettingContainer;

//  {/* <div className="input-login-group">
//                 <div className="input-group">
//                   <label>관심기술</label>
//                   <input
//                     id="login-username"
//                     onChange={this.handleOnChange}
//                     type="text"
//                     placeholder="관심 기술"
//                     required=""
//                     className=""
//                   />
//                 </div>
//               </div> */}
