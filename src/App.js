import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Recipes from './components/Recipes/Recipes';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Recipes />
      <Contact />
    </div>
  );
}

export default App;
