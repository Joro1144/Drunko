# Drink Recipes - Mobile-Friendly Cocktail & Beverage Guide

A modern, responsive web application for discovering drink recipes with search functionality, filters, and beautiful card-based layout.

## Features

- 📱 **Mobile-First Design**: Fully responsive layout that works perfectly on all devices
- 🔍 **Smart Search**: Search drinks by name, ingredients, or category
- 🎯 **Advanced Filtering**: Filter by category (cocktails/non-alcoholic), alcohol content, and difficulty
- 👁️ **View Modes**: Toggle between normal and compact grid views
- 🎨 **Modern UI**: Beautiful gradient backgrounds, smooth animations, and hover effects
- ⚡ **Fast Performance**: Optimized for quick loading and smooth interactions
- 📦 **GitHub Pages Ready**: Deploy instantly to GitHub Pages without configuration

## Quick Start

### Local Development
1. Clone or download this repository
2. Navigate to the project directory
3. Start a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or any static file server
   ```
4. Open `http://localhost:8000` in your browser

### GitHub Pages Deployment
1. Fork this repository to your GitHub account
2. Go to Settings → Pages in your repository
3. Select source: "Deploy from a branch"
4. Choose branch: `main` (or `master`) and folder: `/root`
5. Save and your site will be live at `https://yourusername.github.io/drink-recipes`

## Project Structure

```
drink-recipes/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Responsive styles and animations
├── js/
│   └── app.js          # Application logic and interactions
├── data/
│   └── drinks.json     # Drink recipes database
└── README.md           # This file
```

## Customization

### Adding New Drinks
Edit `data/drinks.json` and add new drink objects following this format:

```json
{
  "id": 16,
  "name": "Your Drink Name",
  "category": "Cocktail",
  "ingredients": ["2 oz Spirit", "1 oz Juice", "Garnish"],
  "instructions": "Mix all ingredients with ice. Garnish and serve.",
  "image": "https://images.unsplash.com/photo-...?w=400&h=300&fit=crop",
  "difficulty": "Easy",
  "alcohol": true
}
```

### Styling
- Modify `css/style.css` to change colors, fonts, and layout
- The app uses CSS Grid for responsive layouts
- Mobile-first approach with breakpoints at 768px and 480px

### Features
- Add new filters in `js/app.js`
- Extend search functionality in the `filterAndRenderDrinks` method
- Customize modal display in `showDrinkDetails` method

## Browser Support

- ✅ Chrome/Chromium 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 6+)

## Performance

- Lazy loading images
- Debounced search input
- Efficient DOM manipulation
- Optimized animations with CSS transforms
- Minimal external dependencies (only Font Awesome icons)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy exploring amazing drink recipes! 🍹**