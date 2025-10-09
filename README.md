# nextjs-qrshop

A **Next.js** frontend app built to visualize and interface with a .NET 9 e-commerce backend — part of my portfolio project.  
This is an **MVP (Minimum Viable Product)**, focused solely on providing the essential functionality required to display and interact with the backend application. It is not intended to be a refined or production-ready version.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
  - [Building & Deployment](#building--deployment)  
- [Folder Structure](#folder-structure)  
- [Scripts](#scripts)  
- [CI/CD Pipeline](#cicd-pipeline)

---

## Features

- Built with **Next.js (App Router)** and **TypeScript**
- Connects to a **.NET 9 e-commerce API** ([my portfolio backend](https://github.com/dLopes-SE/dotnet-qrshop))
- Provides minimal UI to visualize backend entities (e.g., products, orders, etc.)
- Uses modular folder structure for easy maintenance
- **CI/CD GitHub Action** that automatically builds a **Docker image** and publishes it to the **GitHub Container Registry (GHCR)** under the owner’s account

---

## Tech Stack

- **Next.js** (React Framework)  
- **TypeScript**   
- **Mantine** (UI Lib)
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- **Docker** for containerization  
- **GitHub Actions** for CI/CD

---

## Getting Started

### Prerequisites

You’ll need the following installed locally:

- Node.js (v18 or higher recommended)
- npm or yarn
- Access to the .NET 9 backend API
- Docker (optional, for building or running the container)

---

### Installation

```bash
git clone https://github.com/dLopes-SE/nextjs-qrshop.git
cd nextjs-qrshop
npm install    # or `yarn install`
```

---

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-dotnet9-api.com
# Add any other environment variables if required (e.g. stripe secrets)
```

---

### Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Then open your browser at **http://localhost:3000**

---

### Building & Deployment

Build the production version:

```bash
npm run build
npm run start
```

You can also build and run it via Docker:

```bash
docker build -t nextjs-qrshop .
docker run -p 3000:3000 nextjs-qrshop
```

---

## Folder Structure

```
.
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Utility functions, API clients, hooks
├── providers/            # Context providers, state management
├── public/               # Static assets
├── types/                # TypeScript types and interfaces
└── .github/              # GitHub workflows / CI pipeline
```

---

## Scripts

| Command | Description |
|----------|--------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the built app |

---

## CI/CD Pipeline

This project includes a **GitHub Actions** workflow that automatically:

1. Builds the project  
2. Creates a **Docker image**  
3. Publishes the image to the **GitHub Container Registry (GHCR)** under the account’s namespace  

The workflow file can be found under:  
```
.github/workflows/publish-ghcr.yml
```

Once the pipeline runs successfully, you can pull the image using:

```bash
docker pull ghcr.io/dlopes-se/nextjs-qrshop:latest
```
