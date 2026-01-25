import { useParams, useNavigate } from "react-router-dom";
import { portfolioData } from '../data/portfolioData';
import { useEffect, useState } from 'react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle lightbox open
  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle lightbox close
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen]);
  
  const project = portfolioData.projects.find((p) => p.id === id);

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  if (!project) {
    return (
      <>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            background: #020617; 
            color: #f8fafc; 
          }
          .not-found {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .btn-back {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s;
          }
          .btn-back:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 50px rgba(99, 102, 241, 0.6);
          }
        `}</style>
        <div className="not-found">
          <div>
            <h2>Project not found</h2>
            <button onClick={() => navigate('/')} className="btn-back">
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --primary: #6366f1;
          --secondary: #8b5cf6;
          --accent: #ec4899;
          --dark: #0f172a;
          --darker: #020617;
          --light: #f8fafc;
          --gray: #64748b;
        }
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          background: var(--darker); 
          color: var(--light); 
          overflow-x: hidden; 
        }
        
        html { scroll-behavior: smooth; }

        .mesh-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(99, 102, 241, 0.2) 0px, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }
        
        @keyframes meshMove {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(20deg) brightness(1.2); }
        }

        .gradient-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.5;
          animation: orbFloat 25s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        
        .orb-1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%);
          top: -350px;
          right: -200px;
        }
        
        .orb-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent 70%);
          bottom: -300px;
          left: -150px;
          animation-delay: -8s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(150px, -150px) scale(1.2); }
          50% { transform: translate(50px, 100px) scale(0.8); }
          75% { transform: translate(-100px, -50px) scale(1.1); }
        }

        .grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 1;
          pointer-events: none;
        }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.5rem 5%;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          z-index: 1000;
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .back-btn {
          padding: 0.8rem 2rem;
          background: rgba(99, 102, 241, 0.2);
          border: 2px solid var(--primary);
          color: var(--light);
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .back-btn:hover {
          background: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }

        .project-container {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 8rem 2rem 4rem;
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .project-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          line-height: 1.2;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .image-gallery {
          margin-bottom: 3rem;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(99, 102, 241, 0.05);
          border: 2px solid rgba(99, 102, 241, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          aspect-ratio: 16/9;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--primary);
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
        }

        .gallery-item:hover img {
          transform: scale(1.1);
          filter: brightness(1.1);
        }

        /* Lightbox Styles */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          backdrop-filter: blur(10px);
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          animation: zoomIn 0.3s ease-out;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 10px;
          box-shadow: 0 25px 100px rgba(99, 102, 241, 0.5);
          border: 3px solid rgba(99, 102, 241, 0.3);
        }

        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(99, 102, 241, 0.2);
          border: 2px solid var(--primary);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          font-weight: 300;
        }

        .lightbox-close:hover {
          background: var(--primary);
          transform: rotate(90deg);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.6);
        }

        .project-content {
          background: rgba(99, 102, 241, 0.05);
          border: 2px solid rgba(99, 102, 241, 0.15);
          border-radius: 30px;
          padding: 3rem;
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
          animation: slideIn 0.8s ease-out 0.2s both;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-description {
          font-size: 1.15rem;
          line-height: 1.9;
          color: var(--gray);
          margin-bottom: 3rem;
        }

        .project-description ul {
          list-style: none;
          padding: 0;
        }

        .project-description li {
          padding: 0.8rem 0;
          padding-left: 2rem;
          position: relative;
          color: var(--gray);
        }

        .project-description li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--primary);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }

        .tech-badge {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          animation: popIn 0.5s ease-out both;
        }
        
        .tech-badge:nth-child(1) { animation-delay: 0.1s; }
        .tech-badge:nth-child(2) { animation-delay: 0.2s; }
        .tech-badge:nth-child(3) { animation-delay: 0.3s; }
        .tech-badge:nth-child(4) { animation-delay: 0.4s; }
        .tech-badge:nth-child(5) { animation-delay: 0.5s; }
        .tech-badge:nth-child(n+6) { animation-delay: 0.6s; }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .tech-badge:hover {
          transform: translateY(-3px) scale(1.05);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .details-section {
          background: rgba(139, 92, 246, 0.05);
          border: 2px solid rgba(139, 92, 246, 0.15);
          border-radius: 20px;
          padding: 2.5rem;
          animation: slideIn 0.8s ease-out 0.4s both;
        }

        footer {
          text-align: center;
          padding: 3rem;
          background: rgba(15, 23, 42, 0.8);
          color: var(--gray);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .project-title {
            font-size: 2.5rem;
          }
          
          .project-content {
            padding: 2rem;
          }
          
          .project-container {
            padding: 6rem 1.5rem 3rem;
          }
          
          .tech-badge {
            font-size: 0.85rem;
            padding: 0.6rem 1.2rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .lightbox-close {
            top: 10px;
            right: 10px;
          }

          .lightbox-content {
            max-width: 95%;
          }
        }
      `}</style>

      <div className="mesh-gradient"></div>
      <div className="grid-overlay"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Full size view" 
              className="lightbox-image"
            />
          </div>
        </div>
      )}

      <nav>
        <div className="nav-container">
          <div className="logo">{getInitials(portfolioData.profile.name)}</div>
          <button onClick={() => navigate('/')} className="back-btn">
            <span>←</span> Back to Portfolio
          </button>
        </div>
      </nav>

      <div className="project-container">
        <div className="project-header">
          <h1 className="project-title">{project.name}</h1>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="image-gallery">
            <div className="gallery-grid">
              {project.images.map((img, i) => (
                <div 
                  key={i} 
                  className="gallery-item"
                  onClick={() => openLightbox(img)}
                >
                  <img src={img} alt={`${project.name} screenshot ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="project-content">
          <div className="section-title">
            📋 Project Overview
          </div>
          <p className="project-description">{project.description}</p>

          <div className="details-section">
            <div className="section-title">
              📖 Detailed Description
            </div>
            <p className="project-description">{project.details}</p>
            
            {project.features && project.features.length > 0 && (
              <>
                <div className="section-title">
                  ✨ Features
                </div>
                <div className="project-description">
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="project-content">
          <div className="section-title">
            🛠️ Technologies Used
          </div>
          
          {project.ftech && project.ftech.length > 0 && (
            <>
              <div className="section-subtitle">
                Frontend Technologies
              </div>
              <div className="tech-grid">
                {project.ftech.map((t, i) => (
                  <div key={i} className="tech-badge">
                    {t}
                  </div>
                ))}
              </div>
              <br/>
            </>
          )}
          
          {project.btech && project.btech.length > 0 && (
            <>
              <div className="section-subtitle">
                Backend Technologies
              </div>
              <div className="tech-grid">
                {project.btech.map((t, i) => (
                  <div key={i} className="tech-badge">
                    {t}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <footer>
        <p>&copy; {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ProjectDetails;