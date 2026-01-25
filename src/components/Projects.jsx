import React from 'react';

const Projects = ({ data }) => {
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <section className="section projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {data.map((project) => (
          <div key={project.id} className="project-card">
            {project.image && (
              <img 
                src={project.image} 
                alt={project.name} 
                className="project-image"
              />
            )}
            <div className="project-content">
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              {project.technologies && (
                <div className="tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;