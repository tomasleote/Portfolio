# Personal Portfolio Website

A modern, interactive portfolio website built with React and Vite, featuring smooth animations and a responsive design that adapts seamlessly between desktop and mobile experiences.

## 🚀 Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **CSS3** - Custom styling with animations
- **JavaScript (ES6+)** - Core programming language

## ✨ Features

- **Responsive Design** - Fully optimized for desktop and mobile devices
- **Magnetic Hover Effects** - Interactive card animations on desktop
- **Smooth Transitions** - Dynamic content transitions and animations
- **Section Navigation** - Easy navigation between different sections
- **Project Showcase** - Display your projects with images and descriptions
- **Experience Timeline** - Showcase your work experience
- **Social Media Integration** - Links to LinkedIn, GitHub, Email, and more

## 📦 Installation

1. Clone this repository:
```bash
git clone https://github.com/tomasleote/Portfolio.git
cd Portfolio/my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Using This as a Template

This portfolio is designed to be easily customizable for your own use. Here's how to adapt it:

### 1. Update Personal Information

**Navigation & Hero Section:**
- Edit `src/components/Navigation.jsx` - Update name and titles
- Edit `src/components/mobile/MobileHeroSection.jsx` - Update name, titles, and tagline

### 2. Add Your Experience

Edit `src/sections/ExperienceSection.jsx`:
- Add or modify the `experiences` array with your work history
- Update company names, roles, descriptions, and technologies

### 3. Add Your Projects

Edit `src/sections/ProjectsSection.jsx`:
- Add or modify the `projects` array with your projects
- Add project images to `src/assets/`
- Update titles, descriptions, technologies, and links

### 4. Update Social Links

Edit the social media links in:
- `src/components/Navigation.jsx` (desktop)
- `src/components/mobile/MobileHeroSection.jsx` (mobile)

### 5. Customize Styling

- Main colors are defined in CSS files in `src/styles/`
- Primary accent color: `#64ffda` (cyan/teal)
- Background: `#0f172a` (dark blue)
- Modify these colors throughout the CSS files to match your brand

### 6. Add Your Resume

Replace `src/assets/CV_TomasLeote_Groningen_2025.pdf` with your own CV file and update the import in `src/sections/ExperienceSection.jsx`

## 🏗️ Project Structure

```
my-portfolio/
├── src/
│   ├── assets/          # Images and files
│   ├── components/      # React components
│   │   ├── mobile/      # Mobile-specific components
│   │   ├── effects/     # Animation components
│   │   └── ...
│   ├── sections/        # Main section components
│   ├── styles/          # CSS files
│   ├── hooks/           # Custom React hooks
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## 📱 Responsive Design

The portfolio automatically adapts to different screen sizes:
- **Desktop**: Side navigation with magnetic hover effects
- **Tablet**: Optimized layout
- **Mobile**: Full-screen hero section with hamburger menu

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📄 License

Feel free to use this template for your own portfolio. No attribution required, but appreciated!

## 🤝 Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

---

Built with ❤️ by Tomás Leote Falcão
