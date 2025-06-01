# EasyTourney Frontend

The frontend application for **EasyTourney**, a platform for organizing and managing esports tournaments. This project is built using **React** with **TypeScript** and follows a modular structure to support scalability and maintainability.

## 🚀 Features

- User authentication
- Tournament creation and management
- Match scheduling and result reporting
- Admin dashboard
- Real-time updates (via polling or websockets, if supported)
- Responsive UI

## 🧰 Tech Stack

- ⚛️ React
- ⛑ TypeScript
- 📦 Redux Toolkit
- 🎨 SCSS Modules
- 📡 Axios (for API requests)
- 🧪 Jest & React Testing Library
- 🏗 React Router

## 📦 Installation

### Prerequisites

- Node.js ≥ 14
- npm ≥ 6

### Setup

Clone the repository:

```bash
git clone https://github.com/EasyTourney/easy-tourney-fe.git
cd easy-tourney-fe
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example` if available and configure your environment variables.

## 🚀 Available Scripts

### Start development server

```bash
npm start
```

Runs the app in development mode.
Visit: [http://localhost:3003](http://localhost:3003)

### Run tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Build for production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Linting and formatting

```bash
npm run lint
npm run format
```

Uses ESLint and Prettier to lint and format the codebase.

## 📁 Folder Structure

```bash
├── public/             # Static files and index.html
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application views/pages
│   ├── services/       # API communication
│   ├── store/          # Redux Toolkit store & slices
│   ├── utils/          # Utility functions
│   ├── assets/         # Images, icons, styles
│   └── App.tsx         # Main app component
├── .eslintrc.json      # ESLint config
├── .prettierrc         # Prettier config
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript config
└── Jenkinsfile         # CI/CD pipeline config
```

## 🚀 Deployment

This app can be deployed to any static hosting provider (Netlify, Vercel, etc.) or served with a Node.js backend.
Make sure to build the project before deployment:

```bash
npm run build
```

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

> For backend and deployment instructions, see [easy-tourney-be](https://github.com/EasyTourney/easy-tourney-be)
