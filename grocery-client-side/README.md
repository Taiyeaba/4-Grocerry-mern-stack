# 🛒 GroceryBD – Mern Stack E-commerce Platform

A full-featured grocery e-commerce web application built with MERN Stack, Firebase Authentication, Role-based Access Control, Cloudinary Image Upload, and Product Review System.

# 🌐 Live Demo
👉 [Live Site URL] (Add your deployed site link here)

# 🚀 Features

 # 👤 Authentication & Roles
  Firebase Authentication (Email/Password)

   Role-based users:
   Admin - Full system control
   Seller - Manage own products and orders
   User - Browse and purchase products
   Secure JWT-based API protection
   Protected routes based on user roles

 #  🛍️ Products Management

   Add / Edit / Update products with multiple images
   Seller can manage only their products
   Admin can manage all products
   Product details page includes:
   Multiple image gallery
   Price & offer price comparison
   Seller information
   Detailed description points
   Customer reviews section

# ✏️ Secure Price Editing

  Only Admin & Product Seller can edit prices
  Backend verification for role & ownership
  Modal-based UI for price updates
  Real-time price updates without page refresh

# ⭐ Review System

 Anyone (Admin / Seller / User) can add reviews
 Product-specific reviews stored in MongoDB
 Review modal with background blur effect
 Shows detailed information:
 Reviewer email & role badge
 Star rating (1-5)
 Comment with timestamp
 Store response (if any)

# 🛒 Cart & Orders
  Add to cart functionality
  ecure checkout process
  Role-based order access:
  User → View own orders
  Seller → View orders for their products
  Admin → View all orders
  Order tracking and management

# 🖼️ Image Upload
 
 Cloudinary integration for image storage
 Multer memory storage for file handling
 Support for multiple images per product
 Secure image URL management

# Responsive Design

 Fully responsive UI using Tailwind CSS
 Mobile-first approach
 Clean and modern interface
 Optimized for all device sizes

 # 🧑‍💻 Tech Stack

 Frontend

React - Frontend library
React Router - Navigation and routing
Tailwind CSS - Utility-first CSS framework
Axios - HTTP client for API calls
Firebase Authentication - User authentication
React Hot Toast - Notification system
React Context API - State management

# Backend

Node.js - JavaScript runtime
Express.js - Web framework
MongoDB - Database (Native Driver)
Firebase Admin SDK - Backend authentication
JWT - JSON Web Tokens for authorization
loudinary - Image upload and storage
Multer - File upload middleware
CORS - Cross-origin resource sharing
Dotenv - Environment variables


# 🔒 Security Features

JWT token validation on all protected routes
Role-based middleware for endpoint protection
Input validation and sanitization
Secure password hashing
Protected image uploads
CORS policy implementation
Environment variable protection

# 📋 Role-wise Capabilities
👤 User
Product Management: ❌ View only
Order Access: ✅ Own orders only
Price Editing: ❌ No access
Review System: ✅ Can add reviews

🏪 Seller
Product Management: ✅ Manage own products (Add/Edit/Delete)
Order Access: ✅ Orders for their products only
Price Editing: ✅ Edit prices of own products
Review System: ✅ Can add reviews to any product

👑 Admin
Product Management: ✅ Full access to all products
Order Access: ✅ View all orders
Price Editing: ✅ Edit prices of any product
Review System: ✅ Can add reviews to any product

# summary
--> This project has three roles: Admin, Seller, and User.
--> Admin email: owner@gmail.com and password: owner123ABC.
--> Seller and User will click register to create their own accounts.
--> Admin and Seller can see everything.
--> User can only see their own orders; they cannot see orders of other users or sellers.
--> Nothing can be done without logging in. Only all products can be viewed.

# user email
1. shuva@gmail.com , pass:shuva12345
2. dipa@gmail.com , pass: dipa12345
3. priti@gmail.com , pass:priti@gmail.com

# seller email
1. hafsa@gmail.com , pass: hafsa12345
2. maria@gmail.com , pass: maria12345
3. tarin@gmail.com , pass: tarin12345
4. anney@gmail.com , pass: anney12345


