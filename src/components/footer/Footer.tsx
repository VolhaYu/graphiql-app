import React from 'react';
import './footer.scss';
import githubImg from '../../assets/github.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="githubs">
        <a href="https://github.com/VolhaYu">
          <img className="github-img" src={githubImg} alt="github" />
        </a>
        <a href="https://github.com/LanaVladi">
          <img className="github-img" src={githubImg} alt="github" />
        </a>
        <a href="https://github.com/vlboff">
          <img className="github-img" src={githubImg} alt="github" />
        </a>
      </div>
      <p className="year">2023</p>
      <a className="link-course" href="https://rs.school/react/">
        <img className="logo" src="https://rs.school/images/rs_school_js.svg" alt="logo" />
      </a>
    </footer>
  );
}

export default Footer;
