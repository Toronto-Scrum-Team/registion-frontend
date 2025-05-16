# User Registration Frontend

A modern, responsive user registration and authentication system built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- User registration with email verification
- Login/logout functionality- Password reset flow
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

- Node.js 18.x or higher:
  - Download and install [Node.js](https://nodejs.org/en#download)
  - Verify installation: `node -v`
  - Verify npm installation: `npm -v`

- npm or yarn package manager

## 📦 IEDs

- Using intellij for example:

  - **IntelliJ requires a plugin to run Node.js in and the Ultimate version; the Community Edition does not support these features.**

  - Download and install [IntelliJ IDEA](https://www.jetbrains.com/idea/)
  - Download and install [Node.js](https://nodejs.org/en#download)
  - Make sure the JavaScript and TypeScript and Node.js required plugins are enabled on the Settings | Plugins page, tab     Installed.
  - Check the intellij official documentation for more information: [IntelliJ IDEA Node.js](https://www.jetbrains.com/help/idea/developing-node-js-applications.html)

- Using VSCode:
  - Download and install [VSCode](https://code.visualstudio.com/)
  - Install the following extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - If you have already downloaded node.js globally on your computer, please proceed to the next step.

## 🚀 Getting Started

1. **Fork the repository**
Fork this repository to your GitHub account.

2. **Clone the forked repository**

```bash
git clone https://github.com/your-github-username/registion-frontend.git
# or
git clone git@github.com:your-github-username/registion-frontend.git

cd registion-frontend
```

3. **Switch to the development branch**

```bash
git checkout -b the-dev-branch-name
# or
git checkout the-dev-branch-name
```

4. **Install dependencies**

```bash
npm install
# or
yarn install
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

5. **Contribution**

- Create a new branch for your feature or bug fix: `git checkout -b feature-name`
- Make your changes and commit them: `git commit -m "Add feature"`
- Push to the branch: `git push origin feature-name`
- Create a pull request from your branch to the **corresponding development branch** of the [original repository](https://github.com/WangyangYe0512/registion-frontend).

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
