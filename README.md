# ✨ Text Analysis & Authentication API

A modern Node.js + Express application that combines Google OAuth authentication with powerful text analysis capabilities. Users can securely log in and analyze text with detailed statistics including word count, sentence analysis, and more.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## 🚀 Features

- ✅ **Google Sign-In** using OAuth2
- ✅ **JWT token** generation & verification
- ✅ **Secure token storage** via `httpOnly` cookies
- ✅ **Protected API routes** for text analysis
- ✅ **EJS-based frontend** dashboard with dynamic data rendering
- ✅ **Comprehensive text analysis**: character count, word count, sentence count, paragraph count, and longest words
- ✅ **Responsive design** with modern UI/UX
- ✅ **Session management** with automatic token refresh

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Google OAuth2** | Authentication |
| **JWT** | Token management |
| **EJS** | Template engine |
| **PostgreSQL** | Database |
| **Cookie-parser** | Cookie handling |
| **dotenv** | Environment variables |

---

## ⚙️ Prerequisites

Before running the project, ensure you have:

- **Node.js** (v16 or newer) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **PostgreSQL** instance (local or cloud) - [Get started](https://www.postgresql.org/download/)
- **Google Cloud OAuth2 credentials** - [Setup guide](https://developers.google.com/identity/protocols/oauth2)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ankonbiswassopnil/text-analyzer.git
cd text-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost` with hot reloading enabled.

### Production Mode

```bash
npm start
```

### Using PM2 (Recommended for Production)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Stop the application
pm2 stop text-analyzer
```

---

## 📁 Project Structure

```
text-analyzer
├──📁src
│   ├── 📁 config/
│   │   └── database.ts                  # Database configuration
│   ├── 📁 controllers/
│   │   ├── authController.ts            # Authentication logic
│   │   └── textController.ts            # Text analysis logic
│   ├── 📁 middleware/
│   │   ├── authenticateJWT.ts           # JWT verification middleware
│   │   └── validateRequest.ts           # Input validation
│   ├── 📁 models/
│   │   ├── textModel.ts                 # Text model
│   │   └── userModel.ts                 # User model
│   ├── 📁 routes/
│   │   ├── auth.ts                      # Authentication routes
│   │   ├── textRoutes.ts                # API routes
│   │   └── web.ts                       # Web routes
│   ├── 📁 services/
│   │   └── textAnalysisService.ts       # Text analysis service
│   ├── 📁 test/
│   │   ├── authController.test.ts       # Auth Controller Test
│   │   ├── textAnalysis.test.ts         # Text Analysis Service Test
│   │   ├── textController.test.ts       # Text Controller Service Test
│   │   ├── textModel.test.ts            # Text Model Test
│   │   ├── textValidation.test.ts       # Text Validation Test
│   │   └── userModel.test.ts            # User Model Test
│   ├── 📁 validators/
│   │   └── textValidators.ts            # Validator Rules
│   ├── 📁 views/
│   │   ├── dashboard.ejs                # Dashboard Page
│   │   └── login.ejs                    # Login page
│   ├── app.ts                           # Express app setup
│   └── server.ts                        # Server entry point
├── package.json
├── tsconfig.json
└── jest.config.js
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Initiate Google OAuth |
| `GET` | `/auth/google/callback` | Google OAuth callback |
| `POST` | `/auth/logout` | User logout |

### Text Analysis Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/texts` | Create new text content |
| `GET` | `/api/texts/:id` | Get specific text by ID |
| `PUT` | `/api/texts/:id` | Update existing text content |
| `DELETE` | `/api/texts/:id` | Delete text by ID |
| `GET` | `/api/texts/:id/analysis` | Get analysis for specific text |

### Text Analysis Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | User dashboard |


---

## 🎨 Frontend Features

### Dashboard

The user dashboard provides:

- **Welcome section** with user profile information
- **Quick text analysis** form
- **Analysis history** with pagination
- **Statistics overview** with visual charts
- **Export functionality** for analysis results

### Text Analysis Interface

- **Real-time text input** with character counter
- **Instant analysis results** display
- **Analysis history** with search and filter
- **Responsive design** for mobile and desktop

---

## 🛡️ Security Features

- **JWT-based authentication** with secure token storage
- **HTTP-only cookies** to prevent XSS attacks
- **CSRF protection** middleware
- **Rate limiting** on API endpoints
- **Input validation** and sanitization


## 📊 Text Analysis Features

The application provides comprehensive text analysis including:

### Basic Statistics
- **Character count** (with/without spaces)
- **Word count** with intelligent word boundary detection
- **Sentence count** using advanced sentence parsing
- **Paragraph count** based on line breaks

### Advanced Analysis
- **Longest words** extraction and ranking
- **Average words per sentence** calculation
- **Reading time estimation** based on average reading speed
- **Keyword density** analysis
- **Readability score** calculation


## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Ankon Biswas Sopnil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🐛 Troubleshooting

### Common Issues

**Google OAuth not working:**
- Verify your Google Client ID and Secret
- Check redirect URI configuration
- Ensure Google+ API is enabled

**Database connection issues:**
- Confirm PostgreSQL is running
- Check database URL format
- Verify database credentials

**JWT token issues:**
- Check JWT secret configuration
- Verify token expiration settings
- Clear browser cookies and try again

### Getting Help

- **Create an issue** on GitHub
- **Check existing issues** for solutions
- **Join our community** discussions

---

## 📈 Roadmap

- [ ] **Advanced text analytics** (sentiment analysis, keyword extraction)
- [ ] **Multiple language support** for text analysis
- [ ] **API rate limiting** and usage analytics
- [ ] **Real-time collaboration** features
- [ ] **Export to multiple formats** (PDF, Word, etc.)
- [ ] **Text comparison** functionality
- [ ] **Mobile app** development
- [ ] **Plugin system** for custom analyzers

---

## 👥 Authors

- **Ankon Biswas Sopnil** - *Initial work* - [@ankonbiswassopnil](https://github.com/ankonbiswassopnil)

---

## 🙏 Acknowledgments

- Google OAuth2 documentation and community
- Express.js and Node.js communities
- All contributors and users of this project
- Open source libraries that made this project possible

---

## 📞 Support

If you like this project, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting bugs** or suggesting features
- 🤝 **Contributing** to the codebase
- 📢 **Sharing** with others

---

**Made with ❤️ by [Ankon Biswas Sopnil](https://github.com/ankonbiswassopnil)**
