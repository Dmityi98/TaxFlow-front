# SMT Frontend - Tax Management System

A modern React-based frontend application for tax management, built with TypeScript and Vite.

## Features

- 🔐 **Authentication**
  - User login
  - User registration
  - JWT token management with automatic refresh
  - Protected routes

- 📊 **Tax Table Management**
  - Create yearly tax tables
  - View and edit quarterly data
  - Track monthly turnover, tax calculations, and payments
  - Automatic tax calculation (0.6% of turnover)
  - Balance tracking (paid vs payable)
  - Year summaries

- 🎨 **Modern UI**
  - Responsive design
  - Gradient themes
  - Smooth animations
  - Clean and intuitive interface

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Axios** - HTTP client

## Project Structure

```
smt-frontend/
├── src/
│   ├── components/
│   │   ├── Auth/          # Login & Register pages
│   │   ├── common/        # Reusable UI components
│   │   ├── TaxTable/      # Tax table components
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── yearService.ts
│   │   └── mockData.ts
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   ├── models.ts
│   │   ├── dto.ts
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd smt-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend connects to the backend API at the URL specified in `.env`.

### Backend Endpoints Used:

#### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `POST /api/user/refresh-token` - Refresh access token

#### Tax Tables
- `GET /api/years/{id}` - Get year table by ID
- `POST /api/years` - Create new year table
- `PUT /api/years` - Update year table

## Mock Data

The application includes mock data for demonstration purposes. When the backend is unavailable, it will automatically use mock data for:
- Sample year tables (2023, 2024)
- Pre-populated quarterly data
- Monthly turnover and tax information

## Data Models

The frontend types match the backend C# models:

- **User** - Authentication entity
- **Year** - Tax year table
- **Quarter** - Quarterly data container
- **MonthColumn** - Monthly tax data with turnover, tax, and payment tracking
- **Month** - Enum for months (January - December)

## Key Features Explained

### Tax Calculation
- Tax is automatically calculated as 0.6% of turnover
- Formula: `Tax = Turnover × 0.006`

### Balance Tracking
- Balance = Paid Tax - Tax Payable
- Positive balance (green) = Overpaid
- Negative balance (red) = Underpaid

### Quarterly Summaries
- Each quarter shows totals for:
  - Turnover
  - Calculated tax
  - Tax payable
  - Paid tax
  - Balance

### Year Summary
- Aggregated totals for all quarters
- Quick overview of annual tax obligations

## Styling

The application uses custom CSS with:
- CSS Variables for theming
- Gradient backgrounds
- Responsive design
- Smooth transitions and animations
- Modern card-based layouts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the SMT (Tax Management System) application.
