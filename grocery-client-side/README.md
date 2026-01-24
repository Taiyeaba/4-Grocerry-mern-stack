# 🛒 GroceryBD – MERN Stack E-commerce Platform

A full-featured grocery e-commerce web application built with the MERN Stack, Firebase Authentication, Role-based Access Control, Cloudinary Image Upload, and Product Review System.

---

## 🌐 Live Demo
👉 [Live Site URL](#)  
(https://grocerry-full-stack.web.app)

---

## 🚀 Features

### 👤 Authentication & Roles

- Firebase Authentication (Email/Password)
- **Role-based Users**
  - **Admin** – Full system control
  - **Seller** – Manage own products and orders
  - **User** – Browse and purchase products
- Secure JWT-based API protection
- Protected routes based on user roles

---

### 🛍️ Products Management

- Add / Edit / Update products with multiple images
- Seller can manage **only their own products**
- Admin can manage **all products**
- Product Details Page includes:
  - Multiple image gallery
  - Price & offer price comparison
  - Seller information
  - Detailed description points
  - Customer reviews section

---

### ✏️ Secure Price Editing

- Only **Admin & Product Seller** can edit prices
- Backend verification for role & ownership
- Modal-based UI for price updates
- Real-time price updates without page refresh

---

### ⭐ Review System

- Anyone (**Admin / Seller / User**) can add reviews
- Product-specific reviews stored in MongoDB
- Review modal with background blur effect
- Displays:
  - Reviewer email & role badge
  - Star rating (1–5)
  - Comment with timestamp
  - Store response (if any)

---

### 🛒 Cart & Orders

- Add to cart functionality
- Secure checkout process
- **Role-based order access**
  - **User** → View own orders only
  - **Seller** → View orders for their products
  - **Admin** → View all orders
- Order tracking and management

---

### 🖼️ Image Upload

- Cloudinary integration for image storage
- Multer memory storage for file handling
- Support for multiple images per product
- Secure image URL management

---

### 📱 Responsive Design

- Fully responsive UI using Tailwind CSS
- Mobile-first approach
- Clean and modern interface
- Optimized for all device sizes

---

## 🧑‍💻 Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Firebase Authentication
- React Hot Toast
- React Context API

### Backend

- Node.js
- Express.js
- MongoDB (Native Driver)
- Firebase Admin SDK
- JWT (JSON Web Tokens)
- Cloudinary
- Multer
- CORS
- Dotenv

---

## 🔒 Security Features

- JWT token validation on all protected routes
- Role-based middleware for endpoint protection
- Input validation and sanitization
- Secure password hashing
- Protected image uploads
- CORS policy implementation
- Environment variable protection

---

## 📋 Role-wise Capabilities

### 👤 User
- Product Management: ❌ View only
- Order Access: ✅ Own orders only
- Price Editing: ❌ No access
- Review System: ✅ Can add reviews

### 🏪 Seller
- Product Management: ✅ Manage own products (Add / Edit / Delete)
- Order Access: ✅ Orders for their products only
- Price Editing: ✅ Edit prices of own products
- Review System: ✅ Can add reviews to any product

### 👑 Admin
- Product Management: ✅ Full access to all products
- Order Access: ✅ View all orders
- Price Editing: ✅ Edit prices of any product
- Review System: ✅ Can add reviews to any product

---

## 📝 Summary

- This project has **three roles**: Admin, Seller, and User
- **Admin Credentials**
  - Email: `owner@gmail.com`
  - Password: `owner123ABC`
- Seller and User must **register** to create their own accounts
- Admin and Seller can see all relevant data
- User can only see **their own orders**
- No actions are allowed without login
- All products can be viewed publicly

---

## 👤 Test User Accounts

### Users
1. `shuva@gmail.com` | Password: `shuva12345`
2. `dipa@gmail.com` | Password: `dipa12345`
3. `priti@gmail.com` | Password: `priti@gmail.com`

### Sellers
1. `hafsa@gmail.com` | Password: `hafsa12345`
2. `maria@gmail.com` | Password: `maria12345`
3. `tarin@gmail.com` | Password: `tarin12345`
4. `anney@gmail.com` | Password: `anney12345`
