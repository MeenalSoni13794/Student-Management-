# 🎓 Student Management System

A full-stack web application for managing student information efficiently. Built with Spring Boot backend and modern frontend technologies.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen)
![Java](https://img.shields.io/badge/Java-17-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- ✅ **CRUD Operations** - Create, Read, Update, and Delete student records
- 🎨 **Modern UI** - Beautiful and responsive user interface
- 🔍 **RESTful API** - Clean and well-structured API endpoints
- 💾 **Database Integration** - MySQL database for data persistence
- 🚀 **Fast Performance** - Optimized with Spring Boot and JPA
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Spring Boot** 3.5.7
- **Java** 17
- **Spring Data JPA** - For database operations
- **MySQL** - Database
- **Lombok** - Reduces boilerplate code
- **Maven** - Dependency management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java JDK** 17 or higher
- **Maven** 3.6+ (or use Maven wrapper included)
- **MySQL** 8.0 or higher
- **Git** (for cloning the repository)
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code recommended)

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/MeenalSoni13794/Student-Management-.git
cd studentmanagement
```

### Step 2: Database Setup

1. **Create MySQL Database**

```sql
CREATE DATABASE studentdb;
```

2. **Update Database Configuration**

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Step 3: Run the Application

#### Option A: Using Maven Wrapper

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

#### Option B: Using IDE

1. Open the project in IntelliJ IDEA or Eclipse
2. Right-click on `StudentmanagementApplication.java`
3. Select "Run" or "Debug"

#### Option C: Build and Run JAR

```bash
# Build
mvn clean package

# Run
java -jar target/studentmanagement-0.0.1-SNAPSHOT.jar
```

### Step 4: Access the Application

- **Frontend**: http://localhost:8080/
- **API Base URL**: http://localhost:8080/api/students

## 📡 API Endpoints

### Student Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Get all students |
| `GET` | `/api/students/{id}` | Get student by ID |
| `POST` | `/api/students` | Create a new student |
| `PUT` | `/api/students/{id}` | Update existing student |
| `DELETE` | `/api/students/{id}` | Delete a student |

### Example API Requests

#### Get All Students
```bash
GET http://localhost:8080/api/students
```

#### Get Student by ID
```bash
GET http://localhost:8080/api/students/1
```

#### Create Student
```bash
POST http://localhost:8080/api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science",
  "age": 20
}
```

#### Update Student
```bash
PUT http://localhost:8080/api/students/1
Content-Type: application/json

{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "course": "Mathematics",
  "age": 21
}
```

#### Delete Student
```bash
DELETE http://localhost:8080/api/students/1
```

## 📁 Project Structure
