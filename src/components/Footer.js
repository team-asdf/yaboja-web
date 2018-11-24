import React from "react";
const Footer = () => {
  return (
    <footer>
      <div className="col">
        <ul>
          <li>
            <span>다같이 야보자!</span>
          </li>
          <li>
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              alt="오픈소스 라이선스"
            >
              오픈소스 라이선스
            </a>
          </li>
          <li>
            <a
              href="https://github.com/team-asdf"
              target="_blank"
              rel="noopener noreferrer"
              alt="깃허브"
            >
              깃허브
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
