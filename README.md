# Torre Connect Hub

A modern professional networking and talent discovery platform that revolutionizes how organizations find, analyze, and connect with top talent through intelligent search, comprehensive profile insights, and data-driven job matching.

## 👨‍💻 Author & Project Information

**Author:** Anthony Nebenmor

**GitHub:** https://github.com/nebenmor

**LinkedIn:** https://www.linkedin.com/in/anthony-nebenmor/

**Project Details:**

- **Version:** 1.0.0
- **Created:** June 2025
- **Status:** Active Development
- **License:** MIT
- **Language:** JavaScript (React)

## 🚀 Overview

Torre Connect Hub leverages the Torre.ai API to create a sophisticated talent discovery ecosystem, combining real-time people search, detailed profile analytics, and intelligent job-candidate matching in a sleek, responsive interface.

## ✨ Key Features

### 🔍 Smart People Search Dashboard

- **Real-time streaming search** with advanced debouncing for optimal performance
- **Advanced filtering system** supporting location, skills, and experience parameters
- **Beautiful card-based layout** for intuitive result browsing
- **Progressive loading** with smooth error handling

### 👤 Detailed Profile Explorer

- **Rich genome data visualization** showcasing comprehensive talent profiles
- **Interactive skills radar charts** for quick competency assessment
- **Dynamic experience timeline** highlighting career progression
- **Personality insights** powered by Torre.ai's advanced analytics

### 📊 Talent Analytics Dashboard

- **Search trend analysis** to identify market patterns
- **Skill distribution charts** for workforce intelligence
- **Geographic insights** showing talent concentration maps
- **Real-time data visualization** with interactive charts

### 🎯 Job-Person Matching Interface

- **Side-by-side exploration** of jobs and candidates
- **AI-powered compatibility scoring** with visual indicators
- **Advanced matching algorithms** for optimal talent-role alignment
- **Intuitive comparison tools** to aid decision making

## 🛠 Tech Stack

### Frontend Architecture

- **React 18** - Modern component-based architecture with hooks
- **Tailwind CSS** - Rapid, responsive styling with utility-first approach
- **Component-based design** - Clear separation of concerns and reusability
- **State management** - Efficient hooks-based state handling

### Backend Strategy

- **Express.js Server** - Lightweight, fast backend with CORS middleware
- **API Proxy Layer** - Seamless Torre.ai API integration without CORS issues
- **Environment Configuration** - Secure API key management
- **Error handling** - Robust error management and logging

### Core Technologies

- **Real-time Search** - Streaming endpoints with optimized performance
- **Data Visualization** - Interactive charts and graphs
- **Responsive Design** - Mobile-first approach with cross-device compatibility
- **Progressive Web App** - Enhanced user experience with PWA features

## 🏗 Architecture

```
Torre Connect Hub
├── Frontend (React + Tailwind)
│   ├── Components/
│   │   ├── Common/ (SearchBar, StatsCard, LoadingSpinner)
│   │   ├── Layout/ (Header, Layout)
│   │   ├── Person/ (PersonCard, PersonList, ProfileModal)
│   │   └── Sections/ (Hero, Stats, Results)
│   ├── Hooks/ (useDebounce, useSearch, useProfile)
│   ├── Services/ (torreApi, mockData)
│   └── Utils/ (constants, helpers)
│
├── Backend (Express.js)
│   ├── server.js (Main server file)
│   ├── package.json (Dependencies & scripts)
│   └── .env (Environment variables)
│
└── Integration Layer
    ├── Torre.ai API Proxy
    ├── CORS Configuration
    └── Error Management
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Torre.ai API access

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nebenmor/torre-connects-hub.git
   cd torre-connects-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   Create environment files for both frontend and backend:

   **Backend (.env):**

   ```bash
   cp backend/.env.example backend/.env
   ```

   Configure your backend environment variables:

   ```env
   PORT=3001
   TORRE_API_KEY=your_torre_api_key
   CORS_ORIGIN=http://localhost:3000, http://localhost:5173
   NODE_ENV=development
   ```

4. **Start the backend server**

   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Start the frontend development server**

   ```bash
   # In a new terminal, from project root
   npm install
   npm start
   ```

6. **Open your browser**
   - Frontend: `http://localhost:5173` OR `http://localhost:3000`
   - Backend API: `http://localhost:3001`

## 📁 Project Structure

```
Torre Connect Hub/
├── src/                 # Frontend React application
│   ├── components/      # React components organized by feature
│   │   ├── common/      # Reusable UI components
│   │   │   ├── SearchBar.jsx      # Main search input component
│   │   │   ├── StatsCard.jsx      # Statistics display cards
│   │   │   └── LoadingSpinner.jsx # Loading state indicator
│   │   ├── layout/      # Layout and navigation components
│   │   │   ├── Header.jsx         # Application header
│   │   │   └── Layout.jsx         # Main layout wrapper
│   │   ├── person/      # Person/profile related components
│   │   │   ├── PersonCard.jsx     # Individual person card display
│   │   │   ├── PersonList.jsx     # List of person cards
│   │   │   └── ProfileModal.jsx   # Detailed profile modal
│   │   └── sections/    # Main page sections
│   │       ├── HeroSection.jsx    # Landing hero section
│   │       ├── StatsSection.jsx   # Statistics overview section
│   │       └── ResultsSection.jsx # Search results display
│   ├── hooks/           # Custom React hooks
│   │   ├── useDebounce.js   # Debounced input handling
│   │   ├── useSearch.js     # Search functionality hook
│   │   └── useProfile.js    # Profile data management
│   ├── services/        # API and data services
│   │   ├── api/
│   │   │   └── torreApi.js  # Torre.ai API integration
│   │   └── mockData.js      # Mock data for development
│   ├── utils/           # Utility functions and constants
│   │   ├── constants.js     # Application constants
│   │   └── helpers.js       # Helper functions
│   ├── styles/          # Styling files
│   │   └── globals.css      # Global CSS and Tailwind imports
│   └── App.jsx          # Main application component
├── backend/             # Express.js backend server
│   ├── server.js        # Main Express server configuration
│   ├── package.json     # Backend dependencies and scripts
│   └── .env             # Environment variables (API keys, config)
└── README.md            # Project documentation
```

## 🔧 Configuration

### API Integration

The application uses Torre.ai's API through a proxy layer to handle CORS and provide additional processing:

```javascript
// Example API configuration
const TORRE_ENDPOINTS = {
  PEOPLE_SEARCH: "/api/people/search",
  PERSON_DETAILS: "/api/people/{id}",
  JOB_SEARCH: "/api/jobs/search",
  ANALYTICS: "/api/analytics",
};
```

### Feature Flags

Enable/disable features through environment variables:

```env
ENABLE_ANALYTICS_Dashboard=true
ENABLE_JOB_MATCHING=true
ENABLE_REAL_TIME_SEARCH=true
```

## 🎨 UI/UX Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark/Light Mode** - User preference-based theme switching
- **Accessibility** - WCAG 2.1 compliant interface
- **Progressive Loading** - Smooth loading states and skeleton screens
- **Interactive Charts** - Hover effects and drill-down capabilities

## 🔍 API Integration

Torre Connect Hub integrates with Torre.ai's comprehensive API suite:

- **People Search API** - Real-time talent discovery
- **Person Genome API** - Detailed profile information
- **Jobs API** - Position and opportunity data
- **Analytics API** - Market insights and trends

## 📊 Performance Optimization

- **Debounced search** - Optimized API calls with smart debouncing
- **Lazy loading** - Components and data loaded on demand
- **Caching strategy** - Intelligent data caching for improved performance
- **Bundle optimization** - Code splitting and tree shaking

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Production Build

**Frontend:**

```bash
npm run build
npm run serve
```

**Backend:**

```bash
cd backend
npm start
```

### Environment Variables

Ensure all production environment variables are configured:

**Frontend (.env.production):**

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Backend (.env):**

```env
PORT=3001
TORRE_API_KEY=your_production_torre_api_key
CORS_ORIGIN=https://your-frontend-url.com
NODE_ENV=production
```

## 📈 Roadmap

- [ ] **Enhanced Analytics** - Advanced workforce intelligence features
- [ ] **AI-Powered Recommendations** - Machine learning-based talent suggestions
- [ ] **Integration Ecosystem** - Connect with popular ATS and HR platforms
- [ ] **Mobile App** - Native iOS and Android applications
- [ ] **Advanced Filtering** - More granular search and filtering options

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

This full-stack project demonstrates expertise in modern web development, showcasing both frontend and backend proficiency:

**Frontend Expertise:**

- **React 18** - Component-based architecture with hooks and functional programming
- **Tailwind CSS** - Utility-first responsive design and modern UI/UX
- **Custom Hooks** - Advanced React patterns for state management and side effects
- **API Integration** - Seamless frontend-backend communication with error handling

**Backend Expertise:**

- **Express.js** - RESTful API development with middleware architecture
- **CORS Configuration** - Cross-origin resource sharing and security implementation
- **Environment Management** - Secure API key handling and configuration
- **Server Architecture** - Clean, scalable backend structure

**Full-Stack Integration:**

- **API Proxy Design** - Solving CORS issues with proper server-side API handling
- **Separated Concerns** - Clear separation between frontend and backend responsibilities
- **Development Workflow** - Efficient dual-server development setup
- **Production Ready** - Environment-based configuration for deployment

## 📊 Project Statistics

- **Frontend Components:** 12+ reusable React components across 4 feature areas
- **Custom Hooks:** 3 specialized hooks (useDebounce, useSearch, useProfile)
- **Backend Architecture:** Express.js server with API proxy layer
- **API Integration:** Full Torre.ai API integration with error handling
- **Responsive Design:** Mobile-first approach with cross-device compatibility
- **Performance:** Optimized with debouncing, lazy loading, and efficient data fetching

## 🙏 Acknowledgments

- **Torre.ai** - For providing the comprehensive talent API
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Open Source Community** - For the incredible tools and libraries

## 📞 Contact & Support

**Get in Touch:**

- **Email:** nebenmor.anthony@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/anthony-nebenmor
- **Portfolio:** https://devanthon.vercel.app/

**Project Support:**

- **Documentation** - [Wiki](https://github.com/nebenmor/torre-connect-hub/wiki)
- **Issues** - [GitHub Issues](https://github.com/nebenmor/torre-connect-hub/issues)
- **Discussions** - [GitHub Discussions](https://github.com/nebenmor/torre-connect-hub/discussions)

---

**Torre Connect Hub** - Transforming talent discovery through intelligent technology and beautiful design.
