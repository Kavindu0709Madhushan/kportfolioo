import React from 'react';

const Skills = ({ data }) => {
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <section className="section skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {data.categories && data.categories.map((category, idx) => (
          <div key={idx} className="skill-category">
            <h3>{category.name}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIdx) => (
                <span key={skillIdx} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;