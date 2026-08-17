# OrderSystem

Full-Stack project developed for my portfolio. This READ.ME was written by Gemini AI after providing the files as input. It was also used throughout the UI build, to fix errors that appeared in the browser console. Additionally, I also used GitHub Co-Pilot as assistance while developing this project.

For evaluation purposes, the person responsible for the testing will have to insert the projects manually in the database. I used the VSCode extension Database Client for this task. When you run the API, a file named database.db will be created in the backend folder, and it should be the path you'll insert here:

<img width="980" height="391" alt="image" src="https://github.com/user-attachments/assets/053cf4ca-0852-4b55-b209-15a67630170b" />


## ⚡ Quick Start  
### 1 . Backend (API)  
```ruby
    cd backend  
	npm install  
	npm start  
```
Runs on http://localhost:3001  

### 2. Frontend (UI)  
```ruby
	cd frontend  
	npm install  
	npm run dev  
```
Runs on http://localhost:5173  


## 🛠️ Tech Stack  

### Frontend:  
Vite: Front-end tool.  
React 18: Component-based UI library.  
Tailwind CSS: Utility-first styling.  
Axios: Promise-based HTTP client for API communication.  
React Router: Declarative routing for navigation.  

### Backend:  
Node.js & Express: Web framework.  
SQLite3: Serverless, zero-configuration SQL database engine.  
CORS: Middleware to enable cross-origin resource sharing.  


## 🚀 Key Features

Cart Logic: Automatic quantity capping (max 10) and real-time total calculation.  
Persistent Storage: Cart data survives browser refreshes via SQLite database.  
Clean Navigation: Uses useNavigate for seamless transitions between Product List, Details, and Cart.  
Error Handling: Integrated UI alerts for API failures (e.g., removal or checkout errors).  


## 📡 API Reference  
### ENDPOINTS:  
| Action | Method | Endpoint |
| :--- | :---: | :--- |
| List Products | **GET** | `/api/products` |
| Get Cart | **GET** | `/api/cart/items` |
| Add to Cart | **POST** | `/api/cart/add` |
| Remove Item | **DELETE** | `/api/cart/remove/:productId` |
| Checkout | **POST** | `/api/cart/checkout` |


## 📁 Project Structure

├── backend  
│   ├── controllers/  # Route handlers (req/res)  
│   ├── models/       # Database queries (SQL)  
│   ├── routes/       # Endpoint definitions  
│   └── database.sqlite  
└── frontend  
    ├── src/  
    │   ├── components/ # Reusable UI (ProductCard, Image)  
    │   ├── pages/      # View logic (CartPage, ProductList)  
    │   └── App.jsx     # Global routes  
  
