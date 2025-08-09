
***

# OrbitTasks 🚀

*Your Productivity, in Orbit.*

***

## Overview

OrbitTasks is a modern task management web app that combines **powerful productivity tools** with a **beautiful, interactive interface**. It’s designed to make creating, organizing, and completing tasks both **fast** and **enjoyable** — whether you use structured forms or simply type what you think using natural language.

***

## ✨ Features

- **Secure Authentication**  
  Register, log in, log out, and manage your account with persistent token-based sessions.

- **Profile Management**  
  Update your display name, date of birth, and other details with persistent storage.

- **Smart Task Creation**  
  - Add tasks manually or type natural phrases like _"Meet Bob tomorrow at 3pm high priority"_  
  - Autofill due date/time, priority, and description automatically using NLP.

- **Recurring Tasks**  
  Setup repeat patterns, intervals, and end dates for tasks.

- **Active & Completed Tasks Views**  
  - Completed tasks have timestamped completion info and editing disabled to preserve data integrity.
  - Seamlessly toggle between active and completed.

- **Category & Priority Filters**  
  Clickable pills for instant filtering.

- **Light / Dark Theme**  
  Easily toggle between themes with beautiful custom CSS variables.

- **Interactive UI Enhancements**  
  - Animated orbiting logo  
  - Smooth tooltips, modals, and toast notifications

- **Responsive Design**  
  Works beautifully on desktop.

***

## 🏗 Architecture & Tech Stack

- **Frontend:**  
  Built with React using Hooks and Context API for global state management. React Router manages protected routes. CSS custom properties power theming. Modular components ensure maintainability.

- **Backend:**  
  (Implied) RESTful API to handle auth, profile, and task management with secure token-based authentication.

- **Storage:**  
  Uses browser localStorage for caching user/session state. Backend persists user profiles and tasks.

***

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/orbittasks.git
   ```
2. Navigate to the project directory:
   ```bash
   cd orbittasks
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

***

## 📖 Usage

- **Sign up or Log in** to your account.
- Use the task input bar with natural language or forms to add tasks.
- Mark tasks done to move them to the completed panel, which records exact completion time.
- Filter tasks by category or priority using the interactive pills.
- Manage your profile details anytime via the user menu.
- Toggle the theme between light and dark to suit your environment.
- Enjoy interactive UI features like the draggable orbiting logo and smooth animations.

***

## 🛠 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

Please ensure all commits are well documented and include relevant tests.

***

## 🎉 Credits

- Built with React and modern frontend technologies.
- Inspired by productivity principles and elegant UI design.

***

## 🤝 License

This project is licensed under the MIT License.

***






***

## 📜 Description

**OrbitTasks** is a modern, feature-rich task management web app that blends productivity with elegance.  
It’s designed to make **creating, organizing, and completing tasks** as seamless as possible.  
Whether you prefer filling in structured forms or simply typing sentences in natural language, OrbitTasks adapts to your workflow.

Key highlights:
- **Natural Language Input (NLP)** — Type phrases like _“Meet Bob tomorrow at 3 pm high priority”_ and OrbitTasks will automatically detect and fill in the due date, time, priority, and description for you.
- **Recurring Tasks** — Set repeat schedules with intervals and end dates.
- **Completed Task Management** — View, timestamp, and toggle completed items with a draggable floating panel.
- **Custom Filters** — Quickly filter by category or priority using interactive pill-style tags.
- **Themes & UI Polish** — Switch between light and dark mode, with responsive, mobile-friendly design and interactive animations.

OrbitTasks is perfect for individuals who want their productivity tool to be as **smart** as it is **beautiful**.

***

## 🏗 Architecture

OrbitTasks follows a clean **frontend–backend** separation with a modern React codebase.

**Frontend:**
- **React** with Hooks for stateful, functional components.
- **Context API** (`AuthContext`, `TodosContext`) for global state management.
- **React Router DOM** for page routing and protected routes.
- **CSS Custom Properties** and modular styles for light/dark theming.
- **Optimistic UI Updates** for instant interactions while syncing with backend.
- **NLP Parsing** integrated in the task creation workflow.

**Backend** (expected implementation):
- A REST API handling authentication, profile, and task CRUD operations.
- **JWT or token-based authentication** for security.
- Database persistence for registered user data.
- Guest mode support with `localStorage` fallback.

**Storage:**
- **localStorage** for caching user sessions and guest tasks.
- Backend database for permanent account storage.

**UI Architecture Highlights:**
- Modular components for reusability (`TodoItem`, `TodoForm`, `CompletedTasksPanel`, etc.).
- **Drag & Drop** support for the floating completed tasks panel.
- Fully responsive, mobile-first design.

***

## 🚀 Installation & Commands

Follow these steps to setup and run OrbitTasks locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/orbittasks.git

# 2️⃣ Navigate into the project directory
cd orbittasks

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm start
```

The app will start on **http://localhost:3000** and support **hot module reloading** for instant feedback.

### Useful Commands:
```bash
# Run in development mode with live reload
npm start

# Build the app for production (output in /build)
npm run build

# Run lint checks for code style consistency
npm run lint

# Preview the production build locally
npm install -g serve
serve -s build
```

***


