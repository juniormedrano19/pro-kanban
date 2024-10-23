# Pro-Kanban

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation-steps)
- [Usage](#using-the-application)
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Additional Notes](#additional-notes)

### Prerequisites
- Node.js and npm installed on your system
- Terminal or command line
- Code editor of your choice

### Installation Steps

1. **Project Download**
   - Download the `client` and `server` folders from the repository

2. **Server Setup**
   ```bash
   # Navigate to the server folder
   cd server

   # Install dependencies
   npm install

   # Start the server (will run on port 4000)
   npm run dev
   ```

3. **Client Setup**
   ```bash
   # In a new terminal, navigate to the client folder
   cd client

   # Install dependencies
   npm install

   # Start the client application (will run on port 5173)
   npm run dev
   ```

### Using the Application

1. **Access**
   - Open your browser and access the local address where the client is running
   - You will be prompted for a username to log in
   - You can use any name or username of your choice

2. **Features**
   - Kanban board with customizable columns
   - Drag and drop functionality for tasks
   - Real-time updates
   - User authentication
   - Task creation and management
   - [Add more specific features of your project]

### Screenshots

Here are some screenshots of the application:

#### Login Page
![Login Page](https://res.cloudinary.com/devs4/image/upload/v1729723899/pro-kanban/461shots_so_njmybp.png)


#### Task Management
![Task Management](https://res.cloudinary.com/devs4/image/upload/v1729724001/pro-kanban/776shots_so_kw1gyc.png)




### Project Structure
```
pro-kanban/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   ├── config/
│   └── package.json
└── README.md
```

### Technologies Used
- **Frontend**:
  - React.js
  - Vite
  - Tailwind
  - Socket Client

- **Backend**:
  - Node.js
  - Express
  - Sockets





## Additional Notes
- The server runs on port 4000
- The client runs on port 5173
- Make sure to have both services (client and server) running simultaneously for proper application functionality
- For any issues or bug reports, please create an issue in the repository


