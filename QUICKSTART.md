# SMT Frontend - Quick Start Guide

## ⚡ Quick Setup

### Step 1: Install Node.js

If you don't have Node.js installed, download it from:
- **Recommended**: Install from https://nodejs.org/ (LTS version)
- **Or use Homebrew** (macOS): `brew install node`

### Step 2: Install Dependencies

Open Terminal and run:

```bash
cd "/Users/admin/Documents/Диплом/smt-frontend"
npm install
```

### Step 3: Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

The default configuration connects to `http://localhost:5000/api`

### Step 4: Start Development Server

```bash
npm run dev
```

The app will open at **http://localhost:3000**

---

## 🚀 Usage

### First Time Login

Since this is a new system, you'll need to register first:

1. Go to http://localhost:3000
2. Click "Sign up" or go to http://localhost:3000/register
3. Enter a username and password
4. Click "Create Account"
5. Login with your credentials

### Creating a Tax Table

1. After login, you'll see the Dashboard
2. Click "+ New Year Table"
3. Enter a year name (e.g., "2024")
4. Click "Create"
5. Click "View" on the created table
6. Enter your monthly data:
   - **Turnover** - Your monthly revenue
   - **Tax Payable** - Tax amount you need to pay
   - **Paid Tax** - Tax amount you've already paid
7. Click "Save Changes"

### Mock Data

The app includes sample data for 2023 and 2024 for demonstration. You can:
- View the sample tables
- Edit the data
- Create new tables
- Delete tables

---

## 📁 Project Structure

```
smt-frontend/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login & Register pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Auth.css
│   │   ├── common/         # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── *.css
│   │   ├── TaxTable/       # Tax table components
│   │   │   ├── TaxTableView.tsx
│   │   │   ├── TaxTableList.tsx
│   │   │   └── *.css
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication state
│   ├── pages/
│   │   └── Dashboard.tsx    # Main dashboard page
│   ├── services/
│   │   ├── api.ts          # API client setup
│   │   ├── authService.ts  # Auth API calls
│   │   ├── yearService.ts  # Tax table API calls
│   │   └── mockData.ts     # Sample data
│   ├── types/
│   │   ├── models.ts       # TypeScript types
│   │   └── dto.ts          # API DTOs
│   ├── styles/
│   │   └── global.css      # Global styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔌 Backend Integration

### Backend URL

Edit `.env` to change the backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend Endpoints

The frontend expects these endpoints on your backend:

```
POST   /api/user/register       - Register new user
POST   /api/user/login          - Login user
POST   /api/user/refresh-token  - Refresh access token
GET    /api/years/{id}          - Get year table
POST   /api/years               - Create year table
PUT    /api/years               - Update year table
```

### Running with Backend

1. Start your .NET backend (should be running on port 5000)
2. Start the frontend: `npm run dev`
3. The frontend will proxy API requests to the backend

---

## 🎨 Features

### Authentication
- ✅ User registration
- ✅ User login
- ✅ JWT token management
- ✅ Automatic token refresh
- ✅ Protected routes

### Tax Management
- ✅ Create yearly tax tables
- ✅ View/edit quarterly data
- ✅ Monthly turnover tracking
- ✅ Automatic tax calculation (0.6%)
- ✅ Tax payable tracking
- ✅ Paid tax tracking
- ✅ Balance calculation
- ✅ Quarterly summaries
- ✅ Year summaries

### UI/UX
- ✅ Responsive design
- ✅ Modern gradient theme
- ✅ Smooth animations
- ✅ Clean interface
- ✅ Mobile-friendly

---

## 🐛 Troubleshooting

### "npm: command not found"

Install Node.js from https://nodejs.org/

### Port 3000 already in use

Edit `vite.config.ts` and change the port:

```typescript
server: {
  port: 3001,  // Change to another port
}
```

### Backend connection errors

1. Make sure your .NET backend is running
2. Check the backend URL in `.env`
3. Check CORS settings on the backend

### Build errors

Try clearing node_modules and reinstalling:

```bash
rm -rf node_modules
npm install
```

---

## 📝 Notes

- The app uses **mock data** when the backend is unavailable
- All data is stored in the backend database
- Session is maintained using localStorage
- Tokens are automatically refreshed when expired

---

## 📞 Need Help?

1. Check the main README.md for detailed documentation
2. Review the code comments in the source files
3. Check browser console for error messages

---

**Happy Tax Managing! 📊**
