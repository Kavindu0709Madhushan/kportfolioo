import React from 'react';

const AboutMe = ({ data }) => {
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <section className="section about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        {data.image && (
          <img 
            src={data.image} 
            alt={data.name} 
            className="profile-image"
          />
        )}
        <div className="about-text">
          <h3>{data.name}</h3>
          <p className="title">{data.title}</p>
          <p className="bio">{data.bio}</p>
          {data.location && <p className="location">📍 {data.location}</p>}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;