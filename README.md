## Burger Shop API 

This project serves as a delicious API for managing your favorite burgers. Built with modern technologies, it allows you to create, retrieve, update, and delete burgers with ease.

**Tech Stack:**

* **Backend:** Node.js, TypeScript, Express
* **Database:** MongoDB (Mongoose)
* **Dependency Management:** yarn
* **Containerization:** Docker Compose

**Requirements:**

* Node.js and npm (or yarn)
* Docker

**Installation:**

1. **Clone the repository.**

2. **Install dependencies:**

   ```bash
   yarn install
   ```

   **If yarn is not installed:**

   You can install yarn globally using npm by running:

   ```bash
   npm install -g yarn
   ```

3. **Configure environment variables:**

   - Copy the `.example.env` file to `.env` and fill in the missing details like your MongoDB connection string.
   - These variables are crucial for the application to function properly.

4. **Set up database persistence (optional):**

   - Create a folder named `mongo-data` in the root directory. This folder will persist your MongoDB data across container restarts.

5. **Generate SSL certificates (optional):**

   **Note:** This step is required for running the server in HTTPS mode.

   ```bash
   openssl genrsa -out key.pem 2048
   openssl req -new -key key.pem -out csr.pem
   openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
   ```

   - Add the paths to your generated certificates (`key.pem` and `cert.pem`) in the `.env` file.

**Running the application:**

1. **Start the MongoDB container:**

   ```bash
   docker-compose up -d
   ```

2. **Start the server:**

   ```bash
   yarn start
   ```

**Testing the API:**

The `Burger Shop.postman_collection` file included in this repository provides a collection of requests to interact with the API. Import this collection into Postman to start testing your burger creations!

This README provides a basic guide to get you started. Feel free to explore the codebase and documentation for further details and customization options. Happy burger coding! 