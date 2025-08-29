#  Bloommcraft

**Bloommcraft** is a modern **full-stack web application** designed to manage and showcase floral collections while providing smooth customer interactions.  
It offers a clean and engaging UI for customers and a powerful backend for store owners/admins to handle orders and products efficiently.  

---

##  Project Overview

Bloommcraft streamlines the process of browsing, managing, and ordering flowers or floral arrangements.  
The application bridges the gap between customers and floral businesses by combining a **React-based frontend** with a **Node.js + Express backend**, integrated with **MongoDB** for data management and **Nodemailer** for email communications.  

---

##  Features

-  **Modern UI** – Built with **React + Tailwind CSS** for a responsive and engaging design  
-  **Email Notifications** – Integrated with **Nodemailer** for order confirmations & updates  
-  **Secure Authentication** – **JWT-based login system** for customers & admins  
-  **Admin Dashboard** – Manage products, orders, and users seamlessly  
-  **RESTful API** – Ensures smooth communication between frontend & backend  
-  **Responsive Design** – Optimized for desktop, tablet, and mobile  
-  **Fast & Scalable** – Built with **Vite** for the frontend and deployed on scalable hosting  

---

##  Tech Stack

**Frontend**
- React  
- Vite  
- Tailwind CSS  

**Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Nodemailer  
- JWT Authentication  

**Deployment**
- Vercel (Frontend)  
- Render (Backend)  

---

##  Live Demo

- **Frontend (Vercel):** [bloommcraft.vercel.app](https://bloommcraft.vercel.app)  
- **Backend (Render):** [bloommcraft-server.onrender.com](https://bloommcraft-server.onrender.com)  

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Manjushree8/bloommcraft.git

# 2. Navigate into the project root
cd bloommcraft

# Backend Setup

cd server
npm install

# Create a .env file inside /server with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Run the backend:

npm start

# Frontend Setup

cd ../client
npm install
npm run dev

# Now open the app in your browser:

 http://localhost:5173

# Folder Structure

bloommcraft/
├── client/                 # Frontend (React)
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── utils/          # Helper functions & API calls
│   │   ├── App.js          # Root component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── models/             # Database models
│   ├── routes/             # Express routes (auth, products, orders, etc.)
│   ├── middleware/         # Middleware (auth, error handling)
│   ├── utils/              # Nodemailer, helpers
│   ├── server.js           # Backend entry point
│   └── package.json
│
├── .gitignore              
└── README.md               # Project documentation

```

## Deployment

Frontend – Hosted on Vercel

Backend – Hosted on Render

Deployment is CI/CD enabled, meaning updates are automatically deployed when changes are pushed to the main branch.

# Author

Manjushree

GitHub: https://github.com/Manjushree8
