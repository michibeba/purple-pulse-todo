# Purple Pulse 💜

Purple Pulse is a BTS/anime-inspired productivity dashboard built with Vue 3. The app allows users to create an account, log in, manage personal tasks, track progress, and organize missions by priority.

The project was created as a final Vue.js project using Supabase for authentication and database storage.

---

## Live Demo

[View Purple Pulse live on Netlify](https://purple-pulse-todo.netlify.app)

---

## GitHub Repository

[View the Purple Pulse GitHub repository](https://github.com/michibeba/purple-pulse-todo)

---

## Features

### Authentication

Users can:

* Sign up with email and password
* Log in with an existing account
* Log out securely
* Access the dashboard only when authenticated

### Task Management

Logged-in users can:

* Add new tasks
* View their personal task list
* Edit existing tasks
* Mark tasks as complete
* Mark completed tasks as incomplete
* Delete tasks permanently

### Dashboard Features

The dashboard includes:

* Total task count
* Pending task count
* Completed task count
* Progress percentage
* Progress bar
* Filters for:

  * All tasks
  * Pending tasks
  * Completed tasks
* Priority labels:

  * Low
  * Medium
  * High

### Design

The user interface uses a dark purple BTS/anime-inspired aesthetic with:

* Purple and pink gradients
* Dark dashboard background
* Rounded cards
* Responsive layout
* Neon-style accents
* Clean task cards

---

## Tech Stack

### Frontend

* Vue 3
* Vite
* Vue Router
* Pinia
* Tailwind CSS

### Backend / Database

* Supabase
* Supabase Authentication
* Supabase PostgreSQL Database

### State Management

* Pinia
* Pinia persisted state plugin

---

## Project Structure

```text
src/
├── components/
│   ├── ProgressCard.vue
│   ├── StatsCard.vue
│   ├── TaskCard.vue
│   └── TaskForm.vue
│
├── pages/
│   ├── AuthPage.vue
│   └── DashboardPage.vue
│
├── router/
│   └── index.js
│
├── services/
│   └── supabase.js
│
├── stores/
│   ├── auth.js
│   └── tasks.js
│
├── App.vue
├── main.js
└── style.css
```

---

## Supabase Database

The app uses a `tasks` table in Supabase.

### Table: tasks

| Column      | Type      | Description                  |
| ----------- | --------- | ---------------------------- |
| id          | uuid      | Unique task ID               |
| created_at  | timestamp | Date the task was created    |
| title       | text      | Task title                   |
| description | text      | Optional task description    |
| completed   | boolean   | Task completion status       |
| priority    | text      | Task priority level          |
| user_id     | uuid      | ID of the authenticated user |

---

## Environment Variables

The app requires a `.env` file in the root folder.

Example:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The `.env` file is ignored by Git and should not be uploaded to GitHub.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/michibeba/purple-pulse-todo.git
```

Enter the project folder:

```bash
cd purple-pulse-todo
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local app in the browser:

```text
http://localhost:5173
```

---

## User Stories Covered

### Authentication

* As a new user, I can create an account.
* As an existing user, I can log in.
* As a logged-in user, I can log out.

### Task Management

* As a logged-in user, I can create a new task.
* As a logged-in user, I can edit an existing task.
* As a logged-in user, I can mark a task as complete.
* As a logged-in user, I can mark a completed task as incomplete.
* As a logged-in user, I can delete a task.

---

## CRUD Operations

The app implements all CRUD operations through Supabase.

| CRUD Action | Feature                                |
| ----------- | -------------------------------------- |
| Create      | Add new task                           |
| Read        | Fetch logged-in user's tasks           |
| Update      | Edit task and mark complete/incomplete |
| Delete      | Delete task                            |

---

## Future Improvements

Possible future improvements include:

* Add due dates
* Add task categories
* Add search functionality
* Add drag-and-drop task ordering
* Add profile customization
* Add motivational quotes
* Add improved animations
* Add light/dark theme toggle

---

## Credits

Created by Michelle Recinos as part of the Ironhack final Vue.js project.

Tools and technologies used:

* Vue.js
* Vite
* Pinia
* Vue Router
* Supabase
* Tailwind CSS
* GitHub

---

## License

This project was created for educational purposes.