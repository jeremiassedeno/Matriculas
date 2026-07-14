# Enrollment Management System

Web application developed for **San Francisco de Paula Kindergarten** to manage students, guardians, school enrollments, and family relationships.

The system provides a simple interface for creating, updating, searching, and deleting administrative records.

## Features

### Student Management

* Create, edit, and delete student records.
* Search by first name, last name, DNI, nationality, or address.
* View whether a student is active or inactive.

### Guardian Management

* Create, edit, and delete guardians.
* Search by name, DNI, phone number, occupation, or nationality.

### Enrollment Management

* Create enrollments for existing students.
* Edit and delete enrollment records.
* Search by student, DNI, class section, academic year, or status.
* Link each enrollment to a previously registered student.

The enrollment order number is used as the primary identifier. It is entered when the enrollment is created and cannot be changed later.

### Student and Guardian Relationships

* Link students to parents, guardians, grandparents, or other responsible adults.
* Search relationships by student, guardian, DNI, phone number, or class section.
* View all guardians linked to a student.
* View the students linked to a guardian.
* Remove existing relationships.

## Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* JSON Web Tokens
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React
* Vite
* JavaScript
* CSS

### Database

* MySQL

## Application Structure

The backend is built with Spring Boot and the frontend with React.

For the final version, the React application is compiled and copied into Spring Boot's static resources directory. This allows the complete system to run from a single `.jar` file.

## Requirements

To run the compiled application, the computer must have:

* Java 21
* MySQL
* A MySQL database named `jardin`
* The generated `.jar` file

Node.js, npm, Vite, and Visual Studio Code are only required for development. They are not needed to run the final compiled application.

## Database Configuration

Database settings are located in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jardin?useSSL=false&serverTimezone=America/Argentina/Buenos_Aires&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

JWT settings are configured in the same file:

```properties
jwt.secret=super_secret_secure_key_for_enrollments_2026
jwt.expiration=86400000
```

For production use, the JWT secret and database password should be stored securely and should not be committed to the repository.

## Administrator Account

Authentication is handled with JWT.

Before logging in, an administrator account must exist in the `usuarios` table.

Example:

```sql
INSERT INTO usuarios (username, password, rol, activo)
VALUES ('admin', 'BCRYPT_PASSWORD_HASH', 'ADMIN', 1);
```

Passwords must be stored as BCrypt hashes, not as plain text.

Example development credentials:

```text
Username: admin
Password: admin123
```

These credentials should be changed before using the application with real information.

## Running the Project in Development

During development, the backend and frontend can be started separately.

### Backend

From the project root:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

### Frontend

From the frontend directory:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run dev
```

The development server will be available at:

```text
http://localhost:5173
```

## Building the Frontend

Before generating the final `.jar`, build the React application:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run build
```

This creates a `dist` directory.

Copy the contents of `dist` into:

```text
src/main/resources/static
```

PowerShell example:

```powershell
Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\
```

The resulting structure should look like this:

```text
src/main/resources/static/index.html
src/main/resources/static/assets/
```

The `dist` directory itself should not be copied into `static`; only its contents are needed.

## Generating the JAR File

From the project root:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
```

The generated file will be located at:

```text
target/matriculas-0.0.1-SNAPSHOT.jar
```

## Running the Compiled Application

Run the application with:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
java -jar target\matriculas-0.0.1-SNAPSHOT.jar
```

Then open:

```text
http://localhost:8080
```

MySQL must be running before starting the application.

## Windows Startup Script

A `.bat` file can be used to start the application and open it in the browser automatically.

Example file name:

```text
abrir-matriculas.bat
```

Example contents:

```bat
@echo off
title Enrollment Management System

set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;%PATH%

cd /d C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

echo Starting Enrollment Management System...

start "Enrollment System" cmd /k "java -jar target\matriculas-0.0.1-SNAPSHOT.jar"

timeout /t 10 /nobreak > nul

start http://localhost:8080

exit
```

A desktop shortcut can then be created for this file.

## Project Structure

```text
matriculas
├── src
│   ├── main
│   │   ├── java
│   │   │   └── ar.edu.sanfrancisco.matriculas
│   │   │       ├── Code
│   │   │       │   ├── backend
│   │   │       │   │   ├── Controller
│   │   │       │   │   ├── dto
│   │   │       │   │   ├── Model
│   │   │       │   │   ├── Repository
│   │   │       │   │   ├── Security
│   │   │       │   │   └── Service
│   │   │       │   └── frontend
│   │   │       │       └── Cliente
│   │   │       └── MatriculasApplication.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── static
│   │           ├── index.html
│   │           └── assets
│   └── test
├── target
├── pom.xml
└── README.md
```

## API Endpoints

### Authentication

```http
POST /api/auth/login
```

### Students

```http
GET    /api/alumnos
POST   /api/alumnos
GET    /api/alumnos/{id}
PUT    /api/alumnos/{id}
DELETE /api/alumnos/{id}
```

### Guardians

```http
GET    /api/responsables
POST   /api/responsables
GET    /api/responsables/{id}
PUT    /api/responsables/{id}
DELETE /api/responsables/{id}
```

### Enrollments

```http
GET    /api/matriculas
POST   /api/matriculas
GET    /api/matriculas/{nroOrden}
PUT    /api/matriculas/{nroOrden}
DELETE /api/matriculas/{nroOrden}
```

### Student–Guardian Relationships

```http
GET    /api/alumno-responsable/buscar
POST   /api/alumno-responsable
GET    /api/alumno-responsable/alumno/{idAlumno}
DELETE /api/alumno-responsable/{idAlumnoResponsable}
```

## Recommended Workflow

A typical workflow is:

1. Start the application.
2. Log in with an administrator account.
3. Add student records.
4. Add guardians.
5. Link students with their guardians.
6. Create the corresponding enrollments.
7. Use the search fields to locate records when needed.

## Maintenance

When the frontend is updated:

```powershell
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente

npm.cmd run build

Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

mvn.cmd clean package
```

When only backend code is updated:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
```

## Notes

* The application is intended for local use or use within an internal network.
* MySQL must be running before the application starts.
* At least one administrator account must exist in the database.
* The frontend must be rebuilt and copied into `static` after every frontend change.
* The `.jar` file must be regenerated after backend or frontend updates.
* Enrollment order numbers cannot be changed after an enrollment is created.
* Students or guardians with active relationships should not be deleted before reviewing their associated records.

## Current Status

The project currently includes:

* JWT authentication
* Protected backend endpoints
* React frontend integrated into Spring Boot
* Student management
* Guardian management
* Enrollment management
* Student–guardian relationship management
* Search functionality
* Execution from a single `.jar` file
