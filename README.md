<div align="center">

# 🍟 GOPAJI

### *Crunchy Taste, Made with Love*

**A fun idea between two friends, transformed into a modern React.js e-commerce experience.**

*Built today for a better tomorrow.* 🚀

<br />

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)

![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?style=flat-square\&logo=react-router\&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square\&logo=framer\&logoColor=white)
![Context API](https://img.shields.io/badge/Context_API-State_Management-61DAFB?style=flat-square)
![localStorage](https://img.shields.io/badge/localStorage-Persistence-F7B32B?style=flat-square)

</div>

---

## 📖 About the Project

**GOPAJI** started as a fun idea between two friends who decided to create their own imaginary chips brand just for fun.

What started as a simple joke turned into a hands-on web development project.

I used my technical skills to transform the idea into a **modern, responsive e-commerce website** using React.js.

The goal was to build something that feels like a real e-commerce application while practicing real-world frontend development concepts such as:

* Component-based architecture
* State management
* Client-side routing
* Responsive UI development
* Reusable components
* Form validation
* Local data persistence
* E-commerce workflows
* Admin dashboard functionality
* Interactive animations

> 🍟 **GOPAJI is a fictional/demo brand created as a personal project. Product details, prices, reviews, and company information are for demonstration purposes only.**

---

## 💡 The Idea

### Two friends. One fun idea. A lot of coding. 🍟💻

GOPAJI was created as a small creative experiment between two friends.

Instead of keeping the idea as just a joke, I decided to use it as an opportunity to build a complete web application and apply my technical skills.

This project represents the journey from:

**💡 Idea → 🎨 Design → 💻 Development → 🚀 Working Application**

---

## 🎯 Project Goal

The main goal was to create a **modern frontend e-commerce experience** for a fictional chips and snacks brand.

The application includes both customer-facing functionality and an admin dashboard, while keeping the architecture clean enough for future backend integration.

---

## ✨ Features

### 🛍️ Customer Features

#### 🏠 Home Page

* Modern hero section
* Animated product packets
* Promotional banners
* Shop by category
* Featured products
* Best sellers
* Combo offers
* Why GOPAJI section
* Customer review section
* Newsletter subscription

#### 🛒 Shop

* Product search
* Category filtering
* Price filtering
* Rating filtering
* Availability filtering
* Product sorting
* Product count
* Clear filters
* Responsive filter drawer for mobile

#### 📦 Product Details

* Product information
* Price and MRP
* Discount display
* Stock status
* Quantity selector
* Add to Cart
* Buy Now
* Wishlist
* Product description
* Ingredients
* Nutrition information
* Related products
* Customer reviews

#### 🛒 Shopping Cart

* Add/remove products
* Increase/decrease quantity
* Stock-aware quantity control
* Clear cart
* Order summary
* Discount calculation
* Delivery charge calculation
* Free delivery progress indicator
* Persistent cart using localStorage

#### ❤️ Wishlist

* Add products to wishlist
* Remove products
* Move product to cart
* Clear wishlist
* Wishlist counter

---

## 🔐 Authentication

The project includes a frontend-based authentication flow.

### Login

* Email validation
* Password validation
* Show/hide password
* Demo login credentials
* Redirect after login

### Registration

* Name
* Email
* Phone
* Password
* Confirm password
* Client-side validation
* Automatic login after registration

### User Profile

* User information
* Profile avatar
* Order statistics
* Wishlist statistics
* Total spending
* Recent orders
* Cart and wishlist shortcuts
* Logout

### Roles

* `USER`
* `ADMIN`

Protected routes are implemented using:

* `ProtectedRoute`
* `AdminRoute`

---

## 💳 Checkout

The project contains a 4-step checkout flow:

### Step 1 — Customer Information

* Name
* Email
* Phone

### Step 2 — Delivery Address

* Address
* City
* State
* Pincode

### Step 3 — Order Summary

* Products
* Quantity
* Price
* Discount
* Delivery charge
* Total amount

### Step 4 — Payment Method

* Cash on Delivery
* UPI
* Credit/Debit Card

> ⚠️ Payment methods are for UI demonstration only. No real payment gateway is connected.

---

## 📦 Order Management

Users can view their previous orders.

Order statuses include:

```text
PENDING
   ↓
CONFIRMED
   ↓
PACKED
   ↓
SHIPPED
   ↓
OUT_FOR_DELIVERY
   ↓
DELIVERED
```

Orders can also be marked as:

```text
CANCELLED
```

Each order contains:

* Order ID
* Order date
* Products
* Quantity
* Total amount
* Delivery address
* Payment method
* Order status

---

## 👑 Admin Dashboard

The application also includes a frontend admin dashboard.

### Dashboard

Displays:

* Total products
* Total orders
* Total users
* Total revenue
* Pending orders
* Delivered orders

### Product Management

Admin can:

* View products
* Add products
* Edit products
* Delete products
* Update price
* Update stock
* Activate/deactivate products

### Category Management

Admin can:

* Add categories
* Edit categories
* Delete categories

### Order Management

Admin can:

* View orders
* Filter orders
* Change order status

### User Management

Admin can:

* View users
* Enable/disable users

### Advertisement Management

Admin can:

* Create advertisements
* Edit advertisements
* Delete advertisements
* Enable/disable advertisements

---

## 🎨 UI & UX

The website was designed with a focus on a modern and engaging e-commerce experience.

### Design Features

* Responsive layout
* Custom CSS design system
* Modern cards
* Gradients
* Rounded UI elements
* Shadows
* Glassmorphism effects
* Hover animations
* Smooth transitions
* Toast notifications
* Mobile navigation
* Responsive filter drawer

### Responsive Support

The website is designed for:

```text
Desktop
1920px
1440px
1024px

Tablet
768px

Mobile
480px
360px
```

---

## 🍟 Product Packet Design

One of the interesting parts of the project is the **CSS-based product packet design**.

Product packets are created using HTML and CSS instead of relying completely on external product images.

Each packet contains:

* Brand name
* Flavor
* Unique design
* Chips illustration
* Veg indicator
* Shine effect
* Decorative elements

This helped me experiment with **CSS shapes, gradients, positioning, and reusable React components.**

---

## 🧠 State Management

The application uses **React Context API** for managing global application state.

Contexts include:

```text
AuthContext
CartContext
OrderContext
ToastContext
WishlistContext
```

This keeps state management organized and allows different components to access shared application data without unnecessary prop drilling.

---

## 💾 localStorage

Since this is a frontend-only project, browser `localStorage` is used for data persistence.

### Stored Data

```text
gopaji_cart
gopaji_wishlist
gopaji_users
gopaji_currentUser
gopaji_orders
gopaji_subscriptions
gopaji_contactMessages
gopaji_adminProducts
gopaji_adminCategories
gopaji_advertisements
```

This allows data such as cart items, users, wishlist items, and orders to remain available after refreshing the browser.

---

## 🛠️ Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Frontend         | React.js             |
| Build Tool       | Vite                 |
| Language         | JavaScript ES6+      |
| Routing          | React Router DOM     |
| State Management | React Context API    |
| Styling          | Custom CSS3          |
| Animations       | Framer Motion        |
| Icons            | Lucide React         |
| Persistence      | Browser localStorage |
| Linting          | ESLint               |

---

## ❌ What This Project Does Not Use

This version is intentionally frontend-only.

```text
❌ Spring Boot
❌ Node.js / Express
❌ MySQL
❌ MongoDB
❌ Firebase
❌ Supabase
❌ Real Payment Gateway
❌ Real Authentication Backend
```

The project is structured so that a backend can be integrated in the future.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js 18+
* npm
* Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gopaji-ecommerce.git
```

### 2. Go to the project directory

```bash
cd gopaji-ecommerce
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in browser

```text
http://localhost:5173
```

---

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🔑 Demo Credentials

The application includes demo accounts for testing.

| Role     | Email              | Password   |
| -------- | ------------------ | ---------- |
| 👤 User  | `user@gopaji.com`  | `user123`  |
| 👑 Admin | `admin@gopaji.com` | `admin123` |

> ⚠️ These credentials are only for demonstration. This application does not provide real backend authentication.

---

## 📁 Project Structure

```text
gopaji-ecommerce/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AdvertisementBanner.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductPacket.jsx
│   │   ├── QuantitySelector.jsx
│   │   ├── Rating.jsx
│   │   ├── SearchBar.jsx
│   │   └── Toast.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── OrderContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── data/
│   │   ├── advertisements.js
│   │   ├── categories.js
│   │   └── products.js
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Shop.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── routes/
│   │   ├── AdminRoute.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatCurrency.js
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚠️ Project Limitations

This is a **frontend-only demonstration project**, so it is not intended for real production use.

### Security

* Authentication is handled on the client side
* User data is stored in localStorage
* Passwords are not securely hashed
* No backend authorization
* No server-side validation

### E-commerce

* No real payment processing
* No real order delivery integration
* No real inventory synchronization
* No email/SMS notifications
* Data is limited to the current browser

---

## 🔮 Future Improvements

The project can be extended with a proper backend.

### Phase 1 — Backend

```text
Spring Boot
MySQL
Spring Data JPA
Spring Security
JWT Authentication
REST APIs
```

### Phase 2 — Payments

```text
Razorpay
Stripe
Invoice Generation
```

### Phase 3 — Advanced Features

```text
AI Product Recommendations
Search Autocomplete
Coupon System
Order Tracking
Email Notifications
Analytics Dashboard
```

### Phase 4 — Deployment & Scale

```text
AWS
Docker
CI/CD
CDN
Production Database
```

---

## 📸 Screenshots

Screenshots can be added here to showcase the project.

Recommended screenshots:

```text
screenshots/
├── home.png
├── shop.png
├── product-details.png
├── cart.png
├── wishlist.png
├── login.png
├── checkout.png
├── orders.png
├── admin-dashboard.png
└── mobile.png
```

Example:

```markdown
## 🏠 Home Page

![GOPAJI Home](./screenshots/home.png)

## 🛒 Shop

![GOPAJI Shop](./screenshots/shop.png)

## 👑 Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)
```

---

## 📚 What I Learned

Building GOPAJI gave me practical experience with:

* React component architecture
* React Context API
* React Router
* State management
* Reusable components
* Form validation
* Responsive web design
* CSS animations
* localStorage
* E-commerce workflows
* Admin dashboard design
* Git & GitHub
* Frontend project structuring

Most importantly, it helped me understand how to take a simple idea and turn it into a **complete working web application.**

---

## 🚀 Future Backend Integration

The current frontend architecture can later be connected to a Spring Boot backend.

A future version can replace localStorage-based operations with REST APIs such as:

```text
GET    /api/products
GET    /api/products/{id}

POST   /api/auth/register
POST   /api/auth/login

GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/{id}
DELETE /api/cart/items/{id}

POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}

PATCH  /api/admin/orders/{id}/status
GET    /api/admin/dashboard
```

This would allow the project to evolve from a frontend demo into a full-stack e-commerce application.

---

## 🤝 Created By

### 👨‍💻 Chetan Arote

**Frontend Developer & Project Developer**

### 👨‍💻 Shubham Arote

**Co-Creator of the GOPAJI Idea**

GOPAJI was created as a fun project between two friends and developed into a practical learning experience.

---

<div align="center">

## 🍟 GOPAJI

### *Crunchy Taste, Made with Love*

**Two Friends • One Idea • One Website**

### 💻 Built today for a better tomorrow. 🚀

---

⭐ If you found this project interesting, consider giving the repository a star!

**© 2026 GOPAJI — Fictional/Demo Project**

</div>
