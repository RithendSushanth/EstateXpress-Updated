import React from 'react';
import '../styles/AboutPage.scss';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <>
    <Navbar />
    <div className="about-page">
      <div className="section">
        <h1>About EstateXpress</h1>
        <p>EstateXpress is a leading platform for finding rental properties. We strive to make the process of finding and renting a house simple and hassle-free.</p>
      </div>

      <div className="section">
        <h2>Our Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Wishlist</h3>
            <p>Save your favorite properties to your wishlist for easy access later.</p>
          </div>
          <div className="feature">
            <h3>Triplist</h3>
            <p>Create a trip list to view and compare properties you're interested in renting.</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Our Team</h2>
        <div className="team">
          <div className="team-member">
            <img src="/assets/John Smiths.jpg" alt="Rithend Sushanth" />
            <h4>Rithend Sushanth</h4>
            <p>Lead Developer</p>
            <p>Rithend leads the development of EstateXpress, ensuring a smooth and efficient user experience.</p>
          </div>
          <div className="team-member">
            <img src="/assets/denny.jpeg" alt="Khan Sarguroh Fatima" />
            <h4>Khan Sarguroh Fatima</h4>
            <p>Designer</p>
            <p>Khan's creative designs bring life to EstateXpress, making it visually appealing and user-friendly.</p>
          </div>
          <div className="team-member">
            <img src="/assets/John Smiths.jpg" alt="Safwan Ahmed Shaikh" />
            <h4>Safwan Ahmed Shaikh</h4>
            <p>Developer</p>
            <p>Safwan is a developer for EstateXpress, contributing to the development and enhancement of the platform.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AboutPage;

