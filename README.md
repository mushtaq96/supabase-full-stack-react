# Todo Management System

A React-based application integrated with Supabase for managing todo items, featuring CRUD operations with fine-grained access control via Supabase Row Level Security (RLS) policies.

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project demonstrates how to build a todo management system using React for the frontend and Supabase for the backend. It showcases the integration of Supabase's Auth service for user authentication and RLS policies for securing data access.

## Installation

1. Clone the repository:
    ```
    mkdir todo-management-system
    cd todo-management-system
    git clone https://github.com/mushtaq96/supabase-full-stack-react.git
    ```

2. Install dependencies:
    ```
    yarn install
    ```

3. Set up environment variables:
    ```
    touch .env.local
    ```
    Edit `.env` to include your Supabase URL, anon/public keys and database url.

## Usage

Start the development server:
    ```
    yarn start
    ```

Access the application at [http://localhost:3000](http://localhost:3000).

## Features

- **CRUD Operations**: Create, read, update, and delete todo items.
- **Authentication**: Secure user sessions with Supabase Auth.
- **Access Control**: Implement RLS policies for granular data access.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

This README provides a structured overview of the project, including setup instructions, how to use the application, its features, and how to contribute. Adjust the placeholders (e.g., URLs, keys) to match your actual project details.


# Deployment Issues

## 1. Incorrect Redirect URL

The deployed site will attempt to redirect users to `http://localhost:3000`, which occurs when users sign up via a magic link. However, this redirection fails when the deployed version is hosted on Vercel.

### Solution

Update your Supabase configuration to use the correct domain for your deployed site:

1. Log in to your Supabase dashboard (https://app.supabase.com).
2. Navigate to your project.
3. Go to the "Settings" tab.
4. Scroll down to the "Authentication" section.
5. Under "Magic Link", find the "Redirect URL" field.
6. Change the value to your deployed site's URL, e.g., https://your-app-name.vercel.app.

## 2. Fixing the Redirect URL

Implement the following code to fix the redirect issue:

```
 let url = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL) ?? 'http://localhost:3000';
```


This solution ensures that the correct URL is used for redirection, regardless of the environment.

## 3. Testing the Solution

After deploying:

1. Attempt to sign up via a magic link again.
2. The link should redirect to your deployed site's URL instead of localhost.

## Additional Considerations

### SSL Certificate

Ensure your Vercel project has an SSL certificate. You can request one in your Vercel project settings.

### Environment Variables

Double-check that your Supabase URL and other environment variables are correctly set in your Vercel project settings.
