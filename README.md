# Web Connect MongoDB Dashboard

A full-stack **Next.js App Router** project using **MongoDB + Mongoose** and **shadcn/ui** to build a comprehensive dashboard for managing users and authenticated sessions.

---

## ✨ Features

- **✅ Next.js 16 (App Router)**: Modern server-side rendering and routing.
- **✅ MongoDB with Mongoose**: Robust data modeling and database interaction.
- **✅ Secure Authentication**:
  - JWT-based session management (HttpOnly cookies).
  - Login with **Username** or **Email**.
  - **Google Login**: One-click sign-in using Google OAuth (integrated via shadcn/ui custom button).
  - Secure Registration with password hashing (bcryptjs).
  - Protected Routes via Middleware.
- **✅ Dashboard Management**:
  - **User Management**: CRUD operations (Create, Read, Update, Delete) for users.
  - **Account Management**: Update your own Profile (Email, Password) securely.
- **✅ Modern UI/UX**: Built with **shadcn/ui** components and **Tailwind CSS**.
- **✅ Type-Safety**: 100% TypeScript.

---

## 📁 Project Structure

```text
web_connect_mongodb/
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/             # Auth routes (login, google, logout, register, update-account)
│   │   └── users/            # User CRUD routes
│   ├── dashboard/            # Protected Dashboard
│   │   ├── user/             # User Management Page
│   │   ├── account/          # Account Settings Page
│   │   └── page.tsx          # Redirects to /dashboard/user
│   ├── login/                # Login Page
│   ├── register/             # Registration Page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # UI Components
│   ├── dashboard/            # Dashboard specific components
│   │   ├── sidebar.tsx       # Navigation Sidebar
│   │   ├── user-form.tsx     # User CRUD Form & List
│   │   └── account-form.tsx  # Profile Update Form
│   ├── ui/                   # Reusable shadcn/ui components
│   ├── logout-button.tsx     # Logout logic
│   ├── login-form.tsx        # Login Form (includes Google Auth)
│   └── register-form.tsx     # Registration Form
├── lib/                      # Utilities
│   ├── auth.ts               # Password hashing helpers
│   ├── jwt.ts                # JWT signing/verify
│   └── mongoose.ts           # DB Connection
├── models/                   # Mongoose Models
│   ├── Login.ts              # Auth Accounts
│   └── User.ts               # Dashboard Users
└── middleware.ts             # Auth protection middleware
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
JWT_SECRET_KEY=<your_secure_random_string>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your_google_client_id>
```

> ⚠️ **Security Note:** Never commit `.env.local` to version control.

---

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Access the application:**

   - **Home:** `http://localhost:3000`
   - **Login:** `http://localhost:3000/login`
   - **Dashboard:** `http://localhost:3000/dashboard` (Redirects to User Management)

---

## 🛠️ Functionality Details

### Authentication
- Can register a new account.
- Login accepts either **Username** or **Email**.
- **Google Login**: Can sign in nicely with a Shadcn-styled Google button.
- Sessions are maintained via secure HTTP-only cookies.

### User Management (Dashboard)
- View a list of users stored in the `users` collection.
- Add new users with Name, Email, and Phone.
- Update or Delete existing users.

### Account Settings
- Navigate to **Account Management** to update your profile.
- Change your **Email Address** (verified with password).
- Change your **Password** (verified with current password).

---

## 🧠 Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** MongoDB
- **ORM:** Mongoose
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Auth:** Custom JWT + @react-oauth/google
- **Icons:** Lucide React
- **Validation:** Zod (recommended for future expansion)

---

## 📄 License

MIT License
