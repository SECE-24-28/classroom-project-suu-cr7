# Mobile Recharge Web Application

A complete frontend web application for mobile recharge and bill payment services, built following a 5-day development plan.

## 🚀 Features

- **User Authentication**: Login and signup with form validation
- **Dashboard**: User-friendly dashboard with quick access to services
- **Mobile Recharge**: Support for both prepaid and postpaid recharges
- **Plan Selection**: Dynamic plan browsing with API integration
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS
- **Form Validation**: Client-side validation for all forms
- **Interactive UI**: Dynamic content updates and smooth animations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling and animations
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Client-side functionality and API integration
- **MockAPI.io**: Dummy REST API for recharge plans
- **LocalStorage**: Client-side data persistence

## 📁 Project Structure

```
Front/
├── index.html          # Landing page
├── login.html          # User login page
├── signup.html         # User registration page
├── dashboard.html      # User dashboard
├── recharge.html       # Mobile recharge form
├── plans.html          # Recharge plans with API integration
├── styles.css          # Additional custom styles
├── mo.jpeg            # Hero image
└── README.md          # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: #58545F (Dark gray-purple)
- **Secondary**: #A97882 (Muted rose)
- **Background**: #F9FAFB (Light gray)
- **Text**: #374151 (Dark gray)

### Typography
- Clean, modern sans-serif fonts
- Consistent spacing and hierarchy
- Accessible contrast ratios

## 🔧 Setup Instructions

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **Navigate** through the application using the menu links

### For API Integration:
1. The application uses a MockAPI endpoint: `https://65f5b8e741d90c1c5e0a6f8b.mockapi.io/plans`
2. If the API is unavailable, fallback data is automatically loaded
3. To create your own MockAPI:
   - Visit [mockapi.io](https://mockapi.io)
   - Create a new project
   - Add an endpoint called "plans"
   - Update the API_URL in `plans.html`

## 📱 User Flow

1. **Landing Page** → Choose between prepaid/postpaid recharge
2. **Authentication** → Login or signup (optional for demo)
3. **Dashboard** → Access all services and view transaction history
4. **Recharge Form** → Enter mobile number and amount
5. **Plan Selection** → Browse and select from available plans
6. **Payment** → Confirm and process payment (simulated)

## ✨ Key Features Implementation

### Day 2: HTML Structure
- Semantic HTML5 elements
- Proper form structure
- Navigation between pages
- Accessibility considerations

### Day 3: CSS & Tailwind Styling
- Responsive grid layouts
- Custom color scheme
- Interactive hover effects
- Mobile-first design approach

### Day 4: JavaScript Functionality
- Form validation with real-time feedback
- DOM manipulation for dynamic content
- Event handling for user interactions
- Local storage for user session management

### Day 5: API Integration
- Fetch API for HTTP requests
- Dynamic content rendering
- Loading states and error handling
- Fallback data for offline functionality

## 🔍 Form Validations

### Login/Signup Forms:
- Email format validation
- Password length requirements
- Phone number format (10 digits)
- Real-time error messaging

### Recharge Form:
- Mobile number validation (10 digits)
- Amount range validation (₹10 - ₹5000)
- Operator selection requirement
- Payment confirmation modal

## 📊 Sample API Data Structure

```json
{
  "id": "1",
  "type": "prepaid",
  "price": 199,
  "validity": "28 days",
  "data": "1.5GB/day",
  "description": "Unlimited calls + 100 SMS/day"
}
```

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🚀 Future Enhancements

- Backend integration with Node.js/Express
- Real payment gateway integration
- User profile management
- Transaction history with database
- Push notifications
- PWA capabilities

## 📝 Development Notes

- Uses modern JavaScript (ES6+) features
- Implements responsive design principles
- Follows web accessibility guidelines
- Includes error handling and fallback mechanisms
- Optimized for performance and user experience

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.