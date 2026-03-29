# Developer Portfolio

A portfolio template designed for software engineers, developers, and creatives. Built with React and Vite, it features a sleek two-column layout, smooth scroll-spy navigation, and dynamic modals to showcase your experience, projects, and certifications.
Check it out here: https://tomasleotefalcao.vercel.app/

## 🚀 Technologies Used

- **React 19** - Component-based UI library
- **Vite** - Lightning-fast frontend build tool and development server
- **Vanilla CSS3** - Custom styling featuring CSS Grid/Flexbox, dynamic highlighting, and responsive media queries
- **JavaScript (ES6+)** - Core logic, including custom React Hooks for scroll tracking

## ✨ Core Features & Architecture

This portfolio is structured using a **Two-Column Fixed Layout** on desktop and a **Stacked Single-Column Layout** on mobile devices.

### 🎨 Design & Layout
- **Left Column (Navigation)**: Sticky sidebar containing your name, dynamically rotating job titles, a scroll-spy navigation menu, and social media links.
- **Right Column (Content)**: The scrollable container featuring the main sections (`About`, `Experience`, `Projects`, `Certifications`).
- **Responsive Mobile Mode**: On screens narrower than 768px, the layout switches to a single column with a mobile-friendly hamburger menu overlay, and a dedicated Hero section.

### 🧩 Key Custom Hooks & Components
- `useScrollSpy`: A custom hook that tracks the scrolling of the right content column (or the window on mobile) using `IntersectionObserver` to automatically highlight the corresponding navigation link in the sidebar.
- `useMousePosition`: Tracks the cursor to create a subtle glow/radial gradient effect that follows your mouse across the background on desktop.
- `PdfModal` & `ImageModal` & `VideoModal`: Reusable React portal components designed to render full-screen immersive previews of your project media and certificates without disrupting page flow.

### 💼 Modular Sections
- **About**: A brief introduction to who you are and your tech stack.
- **Experience**: Timeline-based cards showcasing your work history with expandable sections and a link to your full PDF CV.
- **Projects**: Project cards supporting multiple formats (images, videos, PDF documents). Features links directly to GitHub or live websites.
- **Certifications**: Dedicated cards representing educational achievements. Clicking a card instantly opens a responsive PDF viewer in a modal.

---

## 📦 Installation & Setup

1. **Clone this repository:**
```bash
git clone https://github.com/tomasleote/Portfolio.git
cd Portfolio/my-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **View locally:** Open your browser and navigate to `http://localhost:5173`

---

## 🛠️ Forking & Customizing (Make it your own!)

This project is built to be an easily customizable template. If you fork this project, follow these steps to plug in your own information:

### 1. Update Personal Information & Navigation
- Edit `src/components/Navigation.jsx`: Update your name and the `titles` array for the typing animation.
- Edit `src/components/mobile/MobileHeroSection.jsx`: Update your name, titles, and the short tagline for mobile users.
- Connect your social links to the `SocialMediaIcon` props in `Navigation.jsx` (and `MobileMenu.jsx` / `MobileHeroSection.jsx`).

### 2. Rewrite the "About" Section
- Open `src/sections/AboutSection.jsx` and replace the text with your own background story. 
- You can easily modify the the `techStack` tags to reflect the programming languages and frameworks you use.

### 3. Add Your Work Experience & Resume
- Navigate to `src/sections/ExperienceSection.jsx`.
- Find the `experiences` array and populate it with your jobs/internships.
- **Resume**: Replace `src/assets/CV_TomasLeote_Lisboa_2026.pdf` with your own PDF and update the import path at the top of the file!

### 4. Showcase Your Projects
- Open `src/sections/ProjectsSection.jsx`.
- Add your images, videos, or PDFs into the `src/assets/` folder and import them at the top of the file.
- Update the `projects` array with your title, description, technologies used, and the relevant URLs.

### 5. Add Your Certifications
- Store your certificate PDFs in `src/assets/certifications/`.
- Open `src/sections/CertificationsSection.jsx`.
- Import the PDFs and populate the `certifications` array with the certificate title and the imported URL. The `PdfModal` handles the rest!

### 6. Tweak Branding & Colors
- All styles are cleanly separated into the `src/styles/` directory.
- The default dark background is `#0f172a` (Slate).
- The default accent text/border color is `#64ffda` (Teal).
- Global styles such as the mouse-tracking radial gradient are defined in `Portfolio.jsx` and `index.css`.

---

## 🚀 Deployment

Building for production is straightforward thanks to Vite:

```bash
npm run build
```

This commands compiles and optimizes the project into the `dist/` directory, which can be effortlessly drag-and-dropped or continuously deployed to static hosting solutions like **Vercel**, **Netlify**, or **GitHub Pages**.

## 📄 License & Attribution
Feel free to fork, adapt, and use this layout for your own personal portfolio. Mentioning where you got the template is highly appreciated but completely optional! 

Built by [Tomás Leote Falcão](https://github.com/tomasleote)
