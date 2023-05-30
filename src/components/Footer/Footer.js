import React from 'react';
import "./Footer.css";

function Footer() {

  const links = [
    {
      title: "Яндекс.Практикум",
      url: "https://practicum.yandex.ru/",
    }, {
      title: "Github",
      url: "https://github.com/",
    }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__line"></div>
        <div className="footer__block">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <nav className="footer__links">
            {links.map((link, index) => (
              <a key={index} className="footer__link" target="_blank" href={link.url} rel="noreferrer">
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
