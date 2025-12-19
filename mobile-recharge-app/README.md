# Mobile Recharge Web Application - React Version

A modern React-based mobile recharge application built with Vite, featuring authentication, routing, form validation, and responsive design.

## 🚀 Features

- **React + Vite**: Fast development with modern tooling
- **React Router v6**: Client-side routing and navigation
- **Context API**: Global state management for authentication
- **React Hook Form + Yup**: Form handling with validation
- **Tailwind CSS**: Utility-first styling and responsive design
- **Component Architecture**: Reusable and maintainable components

## 🛠️ Technologies Used

- **React 18**: Modern React with functional components and hooks
- **Vite**: Fast build tool and development server
- **React Router DOM**: Declarative routing for React
- **React Hook Form**: Performant forms with easy validation
- **Yup**: Schema validation library
- **Tailwind CSS**: Utility-first CSS framework

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Sidebar.jsx     # Sidebar with toggle
│   └── PlanCard.jsx    # Plan display component
├── pages/              # Page components
│   ├── LandingPage.jsx # Home page
│   ├── Login.jsx       # Login form
│   ├── Signup.jsx      # Registration form
│   └── RechargePlans.jsx # Plans listing
├── context/            # React Context
│   └── AuthContext.jsx # Authentication state
├── utils/              # Utility functions
│   └── validationSchemas.js # Yup schemas
└── App.jsx            # Main app component
```

## 🔧 Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📱 Core React Concepts Implemented

- **JSX**: HTML-like syntax in JavaScript
- **Virtual DOM**: Efficient DOM updates
- **Functional Components**: Modern component approach
- **Props & State**: Data flow and state management
- **Component Hierarchy**: Structured component tree
- **Hooks**: useState, useContext, useEffect

## 🔍 Form Validation

- **Login**: Email format, password length
- **Signup**: Name, email, phone (10 digits), password matching
- **Real-time validation**: Immediate error feedback
- **Schema-based**: Yup validation schemas

## 🎨 Styling

- **Tailwind CSS**: Utility-first approach
- **Custom Colors**: Brand-specific color palette
- **Responsive Design**: Mobile-first responsive layout
- **Interactive Elements**: Hover effects and transitions

## 🔄 State Management

- **AuthContext**: Global authentication state
- **useState**: Local component state
- **Props**: Parent-child data flow
- **Context API**: Cross-component state sharing

## 🌐 API Integration

- **Fetch API**: HTTP requests for plan data
- **Fallback Data**: Offline functionality
- **Loading States**: User feedback during requests
- **Error Handling**: Graceful error management