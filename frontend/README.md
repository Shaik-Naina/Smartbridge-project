# ResolveNow - MERN Stack Complaint Management System

A modern, full-featured complaint management system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Complaint Management**: Create, track, and manage complaints with categories and priorities
- **Real-time Dashboard**: View complaint statistics and status updates
- **Feedback System**: Rate and provide feedback on service quality
- **Responsive Design**: Beautiful UI that works on all devices
- **AI-Ready Architecture**: Built to integrate AI-powered complaint categorization

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hook Form for form handling
- React Toastify for notifications
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- Helmet for security headers
- CORS for cross-origin requests
- Rate limiting for API protection

## 📁 Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   └── ...
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── ...
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install all dependencies**:
   ```bash
   npm run install-deps
   ```

2. **Set up environment variables**:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resolvenow
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

3. **Start the development servers**:
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers concurrently.

## 📱 Usage

1. **Landing Page**: Visit the homepage to learn about ResolveNow
2. **Register/Login**: Create an account or sign in
3. **Dashboard**: View your complaint statistics and quick actions
4. **Create Complaints**: Submit new complaints with categories and priorities
5. **Track Progress**: Monitor complaint status and updates
6. **Provide Feedback**: Rate the service and leave comments

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Complaints
- `GET /api/complaints` - Get user's complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get specific complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Feedback
- `GET /api/feedback` - Get user's feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/stats` - Get feedback statistics

## 🎨 Design System

The application uses a warm, professional color palette:
- **Primary**: #F27A44 (Orange)
- **Secondary**: #FFE8D4 (Light cream)
- **Accent**: #5A3E36 (Dark brown)
- **Background**: #FFF6EC (Cream)

Typography:
- **Headings**: Playfair Display (serif)
- **Body**: Poppins (sans-serif)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet
- Protected routes and middleware

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to your hosting provider

### Backend (Heroku/Railway/DigitalOcean)
1. Set up environment variables on your hosting platform
2. Deploy the backend folder
3. Update the frontend API URLs to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@resolvenow.com or create an issue in the repository.