San Francisco de Paula Kindergarten

Web-based system developed to manage school enrollment records, students, guardians, and family relationships.

The application allows users to create, view, update, and delete information through a simple interface designed to make administrative records easy to find.

GENERAL DESCRIPTION

The system allows users to manage:

• Students
• Parents, guardians, or other responsible adults
• School enrollments
• Relationships between students and guardians
• Searches by first name, last name, DNI, phone number, class section, or status

The backend was developed with Spring Boot, the database uses MySQL, and the frontend was developed with React.

In the final integrated version, the frontend is compiled and included in the backend. This allows the entire application to run from a single .jar file.

MAIN FEATURES

STUDENTS

The system allows users to:

• Create student records
• Edit existing student information
• Delete students
• Search by first name, last name, DNI, nationality, or address
• View whether a student is active or inactive

GUARDIANS

The system allows users to:

• Create guardian records
• Edit existing guardian information
• Delete guardians
• Search by first name, last name, DNI, phone number, occupation, or nationality

ENROLLMENTS

The system allows users to:

• Create enrollments associated with existing students
• Edit enrollment information
• Delete enrollments
• Search by student, DNI, class section, academic year, or status
• Associate an enrollment with a previously registered student

Important: the order number is used as the enrollment identifier. It is entered when the enrollment is created and cannot be changed during editing.

STUDENT-GUARDIAN RELATIONSHIPS

The system allows users to:

• Associate a student with a guardian
• Specify the relationship: mother, father, guardian, grandparent, or other
• Search relationships by student, guardian, DNI, phone number, or class section
• Remove the relationship between a student and a guardian

This section is intended to make quick searches easier. For example:

• Search for a student and view their associated guardians
• Search for a guardian and view which student they are associated with
• Search by phone number or DNI

TECHNOLOGIES USED

BACKEND

• Java 21
• Spring Boot
• Spring Security
• JWT
• Spring Data JPA
• Hibernate
• Maven

FRONTEND

• React
• Vite
• JavaScript
• CSS

DATABASE

• MySQL

SYSTEM REQUIREMENTS

To run the final version of the application, the computer must have:

• Java 21 installed
• MySQL installed and running
• A MySQL database named jardin
• The generated .jar file
• An optional .bat startup file for launching the system from a desktop shortcut

Node.js, npm, Vite, and Visual Studio Code are not required to use the final compiled version.

DATABASE CONFIGURATION

The application uses a MySQL database named:

jardin

The connection settings are configured in:

src/main/resources/application.properties

Example configuration:

spring.datasource.url=jdbc:mysql://localhost:3306/jardin?
useSSL=false&
serverTimezone=America/Argentina/Buenos_Aires&
allowPublicKeyRetrieval=true

spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

JWT settings are configured in the same file:

jwt.secret=YOUR_JWT_SECRET
jwt.expiration=86400000

ADMINISTRATOR USER

The system uses JWT authentication.

To log in, at least one user must already exist in the usuarios table.

Example:

INSERT INTO usuarios (username, password, rol, activo)
VALUES ('admin', 'BCRYPT_PASSWORD_HASH', 'ADMIN', 1);

Passwords must not be stored as plain text. They must be stored as BCrypt hashes.

Example development credentials:

Username: admin
Password: admin123

These credentials should be changed before using the application with real information.

RUNNING THE SYSTEM IN DEVELOPMENT MODE

During development, the backend and frontend can be started separately.

BACKEND

From the project root directory:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

mvn.cmd spring-boot:run

The backend will be available at:

http://localhost:8080

FRONTEND

From the frontend directory:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente

npm.cmd run dev

The frontend will be available at:

http://localhost:5173

BUILDING THE FRONTEND FOR SPRING BOOT INTEGRATION

Before generating the .jar file, the frontend must be built.

From the frontend directory:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente

npm.cmd run build

This creates a directory named:

dist

The contents of dist must then be copied into:

src/main/resources/static

PowerShell example:

Copy-Item -Recurse -Force .\dist* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\

The final structure should look like this:

src/main/resources/static/index.html
src/main/resources/static/assets/

The files must not remain inside a dist directory. Only the contents of dist should be copied.

GENERATING THE .JAR FILE

From the backend root directory:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

mvn.cmd clean package

The generated file will be located at:

target/matriculas-0.0.1-SNAPSHOT.jar

RUNNING THE FINAL VERSION

To run the integrated application:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

java -jar target\matriculas-0.0.1-SNAPSHOT.jar

Then open the following address in a web browser:

http://localhost:8080

WINDOWS STARTUP FILE

A file named abrir-matriculas.bat can be created.

For example, it can be placed in:

C:\Users\jerem\Documents\SanFraciscoJardin

Suggested contents:

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

A desktop shortcut can then be created for this file.

PROJECT STRUCTURE

matriculas

├── src
│ ├── main
│ │ ├── java
│ │ │ └── ar.edu.sanfrancisco.matriculas
│ │ │ ├── Code
│ │ │ │ ├── backend
│ │ │ │ │ ├── Controller
│ │ │ │ │ ├── dto
│ │ │ │ │ ├── Model
│ │ │ │ │ ├── Repository
│ │ │ │ │ ├── Security
│ │ │ │ │ └── Service
│ │ │ │ └── frontend
│ │ │ │ └── Cliente
│ │ │ └── MatriculasApplication.java
│ │ └── resources
│ │ ├── application.properties
│ │ └── static
│ │ ├── index.html
│ │ └── assets
│ └── test
├── target
├── pom.xml
└── README.md

MAIN API ENDPOINTS

AUTHENTICATION

POST /api/auth/login

STUDENTS

GET /api/alumnos
POST /api/alumnos
GET /api/alumnos/{id}
PUT /api/alumnos/{id}
DELETE /api/alumnos/{id}

GUARDIANS

GET /api/responsables
POST /api/responsables
GET /api/responsables/{id}
PUT /api/responsables/{id}
DELETE /api/responsables/{id}

ENROLLMENTS

GET /api/matriculas
POST /api/matriculas
GET /api/matriculas/{nroOrden}
PUT /api/matriculas/{nroOrden}
DELETE /api/matriculas/{nroOrden}

STUDENT-GUARDIAN RELATIONSHIPS

GET /api/alumno-responsable/buscar
POST /api/alumno-responsable
GET /api/alumno-responsable/alumno/{idAlumno}
DELETE /api/alumno-responsable/{idAlumnoResponsable}

IMPORTANT CONSIDERATIONS

• The application is intended for local use or use within an internal network.
• MySQL must be running before the application starts.
• At least one administrator user must already exist in the database.
• When the frontend is modified, npm run build must be executed again.
• The contents of dist must be copied into the static directory.
• The .jar file must be regenerated after backend or frontend changes.
• The enrollment order number is used as the primary key and cannot be changed after creation.
• Students or guardians with active relationships should not be deleted before reviewing their associated records.

RECOMMENDED WORKFLOW
Start the application using the desktop shortcut or the .jar file.
Log in with a username and password.
Create the student records.
Create the guardian records.
Link students with their guardians.
Create enrollments associated with students.
Use the search fields to quickly locate information.
MAINTENANCE

WHEN THE FRONTEND IS UPDATED

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente

npm.cmd run build

Copy-Item -Recurse -Force .\dist* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

mvn.cmd clean package

WHEN ONLY THE BACKEND IS UPDATED

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

mvn.cmd clean package

PROJECT STATUS

The project currently includes:

• JWT authentication
• Protected backend endpoints
• React frontend integrated into Spring Boot
• Student management
• Guardian management
• Enrollment management
• Student-guardian relationship management
• Search functionality in the main sections
• Execution from a single .jar file
