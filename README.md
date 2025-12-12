# Webform MongoDB Dashboard

A full-stack **Next.js App Router** project using **MongoDB + Mongoose** and **shadcn/ui** to build a simple dashboard for managing users (CRUD).

---

## ✨ Features

- ✅ Next.js 16 (App Router)
- ✅ MongoDB with Mongoose
- ✅ User CRUD (Create, Read, Update, Delete)
- ✅ User Authentication (Login, Register)
- ✅ Server Actions & API Routes ready
- ✅ shadcn/ui + Tailwind CSS
- ✅ TypeScript + ESLint strict
- ✅ JWT Authentication Middleware

---

## 📁 Project Structure

```text
web_connect_mongodb/
├── app/
│   ├── api/              # API routes (users)
│   │   ├── auth/         # Authentication routes (login, logout, register)
│   │   └── users/        # User CRUD routes
│   ├── dashboard/        # Dashboard pages
│   │   ├── page.tsx      # Dashboard entry page
│   │   └── user-dashboard.tsx # User dashboard component
│   ├── login/            # Login pages
│   ├── register/         # Register pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # shadcn/ui components
│   ├── logout-button.tsx # Logout button component
│   └── ui/               # UI components (button, card, input, etc.)
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication helpers
│   ├── jwt.ts            # JWT utilities
│   ├── mongoose.ts       # MongoDB connection
│   └── utils.ts          # General utilities
├── middleware.ts         # Middleware for authentication
├── models/               # Mongoose models
│   ├── Login.ts          # Login model
│   └── User.ts           # User model
├── public/               # Static assets
├── .env.local            # Environment variables (ignored)
├── components.json       # shadcn config
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project metadata
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>
```

> ⚠️ Never commit `.env.local` to GitHub.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open browser:

```text
http://localhost:3000
```

Dashboard:

```text
http://localhost:3000/dashboard
```

---

## 👤 User Management (CRUD)

Dashboard allows:

- ➕ Add user (Name, Email, Phone)
- ✏️ Edit user
- 🗑 Delete user
- 📋 View user list from MongoDB

All data is stored in MongoDB using **Mongoose**.

---

## 🧠 Tech Stack

- **Next.js** (App Router)
- **MongoDB**
- **Mongoose**
- **TypeScript**
- **shadcn/ui**
- **Tailwind CSS**

---

## ✅ Git & Best Practices

- `node_modules`, `.next`, `.env.local` are ignored
- `next-env.d.ts` is committed (recommended by Next.js)
- Database connection is cached to avoid multiple connections

---

## 📌 Notes

- This project is suitable for learning **full‑stack Next.js**
- Can be extended with:
  - Authentication (NextAuth)
  - Role-based access
  - Pagination & search

---

## 📄 License

MIT License
