import React, { Component } from "react";
import Select, { createFilter } from "react-select";
import qwest from "qwest";

import { api } from "../consts/apis";
import { languages } from "../consts/lang";

const data = [
  {
    id: 1,
    name: "A# .NET",
    popular: "false"
  },
  {
    id: 2,
    name: "A# (Axiom)",
    popular: "false"
  },
  {
    id: 3,
    name: "A-0 System",
    popular: "false"
  },
  {
    id: 4,
    name: "A+",
    popular: "false"
  },
  {
    id: 5,
    name: "A++",
    popular: "false"
  },
  {
    id: 6,
    name: "ABAP",
    popular: "false"
  },
  {
    id: 7,
    name: "ABC",
    popular: "false"
  },
  {
    id: 8,
    name: "ABC ALGOL",
    popular: "false"
  },
  {
    id: 9,
    name: "ABSET",
    popular: "false"
  },
  {
    id: 10,
    name: "ABSYS",
    popular: "false"
  },
  {
    id: 11,
    name: "ACC",
    popular: "false"
  },
  {
    id: 12,
    name: "Accent",
    popular: "false"
  },
  {
    id: 13,
    name: "Ace DASL",
    popular: "false"
  },
  {
    id: 14,
    name: "ACL2",
    popular: "false"
  },
  {
    id: 15,
    name: "ACT-III",
    popular: "false"
  },
  {
    id: 16,
    name: "Action!",
    popular: "false"
  },
  {
    id: 17,
    name: "ActionScript",
    popular: "false"
  },
  {
    id: 18,
    name: "Actor",
    popular: "false"
  },
  {
    id: 19,
    name: "Ada",
    popular: "false"
  },
  {
    id: 20,
    name: "Adenine",
    popular: "false"
  },
  {
    id: 21,
    name: "Agda",
    popular: "false"
  },
  {
    id: 22,
    name: "Agilent VEE",
    popular: "false"
  },
  {
    id: 23,
    name: "Agora",
    popular: "false"
  },
  {
    id: 24,
    name: "AIMMS",
    popular: "false"
  },
  {
    id: 25,
    name: "Aldor",
    popular: "false"
  },
  {
    id: 26,
    name: "Alef",
    popular: "false"
  },
  {
    id: 27,
    name: "ALF",
    popular: "false"
  },
  {
    id: 28,
    name: "ALGOL 58",
    popular: "false"
  },
  {
    id: 29,
    name: "ALGOL 60",
    popular: "false"
  },
  {
    id: 30,
    name: "ALGOL 68",
    popular: "false"
  },
  {
    id: 31,
    name: "ALGOL W",
    popular: "false"
  },
  {
    id: 32,
    name: "Alice",
    popular: "false"
  },
  {
    id: 33,
    name: "Alma-0",
    popular: "false"
  },
  {
    id: 34,
    name: "AmbientTalk",
    popular: "false"
  },
  {
    id: 35,
    name: "Amiga E",
    popular: "false"
  },
  {
    id: 36,
    name: "AMOS",
    popular: "false"
  },
  {
    id: 37,
    name: "AMPL",
    popular: "false"
  },
  {
    id: 38,
    name: "AngelScript",
    popular: "false"
  },
  {
    id: 39,
    name: "Apex",
    popular: "false"
  },
  {
    id: 40,
    name: "APL",
    popular: "false"
  },
  {
    id: 41,
    name: "App Inventor for Android's visual block language",
    popular: "false"
  },
  {
    id: 42,
    name: "AppleScript",
    popular: "false"
  },
  {
    id: 43,
    name: "APT",
    popular: "false"
  },
  {
    id: 44,
    name: "Arc",
    popular: "false"
  },
  {
    id: 45,
    name: "ARexx",
    popular: "false"
  },
  {
    id: 46,
    name: "Argus",
    popular: "false"
  },
  {
    id: 47,
    name: "AspectJ",
    popular: "false"
  },
  {
    id: 48,
    name: "Assembly language",
    popular: "false"
  },
  {
    id: 49,
    name: "ATS",
    popular: "false"
  },
  {
    id: 50,
    name: "Ateji PX",
    popular: "false"
  },
  {
    id: 51,
    name: "AutoHotkey",
    popular: "false"
  },
  {
    id: 52,
    name: "Autocoder",
    popular: "false"
  },
  {
    id: 53,
    name: "AutoIt",
    popular: "false"
  },
  {
    id: 54,
    name: "AutoLISP / Visual LISP",
    popular: "false"
  },
  {
    id: 55,
    name: "Averest",
    popular: "false"
  },
  {
    id: 56,
    name: "AWK",
    popular: "false"
  },
  {
    id: 57,
    name: "Axum",
    popular: "false"
  },
  {
    id: 58,
    name: "Active Server Pages",
    popular: "false"
  },
  {
    id: 59,
    name: "C",
    popular: "true"
  },
  {
    id: 60,
    name: "C--",
    popular: "false"
  },
  {
    id: 61,
    name: "C++",
    popular: "true"
  },
  {
    id: 62,
    name: "C*",
    popular: "false"
  },
  {
    id: 63,
    name: "C#",
    popular: "true"
  },
  {
    id: 64,
    name: "C/AL",
    popular: "false"
  },
  {
    id: 65,
    name: "Caché ObjectScript",
    popular: "false"
  },
  {
    id: 66,
    name: "C Shell (csh)",
    popular: "false"
  },
  {
    id: 67,
    name: "Caml",
    popular: "false"
  },
  {
    id: 68,
    name: "Cayenne",
    popular: "false"
  },
  {
    id: 69,
    name: "CDuce",
    popular: "false"
  },
  {
    id: 70,
    name: "Cecil",
    popular: "false"
  },
  {
    id: 71,
    name: "Cesil",
    popular: "false"
  },
  {
    id: 72,
    name: "Céu",
    popular: "false"
  },
  {
    id: 73,
    name: "Ceylon",
    popular: "false"
  },
  {
    id: 74,
    name: "CFEngine",
    popular: "false"
  },
  {
    id: 75,
    name: "Cg",
    popular: "false"
  },
  {
    id: 76,
    name: "Ch",
    popular: "false"
  },
  {
    id: 77,
    name: "Chapel",
    popular: "false"
  }
];

class Setting extends Component {
  state = {
    keyword: [],
    findKey: ""
  };

  componentDidMount() {
    console.log(api.LANGUAGES);
    // qwest.get(api.LANGUAGES).then(response => {
    //   console.log(response);
    // });
    // this.setState({ keyword: data });
  }

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <section id="login">
        <div className="col login-wrapper">
          <form onSubmit={this.handleOnVerifiy}>
            <div className="row">
              <div className="login-title">
                <h3>
                  더 <b>정확한</b> 글을
                </h3>
                <h3>추천해드리고 싶어요!</h3>
                <div className="desc">
                  <p>
                    <span className="ic-right">
                      최대 10개의 관심 기술을 선택해주세요!{" "}
                    </span>
                  </p>
                </div>
              </div>
              <Select
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: "black"
                  })
                }}
                filterOption={createFilter({
                  ignoreCase: true
                })}
                // defaultValue={}
                isMulti
                placeholder="관심기술을 선택해주세요!"
                options={languages.map(d => {
                  d["label"] = d["name"];
                  d["value"] = d["name"];
                  return d;
                })}
              />
              {/* <div className="input-login-group">
                <div className="input-group">
                  <label>관심기술</label>
                  <input
                    id="login-username"
                    onChange={this.handleOnChange}
                    type="text"
                    placeholder="관심 기술"
                    required=""
                    className=""
                  />
                </div>
              </div> */}
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

export default Setting;
