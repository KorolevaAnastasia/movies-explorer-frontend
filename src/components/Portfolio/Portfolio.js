import React from 'react';
import "./Portfolio.css";
import linkImg from '../../images/link.png';

function Portfolio() {

  const links = [
    {
      title: "Статичный сайт",
      url: "https://korolevaanastasia.github.io/how-to-learn/",
    }, {
      title: "Адаптивный сайт",
      url: "https://korolevaanastasia.github.io/russian-travel/",
    }, {
      title: "Одностраничное приложение",
      url: "https://mesto-akoroleva.nomoredomains.monster/sign-in",
    }

  ];

  return (
    <>
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__links">
          {links.map((link, index) => (
            <li key={index} className='portfolio__link-block'>
              <a className="portfolio__link" target="_blank" rel="noreferrer" href={link.url}>
                {link.title}
                <img alt="ссылка" src={linkImg}/>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Portfolio;
