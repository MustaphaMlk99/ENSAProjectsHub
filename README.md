# GPE-ENSAK

## Overview

GPE-ENSAK is a web-based project management system for ENSAK (École Nationale des Sciences Appliquées de Kénitra). It connects students, professors, and administrators to streamline the lifecycle of student capstone projects. Students can submit project proposals and deliverables, view feedback, and track project progress. Professors can supervise assigned projects, review submissions, and assign grades. Administrators have full control over managing users (students and professors), projects, modules, and system settings. The application is built with Angular 19 on the frontend, Laravel on the backend, and MySQL as the database.

## Features

* **Student Portal:** Students can submit project proposals, upload deliverables, view evaluation feedback, and track their project status.
* **Professor Portal:** Professors can supervise and review student projects, provide remarks on submissions, and assign or update grades.
* **Admin Dashboard:** Administrators can manage all users (students and professors) and projects with full CRUD (Create, Read, Update, Delete) functionality. They can assign academic modules and keywords to projects for categorization, view system-wide statistics, and generate or export reports (e.g., CSV or PDF) of project and user data.

## Technology Stack

| Component      | Technology            |
| -------------- | --------------------- |
| Frontend       | Angular 19            |
| Backend        | Laravel (PHP 8+)      |
| Database       | MySQL                 |
| Authentication | Laravel Sanctum (API) |

## Setup and Installation

### Prerequisites

* Node.js (v16 or later) and npm
* Angular CLI (v15 or later)
* PHP (v8.0 or later) and Composer
* MySQL database server

### Backend (Laravel) Setup

* **Clone the repository and navigate to the backend folder**:

  ```bash
  git clone https://github.com/YourUsername/gpe-ensak.git
  cd gpe-ensak/backend
  ```
* **Install PHP dependencies**:

  ```bash
  composer install
  ```
* **Configure environment**:

  ```bash
  cp .env.example .env
  php artisan key:generate
  ```

  Edit the `.env` file to set your MySQL credentials (DB\_HOST, DB\_DATABASE, DB\_USERNAME, DB\_PASSWORD).
* **Run database migrations and seed sample data**:

  ```bash
  php artisan migrate --seed
  ```

  This command creates the database tables and seeds default users and sample data.
* **Start the development server**:

  ```bash
  php artisan serve
  ```

  The backend API will be available at `http://localhost:8000`.

### Frontend (Angular) Setup

* **Navigate to the frontend folder**:

  ```bash
  cd ../frontend
  ```
* **Install Node.js dependencies**:

  ```bash
  npm install
  ```
* **Configure the Angular environment**:
  Copy the example environment file and set the API base URL:

  ```bash
  cp src/environments/environment.example.ts src/environments/environment.ts
  ```

  Edit `src/environments/environment.ts` to point to the backend API, for example:

  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api'
  };
  ```
* **Run the Angular development server**:

  ```bash
  ng serve --open
  ```

  This will start the app in your browser at `http://localhost:4200`.

### Default URLs and Sample Credentials

Use the web application at `http://localhost:4200` to log in. The following sample accounts are available after seeding:

| Role          | Email                  | Password         |
| ------------- | ---------------------- | ---------------- |
| Administrator | `admin@ensak.ac.ma`    | `AdminPass123`   |
| Professor     | `prof1@ensak.ac.ma`    | `ProfPass123`    |
| Student       | `student1@ensak.ac.ma` | `StudentPass123` |

## Project Structure and Modules

### Backend (Laravel)

* `app/Models`: Eloquent models for database entities (e.g., `User`, `Project`, `Deliverable`, etc.).
* `app/Http/Controllers`: API controllers handling request logic (e.g., `ProjectController`, `UserController`, etc.).
* `database/migrations`: Database migration files defining the schema for projects, users, and related tables.
* `routes/api.php`: Defines the API endpoints consumed by the frontend Angular application.
* **Additional Directories:** The standard Laravel folder structure also includes `app/Http/Middleware`, `app/Providers`, and `database/seeders`.

### Frontend (Angular)

* `src/app/modules`: Angular feature modules for each user role and functionality:

  * `StudentModule`: Components for project submission, deliverable uploads, and viewing evaluation results.
  * `ProfessorModule`: Components for supervising projects, adding remarks, and grading.
  * `AdminModule`: Components for managing users, projects, modules, and viewing statistics.
* `src/app/services`: Angular services for communicating with the backend API (e.g., `AuthService`, `ProjectService`, `UserService`).
* `src/app/shared`: Shared components, directives, and models used across different modules.
* `src/app/app-routing.module.ts`: Configures client-side routes for login pages and feature dashboards.

## Admin Dashboard & Statistics

The administrator has access to a comprehensive dashboard with the following features:

* **System Statistics:** Displays metrics such as total numbers of students, professors, and projects. It also shows distribution of projects by status (e.g., submitted, in progress, completed).
* **User and Project Management:** Administrators can create, update, or delete student and professor accounts, as well as project entries. They can also assign academic modules and keywords to categorize projects.
* **Data Export and Reports:** Provides functionality to export project and user data in CSV or PDF formats for reporting. Admins can generate lists of projects by various filters (e.g., by supervisor or status).
* **Configuration:** Admins can configure system settings such as project submission deadlines, evaluation criteria, and other application parameters.
