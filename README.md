# Blog Admin Dashboard

This repository contains the frontend for the admin dashboard portion of the Blog application, which interacts with my Express.js API. The frontend handles asynchronous requests to the API using **React Query**. It utilizes **React Router** for handling navigation between different pages and features user authentication, and blog CRUD/comment RD.

## Features

- **Asynchronous Data Fetching**: The frontend communicates with the Express API using React Query for efficient data fetching, caching, and synchronization.
- **Dynamic Page Routing**: React Router handles navigation between different pages, including the blog homepage, individual blog posts, and user-specific pages.
- **User Authentication**: The frontend manages user authentication, allowing only admin level users to login. Once logged in they have full CRUD capabilities on any blog or RD on comments
- **Commenting System**: Admins are able to view and delete any comment made on a blog post.
- **Responsive Design**: Tailwind CSS ensures the layout adapts to various screen sizes, providing a seamless experience across devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Query**: A library for fetching, caching, and synchronizing data with the backend API.
- **React Router**: A library for handling navigation and dynamic routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly and responsively.
- **Express.js API**: The backend API that handles requests from the frontend, including user authentication, blog management, and comment processing.
- **JWT Authentication**: JSON Web Tokens for secure user authentication and authorization.
