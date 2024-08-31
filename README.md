# Project Management Tool

This is a simple project management tool built with Laravel, providing a basic interface for creating, updating, deleting, and managing projects and tasks. The frontend is implemented using plain HTML, CSS, and JavaScript. Real-time updates are powered by Laravel Echo and Pusher, ensuring that tasks are updated dynamically without needing to refresh the page.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Design Pattern](#design-pattern)
- [Code Structure](#code-structure)
- [Usage](#usage)
- [Credits](#credits)

## Features

- **CRUD Operations for Projects and Tasks**: Create, read, update, and delete projects and tasks.
- **Real-Time Updates**: Automatically update the task list when a new task is added using Laravel Echo and Pusher.
- **Authentication**: Basic user authentication using Laravel's sanctum.
- **User-Friendly Interface**: Simple and intuitive UI with responsive design.
- **Task Filtering**: Filter tasks by their status (To Do, In Progress, Done).

## Installation

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js with npm
- MySQL or MariaDB
- Pusher Account (for real-time updates)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/project-management-tool.git
   cd project-management-tool
   ```
2. **Install PHP Dependencies:**

   ```bash
   composer install
   ```
3. **Install JavaScript Dependencies:**

   ```bash
   npm install
   ```
4. **Set Up Environment Variables:**

   Copy the `.env.example` file to `.env` and update the following fields with your database and Pusher credentials:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file:

   ```dotenv
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=project_management
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password

   SESSION_DOMAIN=localhost
   SANCTUM_STATEFUL_DOMAINS=localhost

   BROADCAST_DRIVER=pusher
   PUSHER_APP_ID=your-pusher-app-id
   PUSHER_APP_KEY=your-pusher-app-key
   PUSHER_APP_SECRET=your-pusher-app-secret
   PUSHER_APP_CLUSTER=your-pusher-cluster
   ```
5. **Run Migrations and Seed the Database:**

   ```bash
   php artisan migrate --seed
   ```
6. **Run the Development Server:**

   ```bash
   php artisan serve
   ```

   Your application will be accessible at `http://127.0.0.1:8000`.

## Usage

- **Access the Application:** Navigate to `http://127.0.0.1:8000` in your web browser.
- **Authentication:** Register a new user or log in with an existing account.
- **Manage Projects and Tasks:**
  - View a list of all projects.
  - Create, update, or delete projects.
  - View tasks associated with a specific project.
  - Add, update, or delete tasks.
  - Filter tasks by their status.
- **Real-Time Updates:**
  - The task list automatically updates when a new task is added or existing tasks are modified.

## Design Pattern

This project utilizes the **Repository Pattern** to abstract the data access layer for Projects and Tasks. By separating the business logic from the data access logic, the application achieves better modularity, making it easier to manage and maintain.

### Example:

- **ProjectRepository**: Handles all database operations related to projects.
- **TaskRepository**: Manages database interactions for tasks.

The repositories are injected into the controllers to ensure a clean separation of concerns and promote code reusability.

## Code Structure

The project follows a clean and organized code structure:

- **app/Http/Controllers/**: Contains the controllers that handle HTTP requests.
- **app/Repositories/**: Contains the repositories for managing data access.
- **database/migrations/**: Database migration files.
- **database/seeders/**: Seeders for populating the database with initial data.
- **public/**: Contains the frontend files (HTML, CSS, JS).
  - `js/auth.js`: Manages authentication-related JavaScript logic.
  - `js/tasks.js`: Handles task management logic and real-time updates.
  - `css/styles.css`: Stylesheet for the frontend.
  - `projects.html`
  - `project-details.html`
  - `login.html`
  - `register.html`
- **routes/web.php**: Contains the web routes for the application.
- **routes/api.php**: Contains the API routes used by the frontend.


## Usage

### Authentication

* **Login** : Navigate to `/login.html` to log in.
* **Register** : Navigate to `/register.html` to create a new account.

### Projects

* **List Projects** : Navigate to `/projects.html` to view all projects.
* **Create/Update Project** : Use the form on the project page to create or update a project.

### Tasks

* **View Tasks** : Click view button beside a project to view the tasks attached to it, it takes you to `/project-details.html`.
* **Add/Update Task** : Use the form on the task page to create or update a task in a project
* **Delete Task** : Click the delete button beside each task to delete tasks

## Credits

This project was developed by Lolade. Special thanks to the Laravel and Pusher communities for providing excellent tools and documentation.
