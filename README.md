# 🌸 Bloommcraft

Bloommcraft is a modern full-stack web application designed to manage and showcase floral collections while providing smooth customer interactions.  
It features a **React frontend** and a **Node.js + Express backend**, with **Nodemailer** integration for email communications.

---

##  Project Overview

Bloommcraft streamlines the process of browsing, managing, and ordering flowers or floral arrangements.  
It delivers a clean and engaging UI for users while simplifying backend handling for store owners/admins.

---

##  Features

- User-friendly interface built with **React**  
- Email sending via **Nodemailer** 
- Secure backend using **Node.js + Express**  
- REST API for frontend-backend communication  
- Responsive UI with modern styling  

---

##  Tech Stack

**Frontend**
- React  
- CSS / Tailwind CSS  

**Backend**
- Node.js  
- Express.js  
- Nodemailer  

---

## Folder Structure

```bash
bloommcraft/
├── client/                 # Frontend (React)
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── utils/          # Helper functions & API calls
│   │   ├── App.js          # Root component
│   │   └── index.js        # Entry point
│   └── package.json

├── server/                 # Backend (Node.js + Express)
│   ├── models/             # Database models
│   ├── routes/             # Express routes (auth, products, orders, etc.)
│   ├── middleware/         # Middleware (auth, error handling)
│   ├── utils/              # Nodemailer, helpers
│   ├── server.js           # Backend entry point
│   └── package.json

├── .gitignore              
└── README.md             # Project documentation


##  Live Demo

- **Frontend (Vercel):** [https://bloommcraft.vercel.app](https://bloommcraft.vercel.app)  
- **Backend (Render):** [https://bloommcraft-server.onrender.com](https://bloommcraft-server.onrender.com)

---

## 📸 Screenshots

### User Flow
- **Home Page**  
  ![Home Page](/client/public/screenshots/homepage.png)

- **Register Page**  
  ![Register Page](/client/public/screenshots/RegisterPage.png)

- **Login with OTP**  
  ![Login OTP](/client/public/screenshots/LoginOTP.jpg)

- **OTP Verification**  
  ![OTP Verification](/client/public/screenshots/OtpVerification.png)

- **Not Logged In Alert**  
  ![Not Login Alert](/client/public/screenshots/NotLoginAlert.png)

- **Welcome Email**  
  ![Welcome Mail](/client/public/screenshots/WelcomeMail.jpg)

---

### Shopping Flow
- **Product Listing**  
  ![Products Page](/client/public/screenshots/ProductPage.png)

- **Product Details & Customization**  
  ![Product Details](/client/public/screenshots/ProductDetails.png)

- **Search Bar**  
  ![Search Bar](/client/public/screenshots/SearchBar.png)

- **Added to Cart**  
  ![Added to Cart](/client/public/screenshots/AddedToCart.png)

- **Cart Page**  
  ![Cart](/client/public/screenshots/CartPage.png)

- **Checkout Page**  
  ![Checkout](/client/public/screenshots/CheckoutPage.png)

- **Order Placed**  
  ![Order Placed](/client/public/screenshots/OrderPlaced.png)

---

### Profile
- **My Profile**  
  ![My Profile](/client/public/screenshots/MyProfile.png)

- **Profile Edit**  
  ![Profile Edit](/client/public/screenshots/ProfileEdit.png)

---

### Admin Flow
- **Admin Dashboard**  
  ![Admin Dashboard](/client/public/screenshots/AdminDashboard.png)

- **Admin Navbar**  
  ![Admin Navbar](/client/public/screenshots/AdminNavbar.png)

- **Hamburger Menu**  
  ![Hamburger Menu](/client/public/screenshots/HamburgerMenu.png)

- **Manage Orders**  
  ![Manage Orders](/client/public/screenshots/ManageOrders.png)

##  Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Manjushree8/bloommcraft.git

# 2. Navigate into the project
cd bloommcraft

# 3. Install dependencies for backend
cd server
npm install

# 4. Install dependencies for frontend
cd ../client
npm install

# 5. Set up environment variables
# Create a `.env` file inside /server with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# 6. Run the backend server
cd server
npm start

# 7. Run the frontend app
cd ../client
npm run dev

# 8. Open the app in your browser
http://localhost:5173
