# Enrollment Management System

Enrollment management application developed for San Francisco de Paula Kindergarten.

The system is used to manage students, guardians, enrollments, and the relationships between students and their family members or legal guardians. It was designed as a local administrative tool, with a simple interface for finding and updating records.

## Main features

The application includes:

- Student management
- Guardian management
- School enrollment records
- Student–guardian relationships
- Search by name, DNI, phone number, class section, academic year, or status
- JWT authentication
- Active and inactive record tracking

The enrollment order number is used as the enrollment identifier. It is assigned when the enrollment is created and cannot be changed later.

## Tech stack

The backend was developed with Java 21, Spring Boot, Spring Security, Spring Data JPA, Hibernate, JWT, and Maven.

The frontend was built with React, Vite, JavaScript, and CSS.

MySQL is used as the database.

For the final build, the React frontend is included in the Spring Boot static resources, allowing the application to run from a single `.jar` file.

## Requirements

To run the compiled application, the computer must have Java 21 and MySQL installed.

The application expects a MySQL database named `jardin`. Database credentials are configured in `src/main/resources/application.properties`.

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jardin?\
useSSL=false&\
serverTimezone=America/Argentina/Buenos_Aires&\
allowPublicKeyRetrieval=true

spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=YOUR_JWT_SECRET
jwt.expiration=86400000
