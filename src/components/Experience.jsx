import React from 'react';

const Experience = ({ data }) => {
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <section className="section experience-section">
      <h2 className="section-title">Experience</h2>
      <div className="experience-timeline">
        {data.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-date">
              {exp.startDate} - {exp.endDate || 'Present'}
            </div>
            <div className="experience-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              {exp.location && <p className="exp-location">{exp.location}</p>}
              <p className="exp-description">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="achievements">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;