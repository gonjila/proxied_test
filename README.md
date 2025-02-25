# Proxied Shopping

<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

## 📝 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation-setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Authors](#authors)

---

## 🧐 About <div id="about"></a>

Proxied Shopping is a modern e-commerce application built with **Next.js 15**, designed for optimal performance, scalability, and real-time shopping experiences. It integrates **GraphQL with Apollo Client**, leveraging **Zustand** for state management. The application supports dynamic updates and seamless shopping interactions.

---

## 🚀 Tech Stack <div id="tech-stack"></div>

- **Next.js 15** - React Framework for SSR & SSG
- **Apollo Client** - GraphQL Queries & Mutations
- **Zod** - Schema validation
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **TypeScript** - Static typing
- **ESLint & Prettier** - Code quality & formatting

---

## 🛠 Installation & Setup <div id="installation-setup"></div>

### Prerequisites

Ensure you have the following installed:

- **Node.js (>=18.x)**
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/gonjila/proxied_test.git
cd proxied_test

```

### Install Dependencies

```bash
yarn install  # or npm install
```

### Set Up Environment Variables

Create a `.env` file and add:

```bash
NEXT_PUBLIC_GRAPHQL_API_URL=graphql_endpoint_here #without protocol
```

### Start the Development Server

```bash
yarn dev  # or npm run dev
```

The app will run on `http://localhost:3000` by default.

### Build and preview the project

```bash
yarn build  # or npm run build

yarn start # or npm start
```

The app will run on `http://localhost:3000` by default.

---

## 📂 Project Structure <div id="project-structure"></div>

```bash
proxied-shopping/
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── constants/      # Constant values
│   ├── gql/            # GraphQL queries/mutations
│   ├── store/          # Zustand state management
│   ├── utils/          # Helper functions
│   ├── validation/     # Validation schemas
│   ├── middleware.ts   # Middleware logic
├── public/             # Static assets
├── .env                # Environment variables
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

---

## 🔧 Usage <div id="usage"></div>

Once the server is running:

- Browse products and add to cart.
- Real-time updates on stock changes via GraphQL subscriptions.
- State management using Zustand for better performance.

---

## 🧪 Testing <div id="testing"></div>

### Running Tests

The project uses **Jest** and **React Testing Library** for unit and integration testing.

1. Run all tests:

   ```bash
   yarn test  # or npm run test
   ```

2. Run tests in watch mode:

   ```bash
   yarn test --watch  # or npm run test -- --watch
   ```

3. Run tests with coverage report:

   ```bash
   yarn test --coverage  # or npm run test -- --coverage
   ```

---

## ✍️ Authors <div id="authors"></div>

- [@gonjila](https://github.com/gonjila)
