# Webform MongoDB Dashboard

A full-stack **Next.js App Router** project using **MongoDB + Mongoose** and **shadcn/ui** to build a simple dashboard for managing users (CRUD).

---

## ✨ Features

- ✅ Next.js 16 (App Router)
- ✅ MongoDB with Mongoose
- ✅ User CRUD (Create, Read, Update, Delete)
- ✅ Server Actions & API Routes ready
- ✅ shadcn/ui + Tailwind CSS
- ✅ TypeScript + ESLint strict

---

## 📁 Project Structure

```text
webformongodb/
├── app/
│   ├── api/              # API routes (users)
│   ├── dashboard/        # Dashboard pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css
├── components/           # shadcn/ui components
├── lib/                  # DB connection (mongoose)
├── models/               # Mongoose models
├── public/
├── .env.local            # Environment variables (ignored)
├── components.json       # shadcn config
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
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

