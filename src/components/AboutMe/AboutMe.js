import React from 'react';
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import photo from '../../images/photo.jpg';
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {

  const links = [
    {
      title: "Github",
      url: "https://github.com/KorolevaAnastasia",
    }
  ];

  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <SectionTitle
          title='Студент'
          modifier='student-margin'
        />
        <div className="about-me__content">
          <img className="about-me__photo" alt='Мое фото' src={photo}/>
          <div className="about-me__block">
            <div className="student">
              <h3 className="student__title">Анастасия</h3>
              <p className="student__subtitle">Вэб-разработчик, 29 лет</p>
              <p className="student__description">Живу в Люберцах. Более 5 лет работаю Backend-программистом. Пришла на курс, чтобы расширить свои знания и возможности.</p>
            </div>
            <div className="student-links">
              {links.map((link, index) => (
                <a key={index} className="student-link" target="_blank" rel="noreferrer" href={link.url}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Portfolio/>
    </section>
  )
}

export default AboutMe;
