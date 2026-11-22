import { useState } from 'react'
import './App.css'

type Recipe = {
  id: number
  title: string
  description: string
  category: string
  ingredients: string[]
  instructions: string[]
}

type Category = {
  name: string
  description: string
}

type View = 'home' | 'recipes' | 'categories' | 'detail'

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Chocolate Cake',
    description: 'Rich and moist chocolate cake perfect for any occasion',
    category: 'desserts',
    ingredients: ['2 1/2 cups flour', '1 cup sugar', '3 eggs', '1 cup milk'],
    instructions: [
      'Mix dry ingredients',
      'Add wet ingredients',
      'Bake at 350°F for 25 minutes',
    ],
  },
  {
    id: 2,
    title: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta with creamy egg sauce',
    category: 'dinner',
    ingredients: ['200g spaghetti', '100g pancetta', '2 eggs', '1/2 cup Parmesan'],
    instructions: [
      'Cook the spaghetti until al dente',
      'Fry the pancetta until crisp',
      'Mix eggs and Parmesan, then toss with the hot pasta',
    ],
  },
  {
    id: 3,
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta cheese',
    category: 'lunch',
    ingredients: ['2 tomatoes', '1 cucumber', '1/2 red onion', '1/2 cup feta cheese'],
    instructions: [
      'Chop the tomatoes, cucumber, and onion',
      'Add feta cheese',
      'Toss gently and serve fresh',
    ],
  },
  {
    id: 4,
    title: 'Breakfast Smoothie Bowl',
    description: 'Healthy and colorful breakfast bowl',
    category: 'breakfast',
    ingredients: ['1 frozen banana', '1 cup mixed berries', '1/2 cup yogurt', '1/4 cup granola'],
    instructions: [
      'Blend the banana, berries, and yogurt until smooth',
      'Pour into a bowl',
      'Top with granola and serve',
    ],
  },
]

const categories: Category[] = [
  { name: 'breakfast', description: 'Start your day right' },
  { name: 'lunch', description: 'Midday favorites' },
  { name: 'dinner', description: 'Evening meals' },
  { name: 'desserts', description: 'Sweet treats' },
]

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)

  const visibleRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes
  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId)

  function showRecipes(category: string | null = null) {
    setSelectedCategory(category)
    setSelectedRecipeId(null)
    setView('recipes')
  }

  function goHome() {
    setSelectedCategory(null)
    setSelectedRecipeId(null)
    setView('home')
  }

  function openRecipe(recipe: Recipe) {
    setSelectedRecipeId(recipe.id)
    setView('detail')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="navigation" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={goHome}>
            Recipe Book
          </a>
          <div className="nav-links">
            <button
              className={view === 'home' ? 'active' : ''}
              type="button"
              onClick={goHome}
            >
              Home
            </button>
            <button
              className={view === 'recipes' || view === 'detail' ? 'active' : ''}
              type="button"
              onClick={() => showRecipes()}
            >
              Recipes
            </button>
            <button
              className={view === 'categories' ? 'active' : ''}
              type="button"
              onClick={() => setView('categories')}
            >
              Categories
            </button>
          </div>
        </nav>
      </header>

      <main className={`content-panel ${view === 'home' ? 'home-panel' : ''}`}>
        {view === 'home' && (
          <section className="home-content" aria-labelledby="welcome-heading">
            <h1 id="welcome-heading">Welcome to Recipe Book</h1>
            <p>Discover delicious recipes and start cooking today!</p>
            <div className="home-cards">
              <button className="home-card" type="button" onClick={() => showRecipes()}>
                <strong>Browse Recipes</strong>
                <span>Explore our collection of delicious recipes</span>
              </button>
              <button
                className="home-card"
                type="button"
                onClick={() => setView('categories')}
              >
                <strong>Recipe Categories</strong>
                <span>Find recipes by category</span>
              </button>
            </div>
          </section>
        )}

        {view === 'recipes' && (
          <section aria-labelledby="recipes-heading">
            <h1 id="recipes-heading">
              {selectedCategory
                ? `${selectedCategory[0].toUpperCase()}${selectedCategory.slice(1)} Recipes`
                : 'All Recipes'}
            </h1>
            {visibleRecipes.length > 0 ? (
              <div className="recipe-grid">
                {visibleRecipes.map((recipe) => (
                  <button
                    className="recipe-card"
                    key={recipe.id}
                    type="button"
                    onClick={() => openRecipe(recipe)}
                  >
                    <strong>{recipe.title}</strong>
                    <span className="recipe-description">{recipe.description}</span>
                    <span className="category-tag">{recipe.category}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="empty-state">No recipes found in this category.</p>
            )}
          </section>
        )}

        {view === 'categories' && (
          <section className="categories-panel" aria-labelledby="categories-heading">
            <h1 id="categories-heading">Categories</h1>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    className="category-item"
                    type="button"
                    onClick={() => showRecipes(category.name)}
                  >
                    <strong>
                      {category.name[0].toUpperCase() + category.name.slice(1)}
                    </strong>
                    <span>{category.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {view === 'detail' && selectedRecipe && (
          <article className="recipe-detail">
            <button className="back-link" type="button" onClick={() => showRecipes()}>
              ← Back to recipes
            </button>
            <span className="category-tag">{selectedRecipe.category}</span>
            <h1>{selectedRecipe.title}</h1>
            <p className="detail-description">{selectedRecipe.description}</p>
            <div className="recipe-detail-columns">
              <section aria-labelledby="ingredients-heading">
                <h2 id="ingredients-heading">Ingredients</h2>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="instructions-heading">
                <h2 id="instructions-heading">Instructions</h2>
                <ol>
                  {selectedRecipe.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
              </section>
            </div>
          </article>
        )}
      </main>

      <footer className="site-footer">Recipe Book</footer>
    </div>
  )
}

export default App
