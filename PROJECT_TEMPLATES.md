# 🏗️ Project Templates & Scaffolding Guide

## 📋 **Table of Contents**
- [Frontend Project Templates](#frontend-project-templates)
- [Backend Project Templates](#backend-project-templates)
- [Full-Stack Project Templates](#full-stack-project-templates)
- [Mobile App Templates](#mobile-app-templates)
- [DevOps Templates](#devops-templates)
- [Configuration Templates](#configuration-templates)

---

## 🎨 **Frontend Project Templates**

### **React TypeScript SPA Template**
```
project-name/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   └── features/
│   │       ├── auth/
│   │       ├── dashboard/
│   │       └── profile/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── DashboardPage.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── storage.ts
│   ├── store/
│   │   ├── slices/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components/
│   ├── types/
│   │   ├── api.ts
│   │   ├── user.ts
│   │   └── common.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── setupTests.ts
├── tests/
│   ├── __mocks__/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── utils/
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

### **Next.js Full-Stack Template**
```
project-name/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   └── health.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── [...slug].tsx
├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   └── features/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── api.ts
│   └── utils.ts
├── hooks/
├── store/
├── styles/
├── types/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
├── tests/
├── .env.local.example
└── next.config.js
```

### **Vue 3 Composition API Template**
```
project-name/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── features/
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useStore.ts
│   ├── views/
│   ├── router/
│   │   └── index.ts
│   ├── store/
│   │   ├── modules/
│   │   └── index.ts
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   ├── App.vue
│   └── main.ts
├── tests/
├── public/
├── .env.example
├── vite.config.ts
└── vue.config.js
```

---

## 🔧 **Backend Project Templates**

### **Node.js Express TypeScript API Template**
```
project-name/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── base.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── logging.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── base.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── health.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── email.service.ts
│   │   └── database.service.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── types/
│   │   ├── express.d.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── app.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   ├── fixtures/
│   └── setup.ts
├── docs/
│   ├── api.md
│   └── deployment.md
├── scripts/
│   ├── migrate.ts
│   ├── seed.ts
│   └── build.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

### **Python FastAPI Template**
```
project-name/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   └── health.py
│   │   │   └── api.py
│   │   └── deps.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/
│   │   ├── user.py
│   │   ├── post.py
│   │   └── base.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── post.py
│   │   └── base.py
│   ├── services/
│   │   ├── auth.py
│   │   ├── user.py
│   │   └── email.py
│   ├── utils/
│   │   ├── helpers.py
│   │   ├── validators.py
│   │   └── exceptions.py
│   ├── main.py
│   └── __init__.py
├── tests/
│   ├── api/
│   ├── services/
│   ├── utils/
│   ├── conftest.py
│   └── __init__.py
├── migrations/
├── docs/
├── scripts/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
├── requirements.txt
└── README.md
```

---

## 🌐 **Full-Stack Project Templates**

### **MEAN Stack Template**
```
project-name/
├── client/              # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── models/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── server/              # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── shared/              # Shared types and utilities
│   ├── types/
│   └── utils/
├── docs/
├── scripts/
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

### **T3 Stack Template (Next.js + tRPC + Prisma)**
```
project-name/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── trpc/
│   │   │       └── [trpc].ts
│   │   ├── _app.tsx
│   │   └── index.tsx
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   └── db.ts
│   ├── utils/
│   │   └── api.ts
│   ├── styles/
│   └── env.mjs
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📱 **Mobile App Templates**

### **React Native Expo Template**
```
project-name/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── navigation/
│   │   └── features/
│   ├── screens/
│   │   ├── auth/
│   │   ├── home/
│   │   └── profile/
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── storage.ts
│   ├── store/
│   │   ├── slices/
│   │   └── index.ts
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   └── styles/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── __tests__/
├── .env.example
├── app.config.js
├── App.tsx
├── babel.config.js
├── metro.config.js
└── package.json
```

### **Flutter Template**
```
project-name/
├── lib/
│   ├── core/
│   │   ├── constants/
│   │   ├── errors/
│   │   └── utils/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   ├── domain/
│   │   │   └── presentation/
│   │   └── home/
│   │       ├── data/
│   │       ├── domain/
│   │       └── presentation/
│   ├── shared/
│   │   ├── widgets/
│   │   ├── models/
│   │   └── services/
│   └── main.dart
├── test/
├── assets/
│   ├── images/
│   └── fonts/
├── android/
├── ios/
├── pubspec.yaml
└── analysis_options.yaml
```

---

## 🚀 **DevOps Templates**

### **Docker Configuration**
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Dockerfile.backend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
```

### **Docker Compose Template**
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:4000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    depends_on:
      - database
      - redis
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@database:5432/appdb
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - /app/node_modules

  database:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=appdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### **Kubernetes Deployment Template**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: myapp/frontend:latest
        ports:
        - containerPort: 80
        env:
        - name: API_URL
          value: "http://backend-service:4000"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

---

## ⚙️ **Configuration Templates**

### **ESLint Configuration**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'react-hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
```

### **GitHub Actions CI/CD**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security audit
        run: npm audit --audit-level=high

  deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Add deployment script here
          echo "Deploying to production..."
```

### **Terraform Infrastructure**
```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
```

---

## 📋 **Project Scaffolding Scripts**

### **React Project Generator**
```bash
#!/bin/bash
# create-react-project.sh

PROJECT_NAME=$1
if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./create-react-project.sh <project-name>"
  exit 1
fi

# Create project with Vite
npm create vite@latest $PROJECT_NAME -- --template react-ts
cd $PROJECT_NAME

# Install additional dependencies
npm install @reduxjs/toolkit react-redux react-router-dom
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D eslint-config-prettier prettier husky lint-staged

# Create additional directories
mkdir -p src/{components,hooks,pages,services,store,types,utils}
mkdir -p src/components/{common,layout,features}
mkdir -p tests/{components,hooks,pages,utils}

echo "React TypeScript project '$PROJECT_NAME' created successfully!"
```

### **Node.js API Generator**
```bash
#!/bin/bash
# create-node-api.sh

PROJECT_NAME=$1
if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./create-node-api.sh <project-name>"
  exit 1
fi

mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors helmet morgan dotenv
npm install jsonwebtoken bcryptjs joi
npm install -D typescript @types/node @types/express
npm install -D nodemon ts-node jest @types/jest
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Create directory structure
mkdir -p src/{controllers,middleware,models,routes,services,utils,types,config}
mkdir -p tests/{controllers,services,utils}
mkdir -p docs scripts

echo "Node.js API project '$PROJECT_NAME' created successfully!"
```

---

## 🎯 **Quick Start Commands**

### **Frontend Development**
```bash
# React project
npx create-react-app my-app --template typescript
cd my-app && npm start

# Vue project
npm create vue@latest my-app
cd my-app && npm run dev

# Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app && npm run dev
```

### **Backend Development**
```bash
# Express API
mkdir my-api && cd my-api
npm init -y
npm install express cors helmet morgan
npm install -D typescript @types/node @types/express nodemon ts-node

# FastAPI
pip install fastapi uvicorn[standard]
uvicorn main:app --reload

# NestJS
npm i -g @nestjs/cli
nest new my-api
cd my-api && npm run start:dev
```

### **Database Setup**
```bash
# PostgreSQL with Prisma
npm install prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init

# MongoDB with Mongoose
npm install mongoose
npm install -D @types/mongoose

# Redis
docker run -d -p 6379:6379 redis:alpine
```

---

*These templates provide a solid foundation for various project types, ensuring consistent structure and best practices across your development workflow.*