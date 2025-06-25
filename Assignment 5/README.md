# 📝 CRUD Application with MongoDB and Mongoose

This is a simple Node.js and Express-based CRUD (Create, Read, Update, Delete) application using MongoDB as the database and Mongoose for object data modeling (ODM). The app allows you to manage items with basic operations over an API.

---

## 🚀 Features

- Create a new item (POST)
- Read all items (GET)
- Update an item by ID (PUT)
- Delete an item by ID (DELETE)
- Local MongoDB connection using Mongoose

---

## 📁 Folder Structure

Assignment 5/
├── models/
│ └── Item.js
├── routes/
│ └── items.js
├── server.js
├── package.json
├── package-lock.json

---

## ⚙️ Setup Instructions

1. **Clone or unzip the folder**

2. **Install dependencies**

```bash
npm install

Make sure MongoDB is running locally

If you're using MongoDB locally, ensure the service is started:

bash
Copy
Edit
mongod
Create a .env file in the root folder

env
Copy
Edit
PORT=5001
MONGO_URI=mongodb://localhost:27017/crudapp
Start the server

bash
Copy
Edit
npm run dev
Or if you're not using nodemon:

bash
Copy
Edit
node server.js
🧪 API Endpoints
Base URL: http://localhost:5001/api/items

Create Item
POST /api/items
Body:
{
  "name": "Milk",
  "quantity": 2
}


Get All Items
GET /api/items

✏️ Update Item
PUT /api/items/:id

Body:
{
  "name": "Updated Milk",
  "quantity": 5
}


Delete Item
DELETE /api/items/:id

Technologies Used
Node.js
Express.js
MongoDB (local)
Mongoose
dotenv
nodemon (dev)

This project is built to be tested locally and does not require any MongoDB Atlas credentials. Simply ensure your local MongoDB server is running. Create your own .env file and add a MONGO_URI variable. You can also define a custom PORT; otherwise, the server will default to port 5000. I have included a default env file as well as there are no credentials used which need to be kept private.


I'd appreciate some feedback : aayush.makhija@gmail.com
```
