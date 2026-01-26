# Nuxt Portfolio Site

A modern, responsive single-page portfolio website built with Nuxt 3 and Tailwind CSS.

## Features

- ✨ Modern, minimal design with smooth scrolling navigation
- 📱 Fully responsive mobile-first design
- 🎨 Tailwind CSS for styling with customizable color scheme
- 🚀 Built with Nuxt 3 and Vue 3 Composition API
- 🎯 Sections: Hero, Services, About, Portfolio, Testimonials, Contact
- 💼 Sticky header with mobile navigation
- 🌈 Gradient accents and smooth transitions

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

Or generate static site:

```bash
npm run generate
```

## Customization

### Changing Colors

The site uses Tailwind's indigo color by default. To change the accent color:

1. Open `pages/index.vue`
2. Find and replace `indigo-` with your preferred color (e.g., `teal-`, `purple-`, `blue-`)
3. Or customize colors in `tailwind.config.js`

### Updating Content

Edit `pages/index.vue` and modify the data arrays:

- `services` - Your service offerings
- `technologies` - Tech stack
- `projects` - Portfolio items
- `testimonials` - Client testimonials
- `socialLinks` - Social media links

## Project Structure

```
├── assets/
│   └── css/
│       └── tailwind.css        # Tailwind imports
├── pages/
│   └── index.vue               # Main portfolio page
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## Technologies

- Nuxt 3
- Vue 3
- Tailwind CSS
- TypeScript
