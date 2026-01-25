import React from 'react';

const Contact = ({ data }) => {
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <section className="section contact-section">
      <h2 className="section-title">Contact</h2>
      <div className="contact-content">
        <div className="contact-info">
          {data.email && (
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
          )}
          {data.phone && (
            <div className="contact-item">
              <span className="contact-label">Phone:</span>
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </div>
          )}
        </div>
        
        {data.social && (
          <div className="social-links">
            <h3>Connect with me</h3>
            <div className="social-grid">
              {data.social.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {data.social.github && (
                <a href={data.social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {data.social.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              )}
              {data.social.portfolio && (
                <a href={data.social.portfolio} target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;