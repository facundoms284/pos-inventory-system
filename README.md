# POS Inventory System

A point-of-sale (POS) inventory system for managing products, users, and sales.

## Features

- Manage products, users, and sales.
- Register new users (administrators).
- Sales reporting and real-time inventory control.

## Technologies Used

- **Backend**: Node.js with Express.
- **Database**: PostgreSQL with Sequelize ORM.
- **Authentication**:
- JWT: For managing user sessions. JWT tokens are used to authenticate requests and ensure users have the appropriate permissions to access certain resources.
- bcrypt: For password encryption, ensuring user credentials are protected.
- **Database Management**: DBeaver: A free and open-source database management tool used for interacting with and managing PostgreSQL databases.
- **Containerization**:
- Docker: Used to containerize the application for consistent development and deployment environments.
- Docker Compose: Simplifies managing multi-container Docker applications through the docker-compose.yml file.
- Docker Desktop: A graphical interface for managing Docker containers and images on local machines.

## Installation

1. Clone the repository:
   git clone git@github.com:facundoms284/pos-inventory-system.git

2. Navigate to the project folder and install dependencies:
   npm install

3. Rename the file .env.example to .env and update the values to match your environment variables:

- Open the .env file and provide the necessary configuration values, including database connection details.

4. Set up the PostgreSQL database:

- Open DBeaver and create a new PostgreSQL database with the name specified in the .env file.
- Make sure the database user and password in DBeaver match those provided in your .env file.

5. Start the application using Docker Compose:
   docker-compose up -d

6. To stop the application, run:
   docker-compose down

7. Start the server:
   npm run dev

## Usage

1. Once the server is running, navigate to http://localhost:3000 to ensure everything is working correctly. You should see a message saying "Hello world from express. All good. POS Inventory API".

2. To acces the API documentation, go to http://localhost:3000/api-docs.

## Project Structure

- src/db/: Database configuration.
- src/middlewares/: Authentication middleware.
- src/models/: Database models with Sequelize.
- src/controllers/: Business logic.
- src/routes/: API routes (sales, products, users, registration, login).
- src/server.js/: Express server configuration.

## License

- This project is licensed under the MIT License.
