# Software Engineer Wrap 2025

A lightweight, fully client-side web application inspired by the concept of Spotify Wrapped — built to showcase a developer’s yearly engineering journey through metrics, visuals, and personal highlights.

This project allows users to generate a personalized “Software Engineer Wrap” poster using only browser-based technologies, with no backend or database required.

## 🚀 Project Overview

Software Engineer Wrap is a static web application that lets developers visually summarise their year in code — including metrics like commits, hours coded, bugs fixed, tools used, and more — in a clean, shareable poster format.

The entire experience runs in the browser and stores data locally, making it privacy-friendly and easy to deploy on platforms like GitHub Pages.

## ✨ Key Features

- Spotify Wrapped–style layout with a unique design identity
- Live preview of the poster as you edit values
- Local data persistence using browser storage (no backend)
- Export as high-resolution PNG (ideal for sharing on social platforms)
- Theme system
  - 2 dark themes
  - 2 light themes
- Customisable metrics
  - Lines of code, commits, bugs fixed, hours coded, projects shipped, etc.
- App & language selector
  - Choose from predefined icons or upload custom ones
- Profile section
  - Name, role, company, photo, and personal tagline
- Responsive layout
  - Optimised for desktop and mobile viewing
- JSON import/export
  - Move data between devices or back it up easily

## 🧠 Tech Stack

### Frontend

- HTML5 – semantic structure
- CSS3 – layout, theming, responsive design
- Vanilla JavaScript – state management, rendering logic, persistence

### Storage

- LocalStorage
- Used for saving user data and preferences
- No external database required

### Image Export

- Canvas-based rendering (client-side)
- High-resolution export for social sharing

### Optional Local Tools

- Python – optional scripts for asset generation or preprocessing
- PHP – optional local preview server if needed during development

## 🎨 Themes

Included by default:

- Noir Pulse (dark)
- Nebula Pop (dark)
- Daylight Drift (light)
- Paper Forest (light)

Themes affect:

- Background gradients
- Accent colors
- Typography contrast
- Card styling and shadows

## Exporting the Poster

- One-click Download as PNG
- Automatically scales for high-resolution output
- Includes profile photo, icons, and theme styling
- Optional safe-area overlay for Instagram stories

## 🧪 Development Notes

- No frameworks or heavy dependencies
- No build step required
- Fully compatible with GitHub Pages
- Works offline once loaded
- Designed for clarity and extendability

## 🧑‍💻 Author

**Jagan Jijo**  
Software Engineer  
Focused on building clean, scalable systems across web, automation, and security tooling.
