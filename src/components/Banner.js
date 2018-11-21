import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import "./Banner.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: "relative",
    marginTop: "0"
  },
  slide: {
    paddingTop: 65,
    minHeight: 240,
    backgroundColor: "#eee"
  }
};

const bannerItems = [
  {
    content: {
      sub: "똑똑하게 구독하자!",
      body: "실력있는 개발자가 되고 싶다면,\n다같이 야보자!"
    }
  },
  {
    content: {
      sub: "시간낭비는 이제 그만!",
      body: "관심있는 글만 모아서,\n다같이 야보자!"
    }
  },
  {
    content: {
      sub: "쉽고, 재미있고, 간편하게!",
      body: "남는 시간에,\n다같이 야보자!"
    }
  }
];

class Banner extends React.Component {
  state = {
    index: 0
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div className="main-banner" style={styles.root}>
        <AutoPlaySwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {bannerItems.map((item, index) => {
            return (
              <div
                key={item["content"]["sub"]}
                className={"item item" + String(index)}
                style={Object.assign({}, styles.slide)}
              >
                <div className="content">
                  <span className="text">{item["content"]["sub"]}</span>
                  <div className="body">
                    {item["content"]["body"].split("\n").map(line => {
                      return (
                        <div key={line}>
                          {line}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </AutoPlaySwipeableViews>
      </div>
    );
  }
}

export default Banner;
