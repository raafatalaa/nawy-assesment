# Apartment Management Application

This repository contains a full-stack application for managing apartments, built with NestJS for the backend and Next.js for the frontend.

## Task Overview

The goal of this project was to create a comprehensive apartment management system that allows users to perform various operations related to apartments. The application consists of two main components:

1. **Backend**: Developed using NestJS, it provides a RESTful API for managing apartments, including CRUD operations, filtering, and pagination.
2. **Frontend**: Built with Next.js, it offers a user-friendly interface for interacting with the backend API, allowing users to view, create, and filter apartments.

## Requirements

The application was required to:
- Implement a backend API with endpoints for managing apartments.
- Provide data validation and error handling.
- Create a frontend application that consumes the backend API.
- Include Swagger documentation for the API.
- Ensure that the application is easily deployable using Docker.

## Table of Contents
- [Getting Started](#getting-started)
- [Backend](#backend)
- [Frontend](#frontend)
- [Accessing Swagger API Documentation](#accessing-swagger-api-documentation)
- [Running Tests](#running-tests)

## Getting Started

To get started with the application, you need to have Docker and Docker Compose installed on your machine. Follow these steps to run the application:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Open your browser and navigate to:
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend: [http://localhost:3000](http://localhost:3000)

## Backend

The backend is built using NestJS and provides a RESTful API for managing apartments. It handles the following functionalities:
- **CRUD operations** for apartments
- **Filtering and pagination** for apartment listings
- **Validation** of incoming data using DTOs (Data Transfer Objects)

### Endpoints
The backend exposes several endpoints, including:
- `GET /apartments`: Retrieve a list of apartments with optional filters and pagination.
- `GET /apartments/:id`: Retrieve a specific apartment by ID.
- `POST /apartments`: Create a new apartment.

## Frontend

The frontend is built using Next.js and provides a user interface for interacting with the apartment management system. It allows users to:
- View a list of apartments
- Create new apartments
- Filter apartments based on various criteria

### Accessing the Frontend
To access the frontend, open your browser and navigate to [http://localhost:3001](http://localhost:3001).

## Accessing Swagger API Documentation

The backend API documentation is available through Swagger. To access it:
1. Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api).
2. You will see the Swagger UI, which provides an interactive interface to explore the API endpoints.

## Running Tests

To run the test cases for both the backend and frontend, follow these steps:

### Backend Tests
1. Navigate to the backend directory:
   ```bash
   cd apartment-app-be
   ```

2. Run the tests using Jest:
   ```bash
   npm test
   ```

3. To run tests in watch mode:
   ```bash
   npm test -- --watch
   ```

## Conclusion

This application provides a complete solution for managing apartments with a user-friendly interface and a robust backend. Feel free to explore the code and contribute to the project!
