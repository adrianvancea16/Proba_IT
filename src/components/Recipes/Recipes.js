import React from 'react';
import './Recipes.css';

function Recipes() {
  return (
    <section className="recipes">
      <h2>Top rated recipes</h2>
      <div className="recipe-container">
        <div className="recipe">
          <img src="/Supa_la_plic.png" alt="Recipe 1" />
          <h3>Supă la plic</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>Nr ratinguri</p>
          <p>Author:</p>
          <p>Mari</p>
        </div>
        <div className="recipe">
          <img src="/Paine cu pateu.png" alt="Recipe 2" />
          <h3>Pâine cu pateu</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>Nr ratinguri</p>
          <p>Author:</p>
          <p>Croi</p>

        </div>
        <div className="recipe">
          <img src="/Cartofi Prajiti.png" alt="Recipe 3" />
          <h3>Cartofi prăjiți</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>Nr ratinguri:</p>
          <p>Author:</p>
          <p>Edi</p>
        </div>
      </div>
    </section>
  );
}

export default Recipes;
