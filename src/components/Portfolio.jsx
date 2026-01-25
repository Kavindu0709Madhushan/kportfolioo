import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

// Remove the portfolioData object from the component

const Portfolio = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const phrases = [
    "Building robust web applications",
    "Creating beautiful user interfaces",
    "Developing scalable solutions",
    "Passionate about clean code"
  ];


  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && charIndex < currentPhrase.length) {
        setTypingText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100);
      
      const sections = ['home', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          const skillCards = entry.target.querySelectorAll('.skill-card');
          const projectCards = entry.target.querySelectorAll('.project-card');
          const contactItems = entry.target.querySelectorAll('.contact-item');
          
          skillCards.forEach(card => card.classList.add('animate'));
          projectCards.forEach(card => card.classList.add('animate'));
          contactItems.forEach(item => item.classList.add('animate'));
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --primary: #6366f1; --secondary: #8b5cf6; --accent: #ec4899;
          --dark: #0f172a; --darker: #020617; --light: #f8fafc; --gray: #64748b;
        }
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          background: var(--darker); 
          color: var(--light); 
          overflow-x: hidden; 
        }
        html { scroll-behavior: smooth; }

        .mesh-gradient {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
          background: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(99, 102, 241, 0.2) 0px, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }
        @keyframes meshMove { 0%, 100% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(20deg) brightness(1.2); } }

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
          width: 700px; height: 700px; 
          background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%); 
          top: -350px; right: -200px; 
        }
        .orb-2 { 
          width: 600px; height: 600px; 
          background: radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent 70%); 
          bottom: -300px; left: -150px; 
          animation-delay: -8s; 
        }
        .orb-3 { 
          width: 500px; height: 500px; 
          background: radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent 70%); 
          top: 40%; left: 60%; 
          animation-delay: -15s; 
        }
        @keyframes orbFloat { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          25% { transform: translate(150px, -150px) scale(1.2); } 
          50% { transform: translate(50px, 100px) scale(0.8); } 
          75% { transform: translate(-100px, -50px) scale(1.1); } 
        }

        .grid-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background-image: linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px); 
          background-size: 50px 50px; 
          z-index: 1; 
          pointer-events: none; 
        }

        .scroll-indicator { 
          position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 100; 
        }
        .mouse-wheel { 
          width: 30px; height: 50px; border: 2px solid var(--primary); border-radius: 15px; 
          display: flex; align-items: flex-start; justify-content: center; 
          animation: wheelScroll 1.5s infinite; 
        }
        .wheel { 
          width: 3px; height: 8px; background: var(--primary); border-radius: 2px; 
          margin-top: 8px; animation: wheelMove 1.5s infinite; 
        }
        @keyframes wheelScroll { 0%, 100% { opacity: 1; } 80% { opacity: 0.3; } }
        @keyframes wheelMove { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(15px); opacity: 0; } }

        nav { 
          position: fixed; top: 0; width: 100%; padding: 1.5rem 5%; 
          background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(20px); 
          z-index: 1000; border-bottom: 1px solid rgba(99, 102, 241, 0.1); 
          transition: all 0.3s; 
        }
        nav.scrolled { 
          background: rgba(15, 23, 42, 0.95); 
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); 
          padding: 1rem 5%; 
        }
        .nav-container { 
          max-width: 1200px; margin: 0 auto; 
          display: flex; justify-content: space-between; align-items: center; 
        }
        .logo { 
          font-size: 1.8rem; font-weight: 800; 
          background: linear-gradient(135deg, var(--primary), var(--accent)); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          animation: logoGlow 3s ease-in-out infinite; 
        }
        @keyframes logoGlow { 
          0%, 100% { filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0)); } 
          50% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5)); } 
        }
        .nav-menu { 
          display: flex; list-style: none; gap: 2.5rem; 
        }
        .nav-menu a { 
          color: var(--light); text-decoration: none; font-weight: 500; 
          transition: all 0.3s; position: relative; cursor: pointer;
        }
        .nav-menu a::before { 
          content: ''; position: absolute; bottom: -5px; left: 0; width: 0; 
          height: 2px; background: var(--primary); transition: width 0.3s; 
        }
        .nav-menu a:hover::before, .nav-menu a.active::before { width: 100%; }
        .nav-menu a:hover, .nav-menu a.active { color: var(--primary); }
        .admin-btn { 
          padding: 0.6rem 1.2rem; background: rgba(99, 102, 241, 0.2); 
          border: 1px solid var(--primary); border-radius: 25px; 
          font-size: 0.85rem; transition: all 0.3s; cursor: pointer;
        }
        .admin-btn:hover { 
          background: var(--primary); transform: scale(1.05); 
        }

        .hero { 
          min-height: 100vh; display: flex; align-items: center; justify-content: center; 
          position: relative; padding: 2rem; z-index: 2; overflow: hidden; 
        }
        .hero::before { 
          content: ''; position: absolute; width: 400px; height: 400px; 
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent); 
          border-radius: 50%; top: 20%; left: 10%; 
          animation: floatBg 8s ease-in-out infinite; 
        }
        @keyframes floatBg { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(50px, 50px) scale(1.1); } 
        }
        
        .hero-content { 
          text-align: center; z-index: 10; 
          opacity: 0; animation: fadeInUp 1.2s forwards 0.3s; 
          max-width: 900px; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(50px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        .profile-photo { 
          width: 180px; height: 180px; border-radius: 50%; 
          margin: 50px auto 2rem; overflow: hidden; 
          border: 4px solid rgba(99, 102, 241, 0.5); 
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4); 
          animation: photoFloat 3s ease-in-out infinite; 
        }
        @keyframes photoFloat { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
        }
        .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
        .profile-placeholder { 
          width: 100%; height: 100%; 
          background: linear-gradient(135deg, var(--primary), var(--accent)); 
          display: flex; align-items: center; justify-content: center; 
          font-size: 4rem; font-weight: bold; 
        }

        .hero h1 { 
          font-size: 4.5rem; margin-bottom: 1rem; 
          background: linear-gradient(135deg, #fff, var(--primary), var(--accent)); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          background-size: 200% auto; 
          animation: shimmer 3s linear infinite, titleBounce 2s ease-in-out infinite; 
          font-weight: 900; letter-spacing: -2px; 
        }
        @keyframes shimmer { 
          0% { background-position: 0% center; } 
          100% { background-position: 200% center; } 
        }
        @keyframes titleBounce { 
          0%, 100% { letter-spacing: -2px; } 
          50% { letter-spacing: 0px; } 
        }
        .hero .subtitle { 
          font-size: 1.6rem; color: var(--gray); margin-bottom: 1.5rem; 
          font-weight: 300; animation: slideInLeft 1s ease-out 0.5s both; 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        .typing { 
          font-size: 1.3rem; color: var(--primary); min-height: 40px; 
          font-weight: 500; margin-bottom: 1rem; 
          animation: slideInRight 1s ease-out 0.7s both; 
        }
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        .typing::after { 
          content: '|'; animation: blink 1s infinite; 
        }
        @keyframes blink { 
          0%, 50% { opacity: 1; } 
          51%, 100% { opacity: 0; } 
        }
        .hero p { 
          max-width: 700px; margin: 2rem auto; line-height: 1.9; 
          color: var(--gray); font-size: 1.1rem; 
          animation: fadeIn 1s ease-out 0.9s both; 
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .btn { 
          display: inline-block; padding: 1.2rem 3rem; 
          background: linear-gradient(135deg, var(--primary), var(--secondary)); 
          color: white; text-decoration: none; border-radius: 50px; 
          transition: all 0.4s; margin: 0.5rem; 
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4); 
          font-weight: 600; position: relative; overflow: hidden; 
          cursor: pointer; border: none; font-size: 1rem;
        }
        .btn::before { 
          content: ''; position: absolute; top: 0; left: -100%; 
          width: 100%; height: 100%; 
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent); 
          transition: left 0.6s; 
        }
        .btn:hover::before { left: 100%; }
        .btn:hover { 
          transform: translateY(-5px) scale(1.05); 
          box-shadow: 0 15px 50px rgba(99, 102, 241, 0.6); 
        }
        .btn-outline { 
          background: transparent; border: 2px solid var(--primary); 
        }
        .btn-outline:hover { 
          background: linear-gradient(135deg, var(--primary), var(--secondary)); 
        }

        section { 
          padding: 6rem 5%; max-width: 1400px; margin: 0 auto; 
          position: relative; z-index: 2; 
          opacity: 0; transform: translateY(60px); 
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); 
        }
        section.visible { opacity: 1; transform: translateY(0); }
        
        h2 { 
          font-size: 3rem; text-align: center; margin-bottom: 4rem; 
          font-weight: 800; 
          background: linear-gradient(135deg, var(--light), var(--primary)); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          position: relative; 
        }
        h2::after { 
          content: ''; position: absolute; width: 100px; height: 4px; 
          background: linear-gradient(90deg, var(--primary), var(--accent)); 
          bottom: -20px; left: 50%; transform: translateX(-50%); 
          border-radius: 2px; animation: expandWidth 0.8s ease-out; 
        }
        @keyframes expandWidth { from { width: 0; } to { width: 100px; } }

        .skills-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); 
          gap: 2rem; 
        }
        .skill-card { 
          background: rgba(99, 102, 241, 0.05); padding: 2.5rem 1.5rem; 
          border-radius: 20px; text-align: center; 
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); 
          border: 2px solid rgba(99, 102, 241, 0.1); 
          backdrop-filter: blur(10px); 
          opacity: 0; transform: scale(0.5) rotateY(-90deg); 
        }
        .skill-card.animate { 
          animation: popIn 0.6s ease-out both; 
        }
        .skill-card.animate:nth-child(1) { animation-delay: 0.1s; }
        .skill-card.animate:nth-child(2) { animation-delay: 0.2s; }
        .skill-card.animate:nth-child(3) { animation-delay: 0.3s; }
        .skill-card.animate:nth-child(4) { animation-delay: 0.4s; }
        .skill-card.animate:nth-child(n+5) { animation-delay: 0.5s; }
        @keyframes popIn { 
          from { opacity: 0; transform: scale(0.5) rotateY(-90deg); } 
          to { opacity: 1; transform: scale(1) rotateY(0); } 
        }
        .skill-card:hover { 
          transform: translateY(-15px) scale(1.08) rotateZ(2deg); 
          background: rgba(99, 102, 241, 0.15); 
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4); 
          border-color: rgba(99, 102, 241, 0.5); 
        }
        .skill-card h3 { font-size: 1.15rem; font-weight: 600; }

        .projects-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
          gap: 2.5rem; 
        }
        .project-card { 
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08)); 
          border-radius: 25px; padding: 2.5rem; 
          border: 2px solid rgba(99, 102, 241, 0.15); 
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
          backdrop-filter: blur(10px); position: relative; overflow: hidden; 
          opacity: 0; transform: translateX(-100px) rotateY(-45deg); 
        }
        .project-card.animate { 
          animation: slideInProject 0.7s ease-out both; 
        }
        .project-card::before { 
          content: ''; position: absolute; top: -50%; left: -50%; 
          width: 200%; height: 200%; 
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent); 
          animation: projectShine 3s infinite; 
        }
        @keyframes projectShine { 
          0%, 100% { transform: translate(0, 0); } 
          50% { transform: translate(50px, 50px); } 
        }
        .project-card.animate:nth-child(1) { animation-delay: 0.2s; }
        .project-card.animate:nth-child(2) { animation-delay: 0.4s; }
        .project-card.animate:nth-child(3) { animation-delay: 0.6s; }
        @keyframes slideInProject { 
          from { opacity: 0; transform: translateX(-100px) rotateY(-45deg); } 
          to { opacity: 1; transform: translateX(0) rotateY(0); } 
        }
        .project-card:hover { 
          transform: translateY(-20px) scale(1.02) perspective(1000px) rotateX(5deg); 
          box-shadow: 0 30px 80px rgba(99, 102, 241, 0.5); 
          border-color: rgba(99, 102, 241, 0.5); 
        }
        .project-card h3 { 
          font-size: 1.8rem; margin-bottom: 1.2rem; 
          background: linear-gradient(135deg, var(--primary), var(--accent)); 
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          font-weight: 700; position: relative; z-index: 1; 
        }
        .project-card p { 
          color: var(--gray); line-height: 1.8; font-size: 1.05rem; 
          position: relative; z-index: 1; 
        }

        .contact { text-align: center; }
        .contact-info { 
          display: flex; justify-content: center; gap: 3rem; 
          flex-wrap: wrap; margin-top: 3rem; 
        }
        .contact-item { 
          background: rgba(99, 102, 241, 0.08); padding: 2.5rem; 
          border-radius: 25px; border: 2px solid rgba(99, 102, 241, 0.15); 
          min-width: 250px; backdrop-filter: blur(10px); 
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); 
          opacity: 0; transform: translateY(100px); 
        }
        .contact-item.animate { 
          animation: slideInContact 0.7s ease-out both; 
        }
        .contact-item.animate:nth-child(1) { animation-delay: 0.2s; }
        .contact-item.animate:nth-child(2) { animation-delay: 0.4s; }
        .contact-item.animate:nth-child(3) { animation-delay: 0.6s; }
        @keyframes slideInContact { 
          from { opacity: 0; transform: translateY(100px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .contact-item:hover { 
          transform: scale(1.1) translateY(-10px) rotateY(5deg); 
          background: rgba(99, 102, 241, 0.15); 
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4); 
        }
        .contact-item .icon { 
          font-size: 2.5rem; margin-bottom: 0.5rem; 
          animation: bounce 2s infinite; 
        }
        .contact-item:nth-child(1) .icon { animation-delay: 0s; }
        .contact-item:nth-child(2) .icon { animation-delay: 0.2s; }
        .contact-item:nth-child(3) .icon { animation-delay: 0.4s; }
        @keyframes bounce { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        .contact-item h3 { margin-top: 1rem; font-weight: 600; }
        .contact-item p { color: var(--gray); margin-top: 0.5rem; }

        footer { 
          text-align: center; padding: 3rem; 
          background: rgba(15, 23, 42, 0.8); color: var(--gray); 
          border-top: 1px solid rgba(99, 102, 241, 0.1); 
          position: relative; z-index: 2; 
          animation: slideUp 0.8s ease-out; 
        }
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(50px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        .mobile-toggle { 
          display: none; flex-direction: column; gap: 6px; 
          cursor: pointer; background: none; border: none; 
        }
        .mobile-toggle span { 
          width: 28px; height: 3px; background: var(--light); 
          border-radius: 2px; transition: 0.3s; 
        }

        @media (max-width: 768px) {
          .mobile-toggle { display: flex; }
          .nav-menu { 
            position: absolute; top: 100%; left: 0; width: 100%; 
            background: rgba(15, 23, 42, 0.98); flex-direction: column; 
            padding: 2rem; transform: translateY(-100%); opacity: 0; 
            pointer-events: none; transition: 0.3s; 
          }
          .nav-menu.active { 
            transform: translateY(0); opacity: 1; pointer-events: all; 
          }
          .hero h1 { font-size: 2.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .scroll-indicator { display: none; }
        }
      `}</style>

      <div className="mesh-gradient"></div>
      <div className="grid-overlay"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="scroll-indicator">
        <div className="mouse-wheel">
          <div className="wheel"></div>
        </div>
      </div>

      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
         
          <div className="logo">{getInitials(portfolioData.profile.name)}</div>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            {['home', 'skills', 'projects', 'contact'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  className={activeSection === section ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <a className="admin-btn" onClick={() => setShowAdmin(!showAdmin)}>
                ⚙️ Admin
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="profile-photo">
            {portfolioData.profile.photo ? (
              <img src={portfolioData.profile.photo} alt={portfolioData.profile.name} />
            ) : (
              <div className="profile-placeholder">
                {getInitials(portfolioData.profile.name)}
              </div>
            )}
          </div>
          <h1>{portfolioData.profile.name}</h1>
          <div className="subtitle">{portfolioData.profile.title}</div>
          <div className="typing">{typingText}</div>
          <p>{portfolioData.profile.bio}</p>
          <a href="#projects" className="btn">View Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>
      </section>

      <section id="skills">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {portfolioData.skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id}
              className="project-card"
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{cursor: "pointer"}}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <div className="contact-item">
            <div className="icon">📱</div>
            <h3>Phone</h3>
            <p>{portfolioData.profile.phone}</p>
          </div>
          <div className="contact-item">
            <div className="icon">✉️</div>
            <h3>Email</h3>
            <p>{portfolioData.profile.email}</p>
          </div>
          <div className="contact-item">
            <div className="icon">📍</div>
            <h3>Location</h3>
            <p>{portfolioData.profile.location}</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.</p>
      </footer>
    </>
  );
};

export default  Portfolio;