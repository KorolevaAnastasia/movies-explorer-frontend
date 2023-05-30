import React from 'react';
import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import Timeline from "../Timeline/Timeline";

function AboutProject() {

  const aboutContents = [
    {
      subtitle: 'Дипломный проект включал 5 этапов',
      paragraph: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.'
    }, {
      subtitle: 'На выполнение диплома ушло 5 недель',
      paragraph: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'
    }
  ];

  return (
    <section className="about">
      <div className="about__container">
        <SectionTitle
          title='О проекте'
          modifier='about-margin'
        />
        <div className="about__content">
          {aboutContents.map((aboutContent, index) => (
            <div key={index} className="about__block">
              <h3 className="about__subtitle">{aboutContent.subtitle}</h3>
              <p className="about__paragraph">{aboutContent.paragraph}</p>
            </div>
          ))}
        </div>
        <Timeline />
      </div>
    </section>
  )
}

export default AboutProject;
