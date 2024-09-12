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

## Installation
1. Clone the repository:
   git clone git@github.com:facundoms284/pos-inventory-system.git
   
2. Navigate to the project folder and install dependencies:
   npm install

3. Rename the file .env.example to .env and update the values to match your environment variables.

4. Start the server:
   npm run dev

## Project Structure
src/db/: Database configuration.
src/middlewares/: Authentication middleware.
src/models/: Database models with Sequelize.
src/controllers/: Business logic.
src/routes/: API routes (sales, products, users, registration, login).
src/server.js/: Express server configuration.

## License
- This project is licensed under the MIT License.
