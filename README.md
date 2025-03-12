# 🏥 MediVendor - Your Trusted Medical Marketplace

🚀 **MediVendor** is an online platform that connects buyers with reliable medical product vendors. Whether you need medicines, medical equipment, or healthcare essentials, MediVendor provides a seamless experience with secure transactions and real-time availability.

---

## 📌 Features
- 🛍 **Browse & Search** - Find medical products easily with category-based filtering.
- 🏥 **Vendor Listings** - Registered vendors can showcase their products with detailed descriptions.
- 🔒 **Secure Authentication** - User and vendor authentication with **Firebase Auth**.
- 💳 **Seamless Checkout** - Smooth checkout experience with integrated payment gateways (if applicable).
- 📦 **Order Management** - Users can track and manage their orders easily.
- 📊 **Admin Dashboard** - Admins can manage users, products, and orders from a centralized dashboard.

---

## 🛠 Tech Stack

| Frontend  | Backend  | Database  | Authentication |
|------------|----------|------------|----------------|
| React.js | Node.js | MongoDB | Firebase Auth |
| Tailwind CSS | Express.js | Firebase Firestore (if used) | JWT |
| Redux (if used) | REST API | Mongoose (optional) | |

---

## 🚀 Getting Started

Follow these steps to set up **MediVendor** locally.

### 📥 1. Clone the Repository
```sh
git clone https://github.com/abubakar308/medivendor-client.git
cd medivendor
```

### 🖥 2. Install Dependencies
#### Frontend:
```sh
cd client
npm install
```
#### Backend:
```sh
cd server
npm install
```

### ⚙ 3. Set Up Environment Variables
Create a **.env** file in the `server` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FIREBASE_API_KEY=your_firebase_api_key
```

### ▶ 4. Run the Application
#### Run the Backend:
```sh
cd server
npm start
```
#### Run the Frontend:
```sh
cd client
npm start
```

---

## 🌍 Deployment
- **Frontend**: Deployed on **Netlify / Surge**  
- **Backend**: Deployed on **Vercel**  

### 🔗 Live Demo: [MediVendor Live](https://medivendor-2b953.web.app)

---

## 📫 Contact & Support
For any issues, reach out via:  
📩 **Email**: [mdabubakarsiddique789@gmail.com](mailto:mdabubakarsiddique789@gmail.com)  
🌍 **Portfolio**: [Your Website](https://your-portfolio.com)  

🔹 **Feel free to contribute!** Open a pull request if you'd like to improve MediVendor. 🚀💙
