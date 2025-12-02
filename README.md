📊 Employee Management System (EMS) Dashboard

A simple CRUD-based Employee Management System built using React + Vite and JSON Server.

This project demonstrates:
✔ React Hooks (useState, useEffect)
✔ React Router
✔ Axios API calls
✔ JSON Server (Mock REST API)
✔ Form handling & validation
✔ CRUD Operations (GET, POST, PUT, DELETE)

🚀 Features

    Add new employees
    View employee list
    Edit employee details
    Delete employee
    Toast notifications
    Clean UI Design

🛠️ Tech Stack
Frontend
React (Vite)
Axios
React Router DOM
React Toastify
Backend
JSON Server (Mock API)

📥 How to Run This Project

Follow these steps to run the EMS Dashboard on your system.

🟦 1. Clone the Repository
git clone https://github.com/MohanKanapakala/EMS-Dashboard.git

     cd EMS-Dashboard

🟩 2. Install Dependencies
npm install

🟧 3. Start JSON Server (Backend)

    This project uses db.json as a mock database.

    Install JSON Server (if not installed):
       npm install -g json-server

    Start the server:
       json-server --watch db.json --port 3001

    Your backend is now running at:
       http://localhost:3001/employees

    🟨 4. Start React Application (Frontend)

        Open another terminal:
           npm start
        The app runs at:
           http://localhost:5173

📌 Important Notes
✔ JSON Server must run for the app to work

    Without it, create/edit/delete will fail.

    ✔ Backend uses port 3001

    Make sure this port is free.

    ✔ Frontend uses port 5173
    ✔ db.json is your mock database

    You can edit employee data manually here.
