# User Registration Frontend

A modern, responsive user registration and authentication system built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Introduction

- This project is the frontend of a user registration and authentication system.
- Registration form require First/Last name, email, password, and password confirmation. Email format validation and password strength validation are implemented.
- Login form requires email and password. It use the same email validation as registration form, but only chacks if password is not null, because the the backend will do the actual user authentication, here we just skip it st this moment.
- The email/password are stored in the browser's local storage for a pure frontend demo.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.3.0](https://nextjs.org/) - React framework with server-side rendering
- **UI Library**: [React 19](https://react.dev/) - JavaScript library for building user interfaces
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Testing**: [Jest](https://jestjs.io/) - JavaScript testing framework
- **Development**:
  - ESLint for code linting
  - Turbopack for fast development experience

## 📋 Prerequisites

Before you begin, ensure you have the following tools installed on your system. If you're new to development, don't worry - we'll guide you through each installation step.

### 🔧 Required Tools

#### 1. Git Version Control System

Git is essential for cloning repositories and managing code versions.

**Windows:**
- Download Git from [git-scm.com](https://git-scm.com/download/win)
- Run the installer and follow the setup wizard
- Choose "Git from the command line and also from 3rd-party software" when prompted

**macOS:**
- **Option 1**: Install via Homebrew: `brew install git`
- **Option 2**: Download from [git-scm.com](https://git-scm.com/download/mac)
- **Option 3**: Install Xcode Command Line Tools: `xcode-select --install`

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

**Linux (CentOS/RHEL/Fedora):**
```bash
sudo yum install git
# or for newer versions
sudo dnf install git
```

**Verify Installation:**
```bash
git --version
```
Expected output: `git version 2.x.x` or higher

#### 2. GitHub Account

You'll need a GitHub account to fork repositories and contribute to projects.

1. Visit [github.com](https://github.com)
2. Click "Sign up" and create your account
3. Verify your email address
4. **Optional but recommended**: Set up SSH keys for easier authentication
   - Follow GitHub's guide: [Generating SSH Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

#### 3. Node.js and npm

This project requires Node.js 18.x or higher.

**All Operating Systems:**
1. Visit [nodejs.org](https://nodejs.org/en/download/)
2. Download the LTS (Long Term Support) version for your operating system
3. Run the installer and follow the setup instructions
4. npm (Node Package Manager) is included with Node.js

**Alternative Installation Methods:**

**Windows (using Chocolatey):**
```bash
choco install nodejs
```

**macOS (using Homebrew):**
```bash
brew install node
```

**Linux (using NodeSource repository):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

#### 4. Package Manager (Choose One)

**npm (Recommended - comes with Node.js):**
Already installed with Node.js - no additional setup required.

**Yarn (Alternative):**
```bash
npm install -g yarn
```

### 🛠️ Development Environment (IDE/Editor)

Choose one of the following development environments:

#### Option A: Visual Studio Code (Recommended for beginners)

1. **Download and Install:**
   - Visit [code.visualstudio.com](https://code.visualstudio.com/)
   - Download for your operating system
   - Install following the setup wizard

2. **Essential Extensions:**
   Install these extensions for the best development experience:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Code linting
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - CSS autocomplete
   - [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter) - Auto import for TypeScript
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting

#### Option B: IntelliJ IDEA

1. **Requirements:**
   - **Note**: IntelliJ Ultimate is required for Node.js support (Community Edition doesn't include these features)
   - Download from [jetbrains.com/idea](https://www.jetbrains.com/idea/)

2. **Setup:**
   - Ensure JavaScript, TypeScript, and Node.js plugins are enabled
   - Go to Settings | Plugins | Installed tab to verify
   - Refer to [IntelliJ Node.js Documentation](https://www.jetbrains.com/help/idea/developing-node-js-applications.html)

### ✅ Prerequisites Checklist

Before proceeding, verify you have:
- [ ] Git installed and working (`git --version`)
- [ ] GitHub account created and accessible
- [ ] Node.js 18.x+ installed (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] Code editor/IDE set up with recommended extensions

## 🚀 Getting Started

Choose one of the following strategies based on your needs:

- **Option A (Clone Strategy)**: For exploring the code, learning, or quick testing (read-only access)
- **Option B (Fork Strategy)**: For contributing back to the project or making your own modifications

---

### 📥 Option A: Clone Strategy (Read-Only Access)

This approach is perfect if you want to:
- Explore and learn from the codebase
- Run the application locally for testing
- Study the implementation without making contributions

#### Step-by-Step Instructions:

1. **Clone the repository directly**

   ```bash
   git clone https://github.com/WangyangYe0512/registion-frontend.git
   cd registion-frontend
   ```

   **Expected outcome**: You should see a new `registion-frontend` folder created in your current directory.

   **Verify**:
   ```bash
   ls -la
   ```
   You should see project files like `package.json`, `README.md`, etc.

2. **Install project dependencies**

   ```bash
   npm install
   ```

   **Expected outcome**: npm will download and install all required packages. This may take a few minutes.

   **Verify**:
   ```bash
   ls node_modules
   ```
   You should see many folders containing the installed packages.

3. **Start the development server**

   ```bash
   npm run dev
   ```

   **Expected outcome**: You should see output similar to:
   ```
   ▲ Next.js 15.3.0
   - Local:        http://localhost:3000
   - Ready in 2.3s
   ```

4. **View the application**

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000)

   **Expected outcome**: You should see the registration/login interface.

#### 🔧 Troubleshooting for Option A:

- **"git: command not found"**: Install Git following the Prerequisites section
- **"npm: command not found"**: Install Node.js following the Prerequisites section
- **Port 3000 already in use**: Try `npm run dev -- --port 3001` to use a different port
- **Permission errors on macOS/Linux**: Try `sudo npm install` (not recommended) or fix npm permissions

---

### 🍴 Option B: Fork Strategy (For Contributors)

This approach is ideal if you want to:
- Contribute improvements or bug fixes back to the project
- Create your own version of the project
- Collaborate with the development team

#### Step-by-Step Instructions:

1. **Fork the repository on GitHub**

   a. Visit the [original repository](https://github.com/WangyangYe0512/registion-frontend)

   b. Click the "Fork" button in the top-right corner

   c. Select your GitHub account as the destination

   **Expected outcome**: You now have a copy of the repository under your GitHub account at `https://github.com/YOUR-USERNAME/registion-frontend`

2. **Clone your forked repository**

   ```bash
   # Replace YOUR-USERNAME with your actual GitHub username
   git clone https://github.com/YOUR-USERNAME/registion-frontend.git
   cd registion-frontend
   ```

   **Alternative (SSH - if you set up SSH keys):**
   ```bash
   git clone git@github.com:YOUR-USERNAME/registion-frontend.git
   cd registion-frontend
   ```

   **Verify**:
   ```bash
   git remote -v
   ```
   You should see your fork as the `origin`.

3. **Set up the upstream remote**

   This allows you to sync with the original repository:

   ```bash
   git remote add upstream https://github.com/WangyangYe0512/registion-frontend.git
   ```

   **Verify**:
   ```bash
   git remote -v
   ```
   You should now see both `origin` (your fork) and `upstream` (original repo).

4. **Create a development branch**

   ```bash
   # Create and switch to a new branch for your work
   git checkout -b feature/your-feature-name

   # Or if working on a specific development branch
   git checkout -b development
   ```

   **Expected outcome**: You're now on a new branch separate from `main`.

   **Verify**:
   ```bash
   git branch
   ```
   Your current branch should be highlighted with an asterisk (*).

5. **Install project dependencies**

   ```bash
   npm install
   ```

   **Expected outcome**: All dependencies are installed successfully.

6. **Start the development server**

   ```bash
   npm run dev
   ```

   **Expected outcome**: Development server starts on http://localhost:3000

7. **Make your changes and contribute**

   a. **Make your code changes** using your preferred editor

   b. **Test your changes** by running the application

   c. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: descriptive message about your changes"
   ```

   d. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

   e. **Create a Pull Request**:
   - Visit your fork on GitHub
   - Click "Compare & pull request"
   - Fill out the PR description
   - Submit to the **corresponding development branch** of the original repository

#### 🔄 Keeping Your Fork Updated:

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

#### 🔧 Troubleshooting for Option B:

- **"Permission denied" when cloning**: Use HTTPS instead of SSH, or set up SSH keys
- **"upstream already exists"**: Skip the upstream setup step
- **Merge conflicts**: Use `git status` to see conflicted files, resolve manually, then commit
- **Can't push to upstream**: You can only push to your fork (`origin`), not the original repo (`upstream`)

---

### 🎯 Next Steps

After successfully setting up the project:

1. **Explore the codebase** - Check out the Project Structure section below
2. **Run tests** - Use `npm test` to ensure everything works
3. **Read the documentation** - Familiarize yourself with the technology stack
4. **Start coding** - Begin with small changes to understand the workflow

### 💡 Quick Tips

- **Save time**: Use `npm run dev` for development with hot reloading
- **Code quality**: Run `npm run lint` to check for code style issues
- **Testing**: Always test your changes before committing
- **Documentation**: Update documentation when adding new features

## 🏗️ Project Structure

```
├── public/                     # Static assets
│   ├── fonts/                  # Custom fonts (IBM Plex Serif, Open Sans)
│   │   ├── IBM_Plex_Serif/     # IBM Plex Serif font files
│   │   └── Open_Sans/          # Open Sans font files
│   ├── nightclub-bg.png        # Background image
│   └── *.svg                   # SVG icons and graphics
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── dashboard/          # Dashboard page
│   │   │   └── page.tsx        # Dashboard component
│   │   ├── login/              # Login page
│   │   │   └── page.tsx        # Login form component
│   │   ├── register/           # Registration page
│   │   │   └── page.tsx        # Registration form component
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page component
│   │   ├── globals.css         # Global styles
│   │   └── favicon.ico         # Site favicon
│   ├── components/             # Reusable UI components
│   │   └── auth/               # Authentication-related components
│   │       ├── elements/       # UI elements (buttons, inputs, etc.)
│   │       ├── forms/          # Form components
│   │       └── index.ts        # Component exports
│   ├── lib/                    # Utility functions and shared logic
│   │   ├── api/                # API-related functions
│   │   │   ├── __tests__/      # API unit tests
│   │   │   │   └── auth.test.ts # Authentication API tests
│   │   │   └── auth.ts         # Authentication API functions
│   │   ├── auth/               # Authentication logic
│   │   │   ├── AuthContext.tsx # React Context for auth state
│   │   │   └── useAuth.ts      # Custom auth hook
│   │   └── utils/              # General utility functions
│   │       ├── __tests__/      # Utility unit tests
│   │       │   └── validation.test.ts # Validation function tests
│   │       └── validation.ts   # Form validation utilities
│   └── types/                  # TypeScript type definitions
│       ├── auth.ts             # Authentication-related types
│       └── testing-library.d.ts # Testing library type extensions
├── coverage/                   # Test coverage reports (generated)
│   ├── lcov-report/            # HTML coverage reports
│   ├── clover.xml              # Clover format coverage
│   ├── coverage-final.json     # JSON coverage data
│   └── lcov.info               # LCOV format coverage
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── jest.config.js              # Jest testing configuration
├── jest.setup.js               # Jest setup file
├── next.config.ts              # Next.js configuration
├── next-env.d.ts               # Next.js TypeScript declarations
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Dependency lock file
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.tsbuildinfo        # TypeScript build cache
└── README.md                   # Project documentation
```

### 📁 Key Directories Explained

**`/src/app/`** - Next.js 15 App Router structure
- Each folder represents a client-side route (e.g., `/login`, `/register`, `/dashboard`)
- `page.tsx` files define the UI for each route
- `layout.tsx` provides shared layout across routes

**`/src/components/`** - Reusable React components
- Organized by feature/domain (e.g., `auth/` for authentication)
- Includes both UI elements and complex form components

**`/src/lib/`** - Business logic and utilities
- `api/` - Functions for API communication
- `auth/` - Authentication state management
- `utils/` - General-purpose utility functions
- Each subdirectory includes `__tests__/` for unit tests

**`/src/types/`** - TypeScript type definitions
- Centralized type definitions for better type safety
- Includes custom types for authentication and testing

**`/coverage/`** - Test coverage reports (auto-generated)
- HTML reports viewable in browser
- Multiple formats for CI/CD integration

### 🧪 Testing Structure

The project uses **Jest** with **React Testing Library** for comprehensive testing:

- **Unit Tests**: Located in `__tests__/` directories next to source files
- **Test Configuration**: `jest.config.js` with Next.js integration
- **Coverage Reports**: Generated in `/coverage/` directory
- **Test Scripts**:
  - `npm test` - Run all tests
  - `npm run test:watch` - Run tests in watch mode
  - `npm run test:coverage` - Generate coverage reports

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
