import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../style/About.css';
import logo from 'C:/Users/ADMIN/OneDrive/Documents/GitHub/senior-project/frontend/images/Screenshot 2025-03-01 064747.png'; // Import the logo image

const About = () => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [error, setError] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const response = await axios.get('/api/about');
        setAboutInfo(response.data);
      } catch (err) {
        setError('Failed to fetch about information');
      }
    };

    fetchAboutInfo();
  }, []);

  const toggleExpand = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!aboutInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="about-container d-flex flex-column min-vh-100 bg-dark text-light">
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="about-title mb-4">{aboutInfo.title}</h1>
            <p className="about-text">{aboutInfo.description}</p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="row justify-content-center my-5">
          <div className="col-md-6 text-center">
            <img src={logo} alt="Logo" className="about-logo" /> {/* Use the imported logo */}
          </div>
        </div>

        {/* Information Section */}
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <h2 className="section-title">Our Mission</h2>
            <p className="about-text">{aboutInfo.mission}</p>
            <h2 className="section-title">Our Vision</h2>
            <p className="about-text">{aboutInfo.vision}</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="row justify-content-center my-5">
          <div className="col-md-8">
            <h2 className="section-title">Meet the Team</h2>
            <ul className="team-list">
              {aboutInfo.team.map((member, index) => (
                <li key={index} className="team-member">
                  <div className="team-member-name">{member.name}</div>
                  <div className="team-member-role">{member.role}</div>
                  <button className="btn btn-link text-primary" onClick={() => toggleExpand(index)}>
                    {expandedMember === index ? 'Collapse' : 'Expand'}
                  </button>
                  {expandedMember === index && (
                    <div className="team-member-info">
                      <p><strong>Major:</strong> {member.major}</p>
                      <p>{member.info}</p>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;