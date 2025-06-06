# Recipe Book (Task 1)

## Overview
This project is a simple web-based recipe book showcasing four favorite recipes: Classic Spaghetti Carbonara, Homemade Margherita Pizza, Chocolate Chip Cookies, and Grilled Lemon Herb Chicken. Each recipe includes a gallery of images, ingredients, and cooking instructions. The webpage is styled with CSS for a clean and responsive design and includes JavaScript for interactive toggling of recipe details.

## Project Structure
The project is organized as follows:

```
Recipe Book (Task 1)/
├── Rec.html                # Main HTML file containing the recipe content
├── rec.css                 # CSS file for styling the webpage
├── Images/                 # Folder containing recipe images
│   ├── 1.Spaghetti Carbonara/
│   │   ├── Classic_Spaghetti_Carbonara-1.jpeg
│   │   ├── Classic_Spaghetti_Carbonara-2.jpeg
│   │   ├── Classic_Spaghetti_Carbonara-3.jpeg
│   ├── 2.Margherita Pizza/
│   │   ├── Margherita_Pizza-1.jpeg
│   │   ├── Margherita_Pizza-2.jpeg
│   │   ├── Margherita_Pizza-3.jpeg
│   ├── 3.Chocolate Chip Cookies/
│   │   ├── Chocolate_Chip_Cookies-1.jpeg
│   │   ├── Chocolate_Chip_Cookies-2.jpeg
│   │   ├── Chocolate_Chip_Cookies-3.jpeg
│   ├── 4.Grilled Lemon Herb Chicken/
│   │   ├── Grilled_Lemon_Herb_Chicken-1.jpeg
│   │   ├── Grilled_Lemon_Herb_Chicken-2.jpeg
│   │   ├── Grilled_Lemon_Herb_Chicken-3.jpeg
├── README.md               # This file
```

## Features
- **Responsive Design**: The webpage adapts to different screen sizes using a grid layout and media queries.
- **Interactive Elements**: Recipe details can be toggled (shown/hidden) using buttons powered by JavaScript.
- **Styled Gallery**: Each recipe includes a gallery of three images with hover effects.
- **External Link**: A footer link to [BBC Good Food](https://www.bbcgoodfood.com/) for more recipes.

## Prerequisites
To run this project locally, you need:
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A local web server (recommended) to serve the files, as browsers may block local image loading with `file://` URLs.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/recipe-book-task1.git
   cd recipe-book-task1
   ```

2. **Ensure Folder Structure**:
   Verify that the `Images` folder and its subfolders contain the correct image files as listed in the project structure above.

3. **Serve the Webpage**:
   To view the webpage, you need to serve it through a local web server due to browser security restrictions on local file access. Options include:
   - **Python HTTP Server**:
     ```bash
     python -m http.server 8000
     ```
     Then, open `http://localhost:8000/Rec.html` in your browser.
   - **Node.js http-server**:
     ```bash
     npm install -g http-server
     http-server
     ```
     Then, open `http://localhost:8080/Rec.html`.
   - **VS Code Live Server**: Use the "Live Server" extension in VS Code to launch the webpage.

## Usage
- Open `Rec.html` in a browser via a local web server.
- Browse through the four recipes displayed in a grid layout.
- Click the "Show Details" button under each recipe to toggle the visibility of ingredients and instructions.
- Hover over images in the gallery to see a zoom effect.
- Click the "Get Cooking!" button or the footer link to visit [BBC Good Food](https://www.bbcgoodfood.com/) for more recipes.

## Notes
- **Image Paths**: The images are referenced using relative paths in `Rec.html` (e.g., `Images/1.Spaghetti Carbonara/Classic_Spaghetti_Carbonara-1.jpeg`). Ensure the `Images` folder and its subfolders are in the same directory as `Rec.html` to avoid broken image links.
- **File Naming**: Image file names and folder names contain spaces and periods (e.g., `1.Spaghetti Carbonara`). Ensure these match exactly in the `Rec.html` file to avoid loading issues.
- **Testing**: If images do not load, check the browser console (`F12` > Console) for errors like `404 Not Found` and verify the image paths and file names.

## License
This project is for educational purposes and does not include a specific license. Feel free to use and modify it as needed.

## Acknowledgments
- Styling inspired by modern web design trends.
- Recipe content is fictional and for demonstration purposes only.
- External link provided to [BBC Good Food](https://www.bbcgoodfood.com/) for further recipe exploration.
