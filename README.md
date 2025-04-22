# Job Master - Job Search and Application Platform

Job Master is a modern web application that helps job seekers find and apply for jobs efficiently. The platform provides a user-friendly interface with advanced filtering capabilities and a streamlined application process.

## Features

### Job Search and Filtering
- 🔍 Advanced search functionality
- 📍 Location-based filtering
- 💼 Industry-specific job filtering
- 💰 Salary range filtering
- 🔄 Real-time search results

### User Features
- 👤 User authentication and authorization
- 📝 Job application tracking
- 📋 Application history management
- 🔔 Job status notifications
- 📊 Application analytics

### Admin Features
- 👨‍💼 Job posting management
- 📊 Application analytics dashboard
- 👥 User management
- 📈 Performance metrics

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- Shadcn UI components
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Multer for file uploads

## Project Structure

```
Job Master/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store and slices
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main application component
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── server.js          # Server entry point
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-master.git
cd job-master
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get user's applications
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/job-master](https://github.com/yourusername/job-master) 