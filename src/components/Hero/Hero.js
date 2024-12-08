import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <img 
        src="/Fundal.png" 
        alt="Fundal Chef IT" 
        className="hero-background"
      />
      <div className="hero-content">
        <span className="chef-text">chef</span>
        <img 
          src="/Poza_IT_mare.png" 
          alt="Logo IT" 
          className="logo-it"
        />
      </div>
    </section>
  );
}

export default Hero;
