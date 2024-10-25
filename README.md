# WAP Project - Online Dictionary

## Introduction

The WAP Online Dictionary is a simple, web-based dictionary application that I developed to allow users to search for word definitions and view popular search terms. The application features a **React** frontend, a **Node.js** backend using **Express**, and a **MySQL** database hosted on AWS RDS.

## Project Overview

The primary goal of this project was to create a functional online dictionary where users can easily find word definitions and explore frequently searched terms. The user interface is built with **React** and styled using **Tailwind CSS** to ensure a clean and responsive design. The backend is built using **Node.js** with **Express**, serving as the API layer to handle requests from the frontend and manage interactions with the MySQL database.

The **MySQL** database stores dictionary entries and tracks popular search terms. The project is deployed online to make it accessible to users.

## Implementation Details

### Prerequisites

To run this project, the following software tools were required:

- **Node.js** and **npm** for managing dependencies and running the backend.
- A **MySQL** database to store the dictionary data.

### Steps to Run the Project

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/TemuulenKhuchit/wap-project.git
   ```

2. **Backend Setup**:

   ```sh
   cd server
   npm install
   npm start
   ```

3. **Frontend Setup**:
   ```sh
   cd ../client
   npm install
   npm start
   ```

## Deployment

The project was deployed to make it accessible to users:

- **Frontend**: I deployed the frontend using **Netlify**, which provides a simple and effective way to host the React application.
- **Backend**: I deployed the backend using **Render**, ensuring that the API is available to respond to requests from the frontend.

Also configured an environment variables on both backend and frontend for security

## Features

The application includes the following features:

- **Word Search**: Users can enter a word to search for its definitions.
- **Popular Terms**: Displays the top 10 most frequently searched words, providing insights into current language trends.

## Technologies Used

The project uses the following technologies:

- **Frontend**: Built with **React** and styled using **Tailwind CSS** for a modern and responsive user interface.
- **Backend**: Developed using **Node.js** and **Express** to handle requests and interact with the database.
- **Database**: The data is stored in a **MySQL** database, hosted on **AWS RDS** for reliability and scalability.

## Conclusion

The WAP Online Dictionary provides an easy-to-use platform for looking up word definitions and exploring trending vocabulary. By integrating modern web technologies, I was able to create a fast, reliable, and visually appealing tool for users to enhance their language learning and exploration.
