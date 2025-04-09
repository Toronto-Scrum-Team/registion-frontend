# User Registration Frontend

A modern, responsive user registration and authentication system built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- User registration with email verification
- Login/logout functionality
- Password reset flow
- Profile management
- Responsive design for all devices
- Form validation
- Secure authentication
- Dark/Light mode support

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.3.0](https://nextjs.org/) - React framework with server-side rendering
- **UI Library**: [React 19](https://react.dev/) - JavaScript library for building user interfaces
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Development**:
  - ESLint for code linting
  - Turbopack for fast development experience

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/WangyangYe0512/registion-frontend.git
# or
git clone git@github.com:WangyangYe0512/registion-frontend.git

cd registion-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages and layouts
│   ├── components/      # Reusable UI components
│   ├── lib/            # Utility functions and shared logic
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── .gitignore
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 🔧 Configuration

The application can be configured through environment variables. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## 🧪 Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## 🚢 Deployment

This application can be easily deployed on [Vercel](https://vercel.com/) or any other hosting platform that supports Next.js applications.

```bash
npm run build
npm run start
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
