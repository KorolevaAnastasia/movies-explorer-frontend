import React from 'react';
import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {
  const techs = [
    {
      name: 'HTML'
    }, {
      name: 'CSS'
    }, {
      name: 'JS'
    }, {
      name: 'React'
    }, {
      name: 'Git'
    }, {
      name: 'Express.js'
    }, {
      name: 'mongoDB'
    }
  ];

  return (
    <section className="techs">
      <div className="techs__container">
          <SectionTitle
            title='Технологии'
            modifier='techs-margin'
          />
          <div className="techs__content">
            <h3 className="techs__subtitle">{techs.length} технологий</h3>
            <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="techs__stacks">
              {techs.map((tech, index) => (
                <span key={index} className="techs__stack">{tech.name}</span>
              ))}
            </div>
          </div>
      </div>
    </section>
  )
}

export default Techs;
