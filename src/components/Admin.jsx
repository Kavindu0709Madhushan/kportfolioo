import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

const Admin = ({ onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [aboutData, setAboutData] = useState({});
  const [skillsData, setSkillsData] = useState({ categories: [] });
  const [projectsData, setProjectsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [contactData, setContactData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await portfolioAPI.getAllData();
      setAboutData(data.aboutMe || {});
      setSkillsData(data.skills || { categories: [] });
      setProjectsData(data.projects || []);
      setExperienceData(data.experience || []);
      setContactData(data.contact || {});
    } catch (error) {
      showMessage('Error loading data', 'error');
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'about') {
        await portfolioAPI.updateAboutMe(aboutData);
      } else if (activeTab === 'skills') {
        await portfolioAPI.updateSkills(skillsData);
      } else if (activeTab === 'contact') {
        await portfolioAPI.updateContact(contactData);
      }
      
      showMessage('Saved successfully!', 'success');
      onUpdate();
    } catch (error) {
      showMessage('Error saving data: ' + error.message, 'error');
    }
    setSaving(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {message && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-tabs">
        {['about', 'skills', 'projects', 'experience', 'contact'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'about' && (
          <div className="form-section">
            <h2>About Me</h2>
            <input
              type="text"
              placeholder="Name"
              value={aboutData.name || ''}
              onChange={e => setAboutData({...aboutData, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Title"
              value={aboutData.title || ''}
              onChange={e => setAboutData({...aboutData, title: e.target.value})}
            />
            <textarea
              placeholder="Bio"
              value={aboutData.bio || ''}
              onChange={e => setAboutData({...aboutData, bio: e.target.value})}
              rows="4"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={aboutData.image || ''}
              onChange={e => setAboutData({...aboutData, image: e.target.value})}
            />
            <input
              type="text"
              placeholder="Location"
              value={aboutData.location || ''}
              onChange={e => setAboutData({...aboutData, location: e.target.value})}
            />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="form-section">
            <h2>Skills</h2>
            {skillsData.categories.map((category, idx) => (
              <div key={idx} className="category-item">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={category.name || ''}
                  onChange={e => {
                    const newCats = [...skillsData.categories];
                    newCats[idx].name = e.target.value;
                    setSkillsData({...skillsData, categories: newCats});
                  }}
                />
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={category.skills?.join(', ') || ''}
                  onChange={e => {
                    const newCats = [...skillsData.categories];
                    newCats[idx].skills = e.target.value.split(',').map(s => s.trim());
                    setSkillsData({...skillsData, categories: newCats});
                  }}
                />
              </div>
            ))}
            <button 
              className="add-btn"
              onClick={() => setSkillsData({
                categories: [...skillsData.categories, { name: '', skills: [] }]
              })}
            >
              + Add Category
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="form-section">
            <h2>Contact Information</h2>
            <input
              type="email"
              placeholder="Email"
              value={contactData.email || ''}
              onChange={e => setContactData({...contactData, email: e.target.value})}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contactData.phone || ''}
              onChange={e => setContactData({...contactData, phone: e.target.value})}
            />
            <h3>Social Links</h3>
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={contactData.social?.linkedin || ''}
              onChange={e => setContactData({
                ...contactData, 
                social: {...contactData.social, linkedin: e.target.value}
              })}
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={contactData.social?.github || ''}
              onChange={e => setContactData({
                ...contactData, 
                social: {...contactData.social, github: e.target.value}
              })}
            />
          </div>
        )}
      </div>

      <div className="admin-actions">
        <button onClick={handleSave} disabled={saving} className="save-btn">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>

      <style>{`
        .admin-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          overflow-y: auto;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .close-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }

        .admin-message {
          padding: 1rem;
          margin: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .admin-message.success {
          background: #d4edda;
          color: #155724;
        }

        .admin-message.error {
          background: #f8d7da;
          color: #721c24;
        }

        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          background: #f5f5f5;
          overflow-x: auto;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab.active {
          background: #667eea;
          color: white;
        }

        .admin-content {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .form-section h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .form-section input,
        .form-section textarea {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-section input:focus,
        .form-section textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .category-item {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .add-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .admin-actions {
          position: sticky;
          bottom: 0;
          background: white;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }

        .save-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
        }

        .save-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Admin;