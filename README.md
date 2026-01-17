# Boston Housing Price Predictor

A single-page web application that predicts median home prices in Boston using multiple regression analysis. The website features a beautiful faded Boston skyline background and interactive dropdowns for all predictor variables.

## Features

- **Interactive Prediction**: Select values for 12 predictor variables using dropdown menus
- **Real-time Updates**: Predicted price updates automatically as you change any variable
- **Beautiful Design**: Faded Boston skyline background with modern, responsive UI
- **Full Variable Descriptions**: Each dropdown includes the complete variable description
- **Client-side Calculation**: All predictions calculated in the browser using the regression model

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling with faded background and responsive design
- `script.js` - JavaScript prediction logic with regression coefficients
- `boston-skyline.jpg` - Background image (must be in project root)

## Regression Model

The prediction uses a multiple regression model with the following coefficients:

- **Intercept**: 36.891960
- **crim**: -0.113139 (Per capita crime rate by town)
- **zn**: 0.047052 (Proportion of residential land zoned for lots over 25,000 sq.ft.)
- **indus**: 0.040311 (Proportion of non-retail business acres per town)
- **nox**: -17.366999 (Nitric oxides concentration)
- **rm**: 3.850492 (Average number of rooms per dwelling)
- **age**: 0.002784 (Proportion of owner-occupied units built prior to 1940)
- **dis**: -1.485374 (Weighted distances to five Boston employment centres)
- **rad**: 0.328311 (Index of accessibility to radial highways)
- **tax**: -0.013756 (Full-value property-tax rate per $10,000)
- **ptratio**: -0.990958 (Pupil-teacher ratio by town)
- **black**: 0.009741 (1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town)
- **lstat**: -0.534158 (Lower status of the population percent)

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Create a GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it (e.g., `boston-housing-predictor`)

2. **Upload Files**
   - Upload all files (`index.html`, `styles.css`, `script.js`, `boston-skyline.jpg`) to the repository
   - Make sure `index.html` is in the root directory

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Under "Source", select the branch (usually `main` or `master`)
   - Select `/ (root)` as the folder
   - Click "Save"

4. **Access Your Site**
   - Your site will be available at: `https://[your-username].github.io/[repository-name]/`
   - It may take a few minutes to become available

### Method 2: Using Git Command Line

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/[your-username]/[repository-name].git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages** (same as Method 1, step 3)

## Local Testing

To test the website locally:

1. **Using Python** (if installed):
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser

2. **Using Node.js** (if installed):
   ```bash
   npx http-server
   ```
   Then open the URL shown in the terminal

3. **Using VS Code Live Server**:
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required
- All calculations done client-side using vanilla JavaScript

## Notes

- The predicted price is displayed in full dollars (converted from thousands)
- All variable ranges are based on the Boston Housing Dataset
- The model has an R² of approximately 0.7355 (73.55% variance explained)
- The background image (`boston-skyline.jpg`) must be in the same directory as `index.html`

## License

This project is for educational purposes and uses the Boston Housing Dataset.
