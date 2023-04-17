import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Cosmic Cuisine</h1>
        <p>Have you ever wanted to have one spot to store all of your favorite recipes in one place so you don't have to remember which app or book you saw that recipe in? Cosmic Cuisine solves that problem by creating a space that will allow you to post your favorite recipes and be able to categorize them based on what type of recipe it is for example; breakfast, entree, desert, etc..
          Cosmic Cuisine is a convenient way to store all of your favorite recipes to be used again.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
