# 🏠 Real Estate Management Platform

A modern, full-stack web application for managing real estate properties with an emphasis on security, scalability, and user experience. Built from scratch to demonstrate advanced web development principles while leveraging industry-standard technologies.

---

## 📖 My Development Journey

As a **Telecommunications Engineering student**, I embarked on an exciting transition into full-stack web development by building this real estate management platform from the ground up. This project represents more than just code—it's a testament to the power of self-directed learning and the seamless transfer of analytical thinking from telecommunications into software architecture.

### The Challenge
Coming from a telecommunications engineering background, I had a strong foundation in systems architecture and network protocols, but web development was uncharted territory. I challenged myself to build a production-ready application that incorporated modern security practices, clean architectural patterns, and scalable design principles—not just a simple CRUD app.

### What I Learned
This project forced me to think like a full-stack engineer:
- **Backend Architecture**: Designing RESTful APIs and MVC patterns with clear separation of concerns
- **Database Design**: Modeling complex relationships between users, properties, and transactions using Sequelize ORM
- **Security First**: Implementing JWT authentication, CSRF protection, password hashing with bcrypt, and security headers with Helmet
- **Frontend Integration**: Building interactive user interfaces with Pug templates and vanilla JavaScript, enhanced with Talwind CSS
- **DevOps Mindset**: Managing environment variables, database migrations, and development workflows with npm scripts

This journey has solidified my belief that strong fundamentals in any engineering discipline translate beautifully into software development.

---

## 🛠️ Tech Stack & Architecture

### Architecture Pattern: **MVC (Model-View-Controller)**
The application strictly follows MVC principles, ensuring clean separation of concerns:
- **Models**: Sequelize ORM models define the data layer (Usuario, Properties, Messages, Prices, Tags)
- **Views**: Pug template engine renders dynamic HTML with reusable components
- **Controllers**: Express route handlers manage business logic and orchestrate requests

### Core Technologies

| Layer | Technologies | Purpose |
|-------|--------------|---------|
| **Backend Runtime** | Node.js 18+ | JavaScript runtime for server-side execution |
| **Web Framework** | Express.js 5.x | Lightweight, flexible HTTP server and routing |
| **Database** | MySQL | Relational database for persistent data storage |
| **ORM** | Sequelize 6.x | Object-Relational Mapping for database abstraction |
| **Template Engine** | Pug 3.x | Dynamic HTML generation with elegant syntax |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS framework for rapid UI development |
| **CSS Tooling** | PostCSS, Autoprefixer | CSS processing and vendor prefix automation |
| **JS Bundling** | Webpack 5 | Module bundling and JavaScript optimization |
| **Authentication** | JWT (jsonwebtoken) | Token-based user session management |
| **Password Security** | bcrypt 6.x | Industry-standard password hashing |
| **File Uploads** | Multer, Dropzone.js | Backend and frontend file handling |
| **Email Service** | Nodemailer 8.x | Email notifications and user communications |
| **Security Headers** | Helmet 8.x | HTTP security headers (CSP, X-Frame-Options, etc.) |
| **CSRF Protection** | csrf-csrf 4.x | Double-submit cookie CSRF protection |
| **Input Validation** | express-validator 7.x | Server-side request validation |
| **Environment Config** | dotenv | Secure environment variable management |
| **Development** | Nodemon 3.x | Auto-restart server on file changes |

### Architecture Highlights

**Security is built-in, not bolted-on:**
- Helmet.js configures secure HTTP headers with Content Security Policy (CSP)
- CSRF protection via double-submit cookie pattern
- Password hashing with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Cookie-based session management with secure flags

**Scalable Database Design:**
- Sequelize migrations ensure version control for schema changes
- Relationships properly defined (Users → Properties → Messages)
- Database seeding for development data

**Performance Optimization:**
- Webpack bundles JavaScript modules for production efficiency
- Tailwind CSS purges unused styles for minimal CSS payload
- PostCSS autoprefixer ensures browser compatibility

---

## ✨ Features

### 🔐 User Authentication & Authorization
- **User Registration**: Email-based account creation with validation
- **Secure Login**: JWT-based authentication with refresh tokens
- **Password Security**: bcrypt hashing with automatic account confirmation
- **Session Management**: Cookie-based sessions with secure flags
- **Protected Routes**: Middleware-enforced authorization checks

### 🏠 Property Management
- **Create Properties**: Administrators can list new properties with detailed information
- **Property Browsing**: Users can search and filter properties by various criteria
- **Image Uploads**: Drag-and-drop image uploads with Dropzone.js + Multer backend processing
- **Property Details**: Full property information including location, amenities, pricing
- **Edit & Delete**: Authorized users can manage their property listings

### 📍 Interactive Mapping
- **Leaflet.js Integration**: Display properties on interactive OpenStreetMap maps
- **Geocoding**: Real-time address-to-coordinates conversion
- **Map Clustering**: Visual property markers with zoom levels
- **Multiple Map Views**: Dedicated maps for individual properties and search results

### 💬 Messaging System
- **Contact Inquiries**: Potential buyers can send messages to property sellers
- **Message Management**: View and respond to property inquiries
- **Notification System**: Email alerts for new messages

### 💰 Pricing & Categorization
- **Dynamic Pricing Tiers**: Flexible property pricing system
- **Property Tags**: Categorize properties (Apartment, House, Land, Commercial, etc.)
- **Price Filtering**: Search properties within budget ranges

### 📧 Email Notifications
- **Account Confirmation**: Automated emails for new user registration
- **Password Reset**: Secure token-based password recovery
- **Inquiry Alerts**: Notify sellers of new property inquiries
- **Built with Nodemailer**: Reliable SMTP integration

### 🔒 Advanced Security Features
- **CSRF Protection**: Double-submit cookie pattern for form security
- **XSS Prevention**: Content Security Policy headers
- **Input Validation**: Server-side validation on all forms
- **SQL Injection Prevention**: Sequelize parameterized queries
- **Secure Headers**: Helmet.js configures X-Frame-Options, X-Content-Type-Options, etc.

---

## 📁 Project Structure

```
RealEstateProject/
├── config/                 # Configuration files
│   └── db.js              # Sequelize database connection setup
├── controller/            # MVC Controllers - business logic layer
│   ├── apiController.js   # API endpoints for data operations
│   ├── appController.js   # Application route handlers
│   ├── propertiesController.js  # Property CRUD operations
│   └── usuarioController.js     # User authentication & management
├── helpers/               # Utility functions
│   ├── email.js           # Nodemailer email service
│   ├── tokens.js          # JWT token generation & validation
│   └── index.js           # Helper function exports
├── middleware/            # Express middleware
│   ├── identifyUser.js    # User identification from JWT
│   ├── protectRoute.js    # Authentication guard middleware
│   └── uploadFile.js      # Multer file upload configuration
├── models/                # Sequelize ORM models
│   ├── Usuario.js         # User model with authentication
│   ├── properties.js      # Property listings model
│   ├── Message.js         # Property inquiry messages
│   ├── prices.js          # Pricing tiers model
│   └── tags.js            # Property categorization
├── routes/                # Express route definitions
│   ├── appRoutes.js       # Frontend view routes
│   ├── customerRoutes.js  # Authentication routes (register, login)
│   ├── propertiesRoutes.js # Property management routes
│   └── apiRoutes.js       # RESTful API routes (JSON)
├── seed/                  # Database seeding
│   ├── seeder.js          # Main seeder orchestration
│   ├── tag.js             # Tag seed data
│   └── price.js           # Pricing tier seed data
├── src/                   # Source files for Webpack
│   └── js/                # Client-side JavaScript
│       ├── mapa.js        # Map initialization
│       ├── addimage.js    # Dropzone image upload
│       ├── showMap.js     # Property map display
│       ├── mapaHome.js    # Homepage map
│       └── changeState.js # Dynamic state management
├── public/                # Static assets
│   ├── css/               # Compiled CSS
│   │   ├── app.css        # Compiled Tailwind CSS
│   │   └── tailwind.css   # Tailwind source
│   ├── js/                # Webpack-bundled JavaScript
│   └── uploads/           # User-uploaded images
├── views/                 # Pug templates
│   ├── layout/            # Layout templates
│   │   ├── app.pug        # Main application layout
│   │   ├── admin.pug      # Admin dashboard layout
│   │   └── includes/      # Reusable components (headers, navigation)
│   ├── auth/              # Authentication templates
│   │   ├── login.pug
│   │   ├── register.pug
│   │   ├── forget-password.pug
│   │   ├── reset-password.pug
│   │   └── confirmaccount.pug
│   ├── properties/        # Property management templates
│   │   ├── create.pug     # New property creation form
│   │   ├── edit.pug       # Property editing form
│   │   ├── show.pug       # Single property details
│   │   ├── admin.pug      # Property admin dashboard
│   │   ├── get-image.pug  # Image gallery
│   │   └── messages.pug   # Inquiries/messages view
│   ├── home.pug           # Homepage
│   ├── search.pug         # Property search results
│   ├── tags.pug           # Property categorization
│   ├── 404.pug            # Error page
│   └── templates/         # Reusable message templates
├── index.js               # Express server entry point
├── package.json           # Project dependencies and scripts
├── webpack.config.js      # Webpack bundling configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .env.example           # Environment variables template
```

---


## 🔮 Future Improvements

The following features are planned for future releases:

- **Automated Property Recommendations**: Machine learning-based property suggestions based on user preferences and browsing history
- **Virtual Property Tours**: 360° panoramic image support and video walkthroughs
- **Advanced Analytics Dashboard**: Property performance metrics, market trends, and ROI calculations for agents
- **Payment Integration**: Stripe/PayPal integration for transaction processing and rental payments
- **Real-Time Notifications**: WebSocket integration for instant messaging and alerts
- **Mobile Responsive Enhancements**: Progressive Web App (PWA) capabilities for mobile access
- **Docker Containerization**: Docker Compose setup for easy deployment and environment consistency
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions
- **Multi-language Support**: i18n implementation for internationalization
- **Testimonials & Reviews**: User rating system for properties and agents
- **Advanced Search Filters**: Saved searches, alerts, and custom filtering criteria
- **Social Sharing**: Share properties on social media platforms

---

## 📞 Contact & Support

For questions, issues, or collaboration inquiries:
- **GitHub Issues**: [Report bugs and request features](https://github.com/alejhomoreno/RealEstateProject/issues)
---

## 🎓 Lessons Learned

Building this project as a Telecommunications Engineering student transitioning into web development taught me:

1. **Architecture First**: Clean MVC separation prevents chaos as projects grow
2. **Security is Not Optional**: Security features must be built in from day one, not added later
3. **Database Design Matters**: Proper normalization and relationships prevent headaches
4. **Development Experience Counts**: Nodemon, webpack-watch, and CSS compilation save countless hours
5. **Full-Stack Thinking**: Frontend and backend must communicate seamlessly through clean APIs
6. **Version Control & Git Workflows**: Essential for managing project complexity
7. **Documentation is Code**: Clear comments and README files are as important as the code itself

---

**Built with ❤️ by Alejandro Moreno | Telecommunications Engineering Student & Full-Stack Developer**

*Last Updated: March 2026*
