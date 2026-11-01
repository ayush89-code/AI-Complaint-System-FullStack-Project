# Complaint Management System

A full-stack web application for submitting, tracking, and managing student complaints. Students can register, log in, submit complaints, and view their complaint history. Administrators can review all complaints and update their statuses.

## Features

### Student
- Register and log in using an email address and password
- Submit a complaint
- View submitted complaints and their current status
- Delete a complaint they submitted

### Administrator
- Log in using an administrator account
- View all submitted complaints
- Update complaint status

### Complaint classification
The backend includes rule-based text analysis that:
- Assigns a department (Academic, Hostel, Faculty, Infrastructure, or Administration)
- Estimates priority (High, Medium, or Low)
- Calculates a severity score
- Generates an automated acknowledgement
- Escalates selected high-priority complaints

> The classification logic is keyword-based; it is not a machine-learning model or external AI integration.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS |
| Backend | Java 17, Spring Boot, Spring Web MVC, Spring Data JPA, Spring Security |
| Database | MySQL |
| Build tools | Maven, npm |

## Project Structure

```text
Complaint System FullStack Project/
├── complaint-system-Backend/       # Spring Boot REST API
│   ├── src/main/java/              # Controllers, entities, repositories, services
│   ├── src/main/resources/
│   │   └── application.properties  # Local database configuration
│   └── pom.xml
└── Complaint-system-Frontend/       # React + Vite client
    ├── src/
    │   ├── components/
    │   └── pages/
    ├── package.json
    └── vite.config.js
```

## Prerequisites

Install the following before running the project:

- Java 17 or later
- MySQL Server
- Node.js and npm
- Git (optional)

## Setup and Run

### 1. Configure the database

Create the MySQL database:

```sql
CREATE DATABASE complaint_db;
```

In `complaint-system-Backend/src/main/resources/application.properties`, configure your local database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/complaint_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

Do not commit real database credentials. Prefer environment variables or a local, untracked configuration file for secrets.

### 2. Start the backend

Open a terminal in the backend directory:

```bash
cd complaint-system-Backend
```

On Windows:

```bat
mvnw.cmd spring-boot:run
```

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

### 3. Start the frontend

Open another terminal in the frontend directory:

```bash
cd Complaint-system-Frontend
npm install
npm run dev
```

Vite normally serves the frontend at:

```text
http://localhost:5173
```

Open that address in your browser. The backend CORS configuration currently permits the local Vite origin.

## API Endpoints

Base URL: `http://localhost:8080`

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/student/register` | Register a student |
| POST | `/api/auth/student/login` | Student login |
| POST | `/api/auth/admin/login` | Administrator login |

### Complaints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/complaints/submit/{studentId}` | Submit a complaint |
| GET | `/api/complaints/student/{studentId}` | Get a student's complaints |
| GET | `/api/complaints/admin/all` | Get all complaints (admin view) |
| PUT | `/api/complaints/admin/update-status/{complaintId}?status={status}` | Update complaint status |
| DELETE | `/api/complaints/delete/{complaintId}/student/{studentId}` | Delete a complaint owned by the student |

### Example request bodies

Student registration/login:

```json
{
  "name": "Example Student",
  "email": "student@example.com",
  "password": "change-me"
}
```

Complaint submission:

```json
{
  "description": "The water supply in the hostel is not working."
}
```

Status update example:

```http
PUT /api/complaints/admin/update-status/1?status=Resolved
```

Use the field names defined by the backend entities/DTOs if your local version differs.

## Configuration Notes

- Backend port: `8080`
- Frontend development port: `5173`
- Database: `complaint_db`
- JPA schema generation: `update`

## Security Considerations

This project is a learning/demo application and should be hardened before production use. In particular:

- The current authentication implementation compares passwords directly; use BCrypt or another adaptive password hash.
- Add proper server-side authorization and session/token handling. Do not rely on frontend route protection alone.
- Avoid returning password fields in API responses; use response DTOs.
- Validate and sanitize user input, and add centralized exception handling.
- Move database credentials to environment variables and rotate any credentials that have been exposed.
- Restrict CORS to trusted origins.

## Future Improvements

- Secure authentication with hashed passwords and JWT/session-based authorization
- Role-based authorization for complaint management endpoints
- Email or in-app notifications
- Search, filtering, pagination, and analytics for administrators
- Unit and integration tests
- Deployment configuration and environment-specific profiles

## License

No license has been specified. Add a license file before distributing the project.
