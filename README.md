# ☕ Project Brew

Project Brew is a full‑stack web application built with a **modern, type‑safe stack**. It focuses on clean architecture, predictable state management, and robust validation across the stack.

---

## Ui


Auth - 
<img width="1920" height="994" alt="Screenshot 2026-01-13 at 5 19 56 PM" src="https://github.com/user-attachments/assets/c6b3f842-2477-41ed-a62f-8c9d0802e0bd" />



Browse - 
<img width="1911" height="992" alt="Screenshot 2026-01-13 at 5 28 08 PM" src="https://github.com/user-attachments/assets/82996cee-4361-48ef-9355-e870576938c9" />



Payment - 
<img width="1920" height="991" alt="Screenshot 2026-01-13 at 5 28 26 PM" src="https://github.com/user-attachments/assets/ba1bf732-8060-4a03-bcc3-c32ccf037db8" />





## 🚀 Tech Stack

### Frontend

* **React** – UI development
* Typescript - End-to-end type safety
* **Zustand** – Lightweight global state management

### Backend

* **Node.js + Express** – API server
* **TypeScript** – End‑to‑end type safety
* **Zod** – Runtime validation & schema safety

### Database

* **MongoDB** – Persistent data storage

---

## ✨ Features

* Fully typed frontend and backend
* Predictable global state using Zustand
* Schema‑based request validation with Zod
* RESTful API built with Express
* MongoDB for scalable data persistence
* Clean separation of concerns

---

## 📁 Project Structure (High Level)

```
project-brew/
│
├── client/           # React + Zustand frontend
│
├── server/           # Express backend (TypeScript)
│   ├── routes/
│   ├── controllers/
│   ├── schemas/      # Zod schemas
│   ├── middlewares/
│   └── utils/
│
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or cloud)

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---


## 📄 License

MIT License

---

Built with ☕ and TypeScript.






