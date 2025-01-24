# Contributing to Sua Finança

Thank you for considering contributing to the Sua Finança project! This document provides guidelines to help you contribute effectively.

## Table of Contents

1. [How to Contribute](#how-to-contribute)  
   - [Report Issues](#report-issues)  
   - [Request Features](#request-features)  
   - [Contribute with Code](#contribute-with-code)  
2. [Contribution Guidelines](#contribution-guidelines)  
   - [Code Style](#code-style)  
   - [Commit Structure](#commit-structure)  
3. [Technologies Used](#technologies-used)  
4. [License](#license)  

## How to Contribute

### Report Issues

If you find a bug or issue, please open an issue in the repository with the following details:

- A clear and concise description of the problem;
- Steps to reproduce the problem;
- Expected behavior vs. actual behavior;
- Screenshots or logs, if applicable.

### Request Features

If you have an idea for a new feature, open an issue in the repository with the following details:

- Description of the desired feature;
- Justification for the feature (why it is important);
- Specifications or examples of how the feature should work.

### Contribute with Code

If you want to contribute code, follow these steps:

1. Fork this repository.  
2. Create a new branch for your feature/fix:  
    ```bash
    git checkout -b my-feature
    ```  
3. Implement your changes.  
4. Commit your changes:  
    ```bash
    git commit -m "feat: description of your feature"
    ```  
5. Push your changes to the remote repository:  
    ```bash
    git push origin my-feature
    ```  
6. Open a pull request.

## Contribution Guidelines

### Code Style

Keep the code style consistent with the existing codebase. Use the following tools to help:  

- ESLint for JavaScript code linting;  
- Prettier for code formatting.  

### Commit Structure

- `feat`: Adding a new feature;  
- `fix`: Fixing a bug;  
- `docs`: Documentation changes;  
- `style`: Changes that do not affect code logic (whitespace, formatting, etc.);  
- `refactor`: Refactoring code without adding new features or fixing bugs;  
- `test`: Adding or fixing tests;  
- `chore`: Maintenance tasks.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment;  
- **Express**: Web framework for Node.js;  
- **TypeScript**: Superset of JavaScript with static typing;  
- **Prisma ORM**: Database abstraction for queries and migrations;  
- **JWT**: Token-based authentication and authorization;  
- **Bcrypt**: Password hashing;  
- **Zod**: Schema validation for data;  
- **Winston**: Logging library;  
- **Dotenv**: Environment variable management;

### Frontend

- **Next.js**: React framework for web application development;  
- **React**: Library for building user interfaces;  
- **JavaScript**: Programming language;  
- **CSS**: Styling language for visual presentation;  
- **HTML**: Markup language for webpage structure;  
- **Vercel**: Deployment platform optimized for Next.js applications;  
- **Chart.js**: JavaScript library for creating interactive charts, highly customizable and easy to integrate with React;  
- **Formik**: Tool for managing forms in React;  
- **Axios**: JavaScript library for making HTTP requests, enabling seamless front-to-back communication.

### Testing Tools

- **Vitest**: Unit testing;  
- **Jest**: Unit testing;  
- **Supertest**: Integration testing;  
- **Cypress**: End-to-end testing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
