# Tech Stack 

I've used **Firebase**, **Express** , **Postgres** and **Prisma** as ORM primarily for this project .

The  database is hosted on a free RDS server using **Supabase**.

The backend is hosted using **AWS EC2**

Note: I have not added the serviceAccountKey in this repo if you wan't to setup the project locally  kindly contact me :) 

# Features

Allows **CRUD** operation for the tasks after user authentication.

Unit Tests are written using **JEST** to help with further understanding of the codebase and ensuring best practices also the test include **75%** code coverage.

(Note: Performance and Integration Testing are not done at this stage )

All file uploads are being handled well and are stored in a **uploads** directory I've used **multer** for the use case.

# Setup

**Step 1:** Clone the repository git clone -b backend <remote-url>

**Step 2:** Ensure to change the DATABASE_URL to a local one after installing pgAdmin

**Step 3:** Use npm install to install the dependencies

**Step 4:** Use npx prisma  migrate dev to create a migration 

**Step 5:** Use nodemon server.js to start the server.

# Unit Tests

To Do the unit testing of the application 

**Step 1:** Create a singleton pattern and mock prisma  ( To create a singelton file you may copy the code from [here](https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing)  create a singleton file and initialize the client rest tests are written in __tests__ folder

**Step 2:**  Run npm test


