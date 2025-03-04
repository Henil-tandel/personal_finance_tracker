# Personal Finance Tracker

This is a personal finance tracker application built with Next.js, React, and MongoDB. It allows users to track their expenses, view monthly expenses in a chart, and manage transactions.

## Features

- Add, edit, and delete transactions
- View transactions in a list
- View monthly expenses in a bar chart
- Responsive design

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/personal_finance_tracker.git
cd personal_finance_tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.qqhwf.mongodb.net/
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `components/Header.jsx`: Header component with navigation links and an "Add Transaction" button.
- `components/Charts.jsx`: Charts component to display monthly expenses in a bar chart.
- `app/page.js`: Main page component that handles fetching, adding, editing, and deleting transactions.
- `app/api/transactions/route.js`: API route for handling CRUD operations with MongoDB.

## API Endpoints

- `GET /api/transactions`: Fetch all transactions.
- `POST /api/transactions`: Add a new transaction.
- `PUT /api/transactions`: Update an existing transaction.
- `DELETE /api/transactions`: Delete a transaction.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
