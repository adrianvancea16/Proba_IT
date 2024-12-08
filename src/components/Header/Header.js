import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="left-section">
        <div className="logo">
          chef <img src="/Poza_IT.png" alt="Logo" className="logo-image" />
        </div>
        <nav className="nav-links">
          <button className="btn nav-item">Recipes</button>
          <button className="btn nav-item">Add Recipe</button>
        </nav>
      </div>

      <div className="auth-buttons">
        <button className="btn btn-login">Login</button>
        <button className="btn btn-register">Register</button>
      </div>
    </header>
  );
}

export default Header;
