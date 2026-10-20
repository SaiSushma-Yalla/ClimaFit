# ClimaFit — AI-Powered Outfit Recommendation System

ClimaFit is a full-stack outfit recommendation application designed to help users explore outfit suggestions through an interactive interface with secure user authentication and personalized user experiences.

# Demo

  Video: [https://github.com/user-attachments/assets/251df933-4a98-4e0d-bf54-9748a2de5dfc]

## Screenshots

<img width="1600" height="717" alt="c 1" src="https://github.com/user-attachments/assets/11c3349e-36ad-4cfa-ae17-c3c60e8b44c2" />
<img width="2408" height="1080" alt="c2" src="https://github.com/user-attachments/assets/c74ad744-f8c5-4f02-85a8-70b7561c3f0e" />
<img width="2408" height="1080" alt="c3" src="https://github.com/user-attachments/assets/a187b9f0-2297-4e23-916e-bcb0c900e12d" />
<img width="1600" height="717" alt="c4" src="https://github.com/user-attachments/assets/cc00baad-2688-4bef-924f-b62dd9185af7" />
<img width="1600" height="717" alt="c5" src="https://github.com/user-attachments/assets/23b90e73-8aa5-4445-8d85-f12540cdf2ed" />


## Features

- Outfit Recommendations: Explore outfit suggestions through the application.
- User Authentication: Secure login and registration using JWT-based authentication.
- Role-Based Access Control: Separate Admin and User access using Spring Security.
- Password Security: Password hashing using BCrypt.
- **Interactive Frontend: Responsive user interface built with React and Material UI.
- **REST API Integration: Connect the React frontend to the Spring Boot backend.
- **Database Integration: Store and manage application data using PostgreSQL.

## Tech Stack

**Frontend
- React.js 18
- Material UI (MUI)
- JavaScript

**Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- JWT Authentication
- BCrypt

**Database
- PostgreSQL

**Tools
- IntelliJ IDEA
- Visual Studio Code
- Maven
- Git and GitHub

## How to Run

### Prerequisites

- Java JDK compatible with your Spring Boot project
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ClimaFit
```

Replace `https://github.com/SaiSushma-Yalla` with your actual GitHub repository URL.

### 2. Set up the database

Create a PostgreSQL database named `outfitdb` and configure your database username, password, and connection settings in the Spring Boot application's configuration file.

Do not commit database passwords, JWT secrets, or other credentials.

### 3. Run the backend

Open a terminal in the backend directory and run:

```bash
mvn spring-boot:run
```

The backend is configured to run on port `8085`, based on the current project setup.

### 4. Run the frontend

Open another terminal in the frontend directory and run:

```bash
npm install
npm start
```

If your React project uses a different start script, check the `scripts` section of `package.json` and use the appropriate command.

### 5. Open the application

Open the local URL displayed by the frontend development server in your browser. Ensure that PostgreSQL and the backend are running before testing features that require API access.

## Known Limitations

- The application requires the backend and PostgreSQL database to be configured and running.
- Outfit recommendation functionality depends on the recommendation logic and data implemented in the project.
- The application is a development project; production deployment, if any, should be documented separately.
- External integrations and advanced recommendation capabilities should be listed only if they are implemented and working.

## Author

**Gayatri NK Sai Sushma Yalla**

- **GitHub:** [SaiSushma-Yalla](https://github.com/SaiSushma-Yalla)
- **LinkedIn:** [Sai Sushma Yalla](https://www.linkedin.com/in/saisushmayalla/)
