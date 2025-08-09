

# OrbitTasks 🚀  
*Your Productivity, in Orbit.*

OrbitTasks is a modern task management web app that combines **powerful productivity tools** with a **beautiful, interactive interface**. It’s designed to make creating, organizing, and completing tasks both **fast** and **enjoyable** — whether you use structured forms or simply type what you think using natural language.

***

## ✨ Key Features & Functionality

- **🔐 Secure Authentication**  
  Register, log in, log out, and manage your account with persistent login via token storage.

- **🙋♂️ Profile Management**  
  Update your display name, date of birth, and other profile details — stored securely and reloaded on login.

- **📝 Smart Task Creation**  
  - Add tasks manually **or** use **NLP-powered** input: just type phrases like *"Meet Bob tomorrow at 3pm high priority"* and OrbitTasks will:
    - Set the **due date/time** automatically.
    - Assign **priority** (high / medium / low) based on keywords.
    - Extract the **task title/description** cleanly.
  - Supports categories, notes, priorities, and task colors.

- **🔁 Recurring Tasks**  
  Configure tasks to repeat with patterns, intervals, and optional end dates.

- **✅ Active & Completed Tasks Views**  
  - Active list with due dates and filters.
  - Completed tasks panel showing the exact **completion timestamp** — edit disabled for data integrity.
  - Toggle tasks between active and completed while preserving data.

- **🏷 Category & Priority Filters**  
  Use clickable “pills” to instantly filter tasks.

- **🎨 Light/Dark Theme**  
  Modern theming with CSS variables, accessible from the user menu.

- **💬 Interactive UI Enhancements**  
  - Animated, draggable orbiting-logo at the top.
  - Logo click refresh.
  - Animated tooltips and elegant modals for task details.
  - Toast notifications for feedback.

- **📱 Responsive Design**  
  Fully functional across desktop, tablet, and mobile devices.

***

## ⚙️ Architecture

**Frontend Stack**
- **React** with Hooks & Context API (`AuthContext`, `TodosContext`) for global state management.
- **React Router DOM** for routing & protected routes.
- Modular component-based structure for maintainability.
- Theme system built with CSS custom properties.

**Backend (expected)**
- RESTful API endpoints for auth, profile, and tasks.
- Token-based auth (JWT or equivalent).
- Manages persisted task & profile storage.

**Data Persistence**
- **localStorage** for caching user state and session.
- Backend database for profile & task metadata.

***

## 🚀 Usage

1. **Sign Up / Log In**  
   Create an account or log into your existing one.

2. **Add Tasks**  
   - Use the input form.  
   - Or simply type natural phrases — *“Submit project next Monday 10 AM medium priority”* — and watch OrbitTasks autofill due date/time and priority.

3. **Organize & Manage**  
   - Mark tasks as done — instantly moves them to the completed section with a “Completed at” timestamp.
   - Bring them back to active as needed.
   - Recurring task configuration for repeating jobs.

4. **Filter for Focus**  
   - Click on category or priority pills to filter.
   - Tooltip-hover to see full date/time.

5. **Customize Your View**  
   Toggle Light/Dark theme and enjoy the responsive UI.

6. **Keep It Fun**  
   - Drag the orbiting logo planet.
   - Enjoy smooth transitions and subtle animations.

***

## 💡 Why OrbitTasks?

OrbitTasks isn’t just another to-do app — it’s a productivity tool designed to **think with you**:
- Natural language parsing means less time filling forms.
- Clean, attractive UI means less cognitive load.
- Interactive features keep the app feeling fresh and delightful.

Whether you’re quickly jotting down thoughts, or carefully planning your day, OrbitTasks adapts to your workflow and keeps you in your productivity orbit. 🌌

***

