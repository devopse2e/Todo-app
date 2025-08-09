
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
