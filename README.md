# Matriculas
Sistema de Matrículas - Jardín San Francisco de Paula

Sistema web desarrollado para gestionar la información de matrículas escolares, alumnos, responsables/tutores y vínculos familiares.
La aplicación permite cargar, consultar, modificar y eliminar información desde una interfaz sencilla, pensada para facilitar la búsqueda rápida de datos administrativos.

1. Descripción general

El sistema permite administrar:

Alumnos.
Responsables, padres, madres o tutores.
Matrículas escolares.
Vínculos entre alumnos y responsables.
Búsqueda rápida por nombre, apellido, DNI, teléfono, sección o estado.

La aplicación cuenta con un backend desarrollado en Spring Boot, una base de datos MySQL y un frontend desarrollado en React.
En la versión final integrada, el frontend se encuentra compilado dentro del backend, por lo que el sistema se ejecuta desde un único archivo .jar.

2. Funcionalidades principales
Alumnos

Permite:

Crear alumnos.
Editar datos de alumnos existentes.
Eliminar alumnos.
Buscar alumnos por nombre, apellido, DNI, nacionalidad o dirección.
Visualizar estado activo/inactivo.
Responsables

Permite:

Crear responsables.
Editar responsables existentes.
Eliminar responsables.
Buscar por nombre, apellido, DNI, teléfono, ocupación o nacionalidad.
Matrículas

Permite:

Crear matrículas asociadas a alumnos existentes.
Editar datos de matrícula.
Eliminar matrículas.
Buscar por alumno, DNI, sección, ciclo lectivo o estado.
Asociar una matrícula a un alumno previamente cargado.

Importante: el número de orden funciona como identificador de la matrícula. Por ese motivo, se carga al crear la matrícula, pero no se modifica durante la edición.

Vínculos alumno-responsable

Permite:

Asociar un alumno con un responsable.
Indicar el vínculo: madre, padre, tutor, abuelo/a u otro.
Buscar vínculos por alumno, responsable, DNI, teléfono o sección.
Desvincular responsables de un alumno.

Esta sección está pensada para facilitar consultas rápidas, por ejemplo:

Buscar un alumno y ver sus responsables asociados.
Buscar un responsable y ver con qué alumno está vinculado.
Buscar por teléfono o DNI.
3. Tecnologías utilizadas
Backend
Java 21
Spring Boot
Spring Security
JWT
Spring Data JPA
Hibernate
Maven
Frontend
React
Vite
JavaScript
CSS
Base de datos
MySQL
4. Requisitos para ejecutar el sistema

Para ejecutar la versión final del sistema en una computadora, se necesita:

Java 21 instalado.
MySQL instalado y en ejecución.
Base de datos jardin creada.
Archivo .jar generado del sistema.
Archivo .bat de inicio, si se desea abrir desde un acceso directo.

No es necesario tener instalado Node.js, npm, Vite ni Visual Studio Code para usar la versión final compilada.

5. Configuración de base de datos

El sistema utiliza una base de datos MySQL llamada:

jardin

Las credenciales de conexión se configuran en el archivo:

src/main/resources/application.properties

Ejemplo de configuración:

spring.datasource.url=jdbc:mysql://localhost:3306/jardin?useSSL=false&serverTimezone=America/Argentina/Buenos_Aires&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

También se configuran los datos de JWT:

jwt.secret=clave_super_secreta_para_matriculas_2026_segura
jwt.expiration=86400000
6. Usuario administrador

El sistema utiliza login con JWT.
Para ingresar se necesita tener un usuario cargado en la tabla usuarios.

Ejemplo:

INSERT INTO usuarios (username, password, rol, activo)
VALUES ('admin', 'HASH_BCRYPT_DE_LA_PASSWORD', 'ADMIN', 1);

La contraseña no debe guardarse en texto plano. Debe estar en formato BCrypt.

Ejemplo de credenciales de prueba:

Usuario: admin
Contraseña: admin123
7. Ejecución en modo desarrollo

Para trabajar en desarrollo se pueden levantar backend y frontend por separado.

Backend

Desde la carpeta raíz del proyecto:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd spring-boot:run

El backend queda disponible en:

http://localhost:8080
Frontend

Desde la carpeta del frontend:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run dev

El frontend queda disponible en:

http://localhost:5173
8. Compilar el frontend para integrarlo en Spring Boot

Antes de generar el .jar, el frontend debe compilarse.

Desde la carpeta del frontend:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run build

Esto genera una carpeta:

dist

Luego se debe copiar el contenido de dist dentro de:

src/main/resources/static

Ejemplo:

Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\

Debe quedar así:

src/main/resources/static/index.html
src/main/resources/static/assets/

No debe quedar dentro de una carpeta dist.

9. Generar el archivo .jar

Desde la carpeta raíz del backend:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package

El archivo generado queda en:

target/matriculas-0.0.1-SNAPSHOT.jar
10. Ejecutar la versión final

Para ejecutar el sistema integrado:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
java -jar target\matriculas-0.0.1-SNAPSHOT.jar

Luego abrir en el navegador:

http://localhost:8080
11. Archivo .bat para abrir el sistema

Se puede crear un archivo llamado:

abrir-matriculas.bat

Por ejemplo, en:

C:\Users\jerem\Documents\SanFraciscoJardin

Contenido sugerido:

@echo off
title Sistema de Matriculas

set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;%PATH%

cd /d C:\Users\jerem\Documents\SanFraciscoJardin\matriculas

echo Iniciando Sistema de Matriculas...
start "Sistema Matriculas" cmd /k "java -jar target\matriculas-0.0.1-SNAPSHOT.jar"

timeout /t 10 /nobreak > nul

start http://localhost:8080

exit

Luego se puede crear un acceso directo al archivo .bat en el escritorio.

12. Estructura general del proyecto
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
13. Endpoints principales
Autenticación
POST /api/auth/login
Alumnos
GET    /api/alumnos
POST   /api/alumnos
GET    /api/alumnos/{id}
PUT    /api/alumnos/{id}
DELETE /api/alumnos/{id}
Responsables
GET    /api/responsables
POST   /api/responsables
GET    /api/responsables/{id}
PUT    /api/responsables/{id}
DELETE /api/responsables/{id}
Matrículas
GET    /api/matriculas
POST   /api/matriculas
GET    /api/matriculas/{nroOrden}
PUT    /api/matriculas/{nroOrden}
DELETE /api/matriculas/{nroOrden}
Vínculos alumno-responsable
GET    /api/alumno-responsable/buscar
POST   /api/alumno-responsable
GET    /api/alumno-responsable/alumno/{idAlumno}
DELETE /api/alumno-responsable/{idAlumnoResponsable}
14. Consideraciones importantes
El sistema está pensado para uso local en una computadora o red interna.
MySQL debe estar iniciado antes de ejecutar la aplicación.
El usuario administrador debe existir previamente en la base de datos.
Si se modifica el frontend, se debe volver a ejecutar npm run build, copiar el contenido de dist a static y regenerar el .jar.
El número de orden de matrícula funciona como clave primaria y no debe modificarse al editar una matrícula.
Para evitar errores, no se recomienda eliminar alumnos o responsables que tengan relaciones activas sin antes revisar sus vínculos o matrículas asociadas.
15. Flujo de uso recomendado
Iniciar el sistema desde el acceso directo o ejecutando el .jar.
Ingresar con usuario y contraseña.
Cargar alumnos.
Cargar responsables.
Crear vínculos entre alumnos y responsables.
Crear matrículas asociadas a alumnos.
Utilizar las barras de búsqueda para localizar rápidamente la información.
16. Mantenimiento

Cuando se realicen cambios en el frontend:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\java\ar\edu\sanfrancisco\matriculas\Code\frontend\Cliente
npm.cmd run build
Copy-Item -Recurse -Force .\dist\* C:\Users\jerem\Documents\SanFraciscoJardin\matriculas\src\main\resources\static\
cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package

Cuando se realicen cambios solo en backend:

cd C:\Users\jerem\Documents\SanFraciscoJardin\matriculas
mvn.cmd clean package
17. Estado del proyecto

El sistema cuenta con:

Login con JWT.
Backend protegido.
Frontend integrado en Spring Boot.
Gestión de alumnos.
Gestión de responsables.
Gestión de matrículas.
Gestión de vínculos.
Buscadores en las secciones principales.
Ejecución mediante archivo .jar.

