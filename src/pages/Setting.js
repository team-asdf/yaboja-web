import React, { Component } from "react";
import Select, { createFilter } from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qwest from "qwest";

import { AuthConsumer } from "../contexts/AuthContext";
import { api } from "../consts/apis";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      selected: [],
      findKey: "",
      languages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnUpdateKeyword = this.handleOnUpdateKeyword.bind(this);
  }

  componentDidMount() {
    const userkey = this.props.profile["keyword"][0]["keyword"]
      .split(",")
      .map(k => k.toLowerCase());

    qwest
      .get(api.LANGUAGES)
      .then(response => JSON.parse(response["response"]))
      .then(response =>
        response.map(d => {
          d["label"] = d["name"];
          d["value"] = d["name"];
          return d;
        })
      )
      .then(response => {
        const selected = response.filter(lang => {
          return userkey.indexOf(lang["name"].toLowerCase()) !== -1;
        });

        this.setState({
          languages: response,
          selected: selected,
          init: true
        });
      });
  }

  handleChange(newValue, actionMeta) {
    this.setState({ selected: newValue });
  }

  handleOnUpdateKeyword(e) {
    let selected = this.state.selected;
    e.preventDefault();
    // console.log(1);
    this.props.updateKeywod(selected.map(t => t["name"]).join(","));
    toast.success("😎 저장되었습니다!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  }

  render() {
    const { init, selected, languages } = this.state;

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
            </div>
            <br />
            <div className="row submit">
              <button className="btn btn-key" type="submit">
                <span>저장하기</span>
              </button>
            </div>
          </form>
        </div>
        <div className="image-view" />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover={false}
        />
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
