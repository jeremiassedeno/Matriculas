# Enrollments

## Enrollment Management System — San Francisco de Paula Kindergarten

Web-based system developed to manage school enrollment records, students, parents or guardians, and family relationships.

The application allows users to create, view, update, and delete information through a simple interface designed to make administrative data easy to find.

## 1. General Description

The system allows users to manage:

* Students.
* Parents, guardians, or other responsible adults.
* School enrollments.
* Relationships between students and guardians.
* Quick searches by first name, last name, DNI, phone number, class section, or status.

The application has a backend developed with Spring Boot, a MySQL database, and a frontend developed with React.

In the final integrated version, the frontend is compiled and included within the backend. Therefore, the entire system runs from a single `.jar` file.

## 2. Main Features

### Students

The system allows users to:

* Create student records.
* Edit existing student information.
* Delete students.
* Search for students by first name, last name, DNI, nationality, or address.
* View whether a student is active or inactive.

### Guardians

The system allows users to:

* Create guardian records.
* Edit existing guardian information.
* Delete guardians.
* Search by first name, last name, DNI, phone number, occupation, or nationality.

### Enrollments

The system allows users to:

* Create enrollments associated with existing students.
* Edit enrollment information.
* Delete enrollments.
* Search by student, DNI, class section, academic year, or status.
* Associate an enrollment with a previously registered student.

**Important:** The order number works as the enrollment identifier. For this reason, it is entered when the enrollment is created, but it cannot be modified during editing.

### Student–Guardian Relationships

The system allows users to:

* Associate a student with a guardian.
* Specify the relationship: mother, father, guardian, grandparent, or other.
* Search for relationships by student, guardian, DNI, phone number, or class section.
* Remove the relationship between a guardian and a student.

This section is designed to make quick searches easier, for example:

* Search for a student and view their associated guardians.
* Search for a guardian and view which student they are associated with.
* Search by phone number or DNI.

## 3. Technologies Used

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
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

## 4. System Requirements

To run the final version of the system on a computer, the following components are required:

* Java 21 installed.
* MySQL installed and running.
* A database named `jardin`.
* The generated system `.jar` file.
* A startup `.bat` file, when launching the system from a desktop shortcut is desired.

Node.js, npm, Vite, and Visual Studio Code are not required to use the final compiled version.

## 5. Database Configuration

The system uses a MySQL database named:

```text
jardin
```

The database connection credentials are configured in:

```text
src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jardin?useSSL=false&serverTimezone=America/Argentina/Buenos_Aires&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

JWT settings are also configured in this file:

```properties
jwt.secret=super_secret_secure_key_for_enrollments_2026
jwt.expiration=86400000
```

## 6. Administrator User

The system uses JWT-based authentication.

To log in, a user must already exist in the `usuarios` table.

Example:

```sql
INSERT INTO usuarios (username, password, rol, activo)
VALUES ('admin', 'BCRYPT_PASSWORD_HASH', 'ADMIN', 1);
```

The password must not be stored as plain text. It must be stored using the BCrypt format.

Example test credentials:

```text
Username: admin
Password: admin123
```

## 7. Running the System in Development Mode

During development, the backend and frontend can be started separately.

### Backend

From the project root directory:

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

The frontend will be available at:

```text
http://localhost:5173
```

## 8. Building the Frontend for Spring Boot Integration

Before generating the `.jar` file, the frontend must be built.

From the frontend directory:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run build
```

This generates a directory named:

```text
dist
```

The contents of `dist` must then be copied into:

```text
src/main/resources/static
```

Example:

```powershell
Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\
```

The final structure must look like this:

```text
src/main/resources/static/index.html
src/main/resources/static/assets/
```

The files must not remain inside a `dist` directory.

## 9. Generating the `.jar` File

From the backend root directory:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
```

The generated file will be located at:

```text
target/matriculas-0.0.1-SNAPSHOT.jar
```

## 10. Running the Final Version

To run the integrated system:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
java -jar target\matriculas-0.0.1-SNAPSHOT.jar
```

Then open the following address in a web browser:

```text
http://localhost:8080
```

## 11. `.bat` File for Starting the System

A file named the following can be created:

```text
abrir-matriculas.bat
```

For example, it can be placed in:

```text
C:\Users\jerem\Documents\SanFraciscoJardin
```

Suggested contents:

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

A desktop shortcut to the `.bat` file can then be created.

## 12. General Project Structure

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

## 13. Main Endpoints

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

## 14. Important Considerations

* The system is intended for local use on a computer or internal network.
* MySQL must be running before the application is started.
* The administrator user must already exist in the database.
* When the frontend is modified, `npm run build` must be executed again, the contents of `dist` must be copied into `static`, and the `.jar` file must be regenerated.
* The enrollment order number works as the primary key and must not be modified when editing an enrollment.
* To prevent errors, it is not recommended to delete students or guardians who have active relationships without first reviewing their associated relationships or enrollments.

## 15. Recommended Usage Workflow

1. Start the system from the desktop shortcut or by running the `.jar` file.
2. Log in with a username and password.
3. Create the student records.
4. Create the guardian records.
5. Create relationships between students and guardians.
6. Create enrollments associated with students.
7. Use the search bars to quickly locate information.

## 16. Maintenance

When changes are made to the frontend:

```powershell
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run build
Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
```

When changes are made only to the backend:

```bat
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
```

## 17. Project Status

The system currently includes:

* JWT-based login.
* Protected backend.
* Frontend integrated into Spring Boot.
* Student management.
* Guardian management.
* Enrollment management.
* Student–guardian relationship management.
* Search functionality in the main sections.
* Execution through a `.jar` file.

