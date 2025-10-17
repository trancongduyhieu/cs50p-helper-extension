
# CS50P Helper Extension

**CS50P Helper** is a browser extension designed to supercharge the learning experience for students of Harvard's [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/2022/). It transforms the standard problem set page into a powerful, integrated development and learning environment right in your browser.


## Key Features

- **Customizable Three-Panel Layout**: Replaces the default CS50 page with a resizable three-panel view, allowing you to see tofofhe problem description, official documentation, and guided hints all at once. Panel sizes are saved locally for a persistent layout.
- **Integrated Python Documentation**: Automatically loads relevant official Python documentation pages into a dedicated panel, eliminating the need to switch tabs and search for information.
- **Multi-Level Hints (Vietnamese)**: Provides a progressive hint system in Vietnamese to guide students without giving away the solution immediately.
    - **Level 1 (Tư duy)**: High-level conceptual guidance.
    - **Level 2 (Các Bước Logic)**: Step-by-step logical breakdown.
    - **Level 3 (Code Skeleton)**: A code framework to get you started-
## Installation

Since this is an unpacked extension, you'll need to load it manually in a Chromium-based browser (like Google Chrome, Microsoft Edge, or Brave).

1.  **Download the Code**:
    - Clone this repository or download it as a ZIP file and extract it.

2.  **Build the Extension**:
    - Open a terminal in the project's root directory.
    - Install the necessary dependencies:
      ```bash
      npm install
      ```
    - Run the build command to compile the Vue.js app and package it into the `dist` folder:
      ```bash
      npm run build
      ```
      This will create a `dist` directory containing all the necessary files for the extension.

3.  **Load into Browser**:
    - Open your browser and navigate to the extensions page.
        - In Chrome/Edge: `chrome://extensions`
        - its Brave: `brave://extensions`
    - Enable **"Developer mode"** using the toggle switch (usually in the top-right corner).
    - Click tthe **"Load unpacked"** button.
    - In the file dialog that opens, select the `dist` folder that was created in the previous step.

4.  **Done!** The CS50P Helper extension should now appear in your list of extensions and will be active.

## How to Use

1.  Navigate to any CS50P problem set URL (e.g., `https://cs50.harvard.edu/python/2022/psets/0/indoor/`).
2.  The extension will automatically detect the problem page and activate, replacing the default view with its own three-panel layout.
3.  **Resize Panels**: Click and drag the vertical dividers between the panels to adjust their widths to your liking.
4.  **Use the Panels**:
    - **Left Panel**: Contains the original problem description from the CS50 website.
    - **Middle Panel**: Use the tabs to switch Python/CS50 documentation.
    - **Right Panel**: Access the tiered hints. Click on a hint level to reveal its content. Mark the problem as complete when you're finished.
5.  If you navigate to a non-problem page on the CS50P website, the extension will stay inactive, and you will see the original site content.

## Project Structure

```
/
├── dist/                  # Build output, this is what you load into the browser
├── public/                # Static assets (like icons)
├── src/
│   ├── content/           # Core Vue.js application source
│   │   ├── components/    # Individual Vue components (panels, layout, etc.)
│   │   ├── utils/         # Helper functions (URL detection, data mapping)
│   │   ├── App.vue        # Root Vue component
│   │   └── main.js        # Entry point for the Vue app
│   ├── data/
│   │   ├── hints/         # JSON files with hints for each week
│   │   └── documentation.json # Maps problems to documentation URLs
│   └── styles/
│       └── main.css       # TailwindCSS and custom global styles
├── manifest.json          # Core extension manifest file
└── vite.config.js         # Vite build configuration
```
