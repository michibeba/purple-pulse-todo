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

- Sign up with email and password
- Confirm password when creating a new account
- Log in with an existing account
- Log out securely
- Access the dashboard only when authenticated

The authentication form includes two modes:

- Login mode
- Sign up mode

The confirm password field only appears when the user is creating a new account.

### Demo Authentication Note

For this demo project, email confirmation is disabled because the Supabase free email sender has a limited number of confirmation emails available during development.

Authentication is still handled through Supabase, including:

- User creation
- User login
- User logout
- Protected dashboard access
- User-specific task storage

### Task Management

Logged-in users can:

- Add new tasks
- View their personal task list
- Edit existing tasks
- Mark tasks as complete
- Mark completed tasks as incomplete
- Delete tasks permanently

### Dashboard Features

The dashboard includes:

- Total task count
- Pending task count
- Completed task count
- Progress percentage
- Animated progress bar
- Full-page celebration overlay when progress reaches 100%
- Filters for:
  - All tasks
  - Pending tasks
  - Completed tasks
- Priority labels:
  - High
  - Medium
  - Low
- Task sorting by priority, with high-priority tasks shown first
- Daily Focus motivational quote card
- Dynamic visual card that changes with the focus quote

### Design

The user interface uses a dark purple BTS/anime-inspired aesthetic with:

- Purple and pink gradients
- Dark dashboard background
- Rounded cards
- Responsive layout
- Neon-style accents
- Animated progress states
- Sparkle/confetti-style celebration overlay
- Glowing visual elements
- Clean reusable task cards

---

## Tech Stack

### Frontend

- Vue 3
- Vite
- Vue Router
- Pinia
- Tailwind CSS

### Backend / Database

- Supabase
- Supabase Authentication
- Supabase PostgreSQL Database

### Deployment

- Netlify

### State Management

- Pinia
- Pinia persisted state plugin

---

## Project Structure

```text
src/
├── components/
│   ├── CelebrationOverlay.vue
│   ├── DailyFocusCard.vue
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

| Column | Type | Description |
|---|---|---|
| id | uuid | Unique task ID |
| created_at | timestamp | Date the task was created |
| title | text | Task title |
| description | text | Optional task description |
| completed | boolean | Task completion status |
| priority | text | Task priority level |
| user_id | uuid | ID of the authenticated user |

---

## Supabase Security

Row Level Security is enabled on the `tasks` table.

The app uses policies so that authenticated users can only:

- View their own tasks
- Create tasks linked to their own user ID
- Update their own tasks
- Delete their own tasks

This helps protect user data and ensures each user only interacts with their personal task list.

---

## Environment Variables

The app requires a `.env` file in the root folder.

Example:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The `.env` file is ignored by Git and should not be uploaded to GitHub.

For Netlify deployment, the same variables must be added in the Netlify environment variable settings.

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

## Build

To create a production build:

```bash
npm run build
```

The production files are generated in the `dist` folder.

---

## Deployment

The app is deployed using Netlify.

Netlify build settings:

| Setting | Value |
|---|---|
| Build command | npm run build |
| Publish directory | dist |

A `netlify.toml` file is included to support Vue Router redirects on deployment.

---

## User Stories Covered

### Authentication

- As a new user, I can create an account.
- As a new user, I can confirm my password while signing up.
- As an existing user, I can log in.
- As a logged-in user, I can log out.
- As a logged-out user, I cannot access the dashboard.

### Task Management

- As a logged-in user, I can create a new task.
- As a logged-in user, I can view my personal task list.
- As a logged-in user, I can edit an existing task.
- As a logged-in user, I can mark a task as complete.
- As a logged-in user, I can mark a completed task as incomplete.
- As a logged-in user, I can delete a task.

---

## CRUD Operations

The app implements all CRUD operations through Supabase.

| CRUD Action | Feature |
|---|---|
| Create | Add new task |
| Read | Fetch logged-in user's tasks |
| Update | Edit task and mark complete/incomplete |
| Delete | Delete task |

After each create, update, or delete action, the task store fetches the latest data from Supabase so the dashboard stays updated.

---

## Code Quality

The app is structured with reusable Vue components and separate stores for authentication and task data.

Reusable components include:

- `TaskForm.vue`
- `TaskCard.vue`
- `StatsCard.vue`
- `ProgressCard.vue`
- `DailyFocusCard.vue`
- `CelebrationOverlay.vue`

Pinia is used to manage application state, and Supabase requests are handled with async/await.

---

## Future Improvements

Possible future improvements include:

- Add due dates
- Add task categories
- Add search functionality
- Add drag-and-drop task ordering
- Add profile customization
- Add a light/dark theme toggle
- Add more dashboard visual themes
- Add additional productivity statistics

---

## Credits

Created by Michelle Recinos Pino as part of the Ironhack final Vue.js project.

Tools and technologies used:

- Vue.js
- Vite
- Pinia
- Vue Router
- Supabase
- Tailwind CSS
- Netlify
- GitHub

---

## License

This project was created for educational purposes.