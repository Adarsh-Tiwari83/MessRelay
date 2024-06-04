# MessRelay - Mess Management System

MessRelay is a comprehensive mess management system built on the MERN stack. It is designed to streamline the management of hostel mess facilities, catering to the needs of students, wardens, and administrators. With MessRelay, users can easily access mess menus, register complaints, rate meals, and more, all through an intuitive and user-friendly interface.

## Features

- **Role-based Access Control**: MessRelay supports three distinct user roles: Student, Warden, and Admin, each with specific privileges and responsibilities.
- **Mess Menu**: Students can view the mess menu of their hostel for each day of the week.
- **Complaint Management**: Students can register complaints, upvote/downvote complaints, edit or delete their own complaints.
- **Warden Dashboard**: Wardens can view all complaints of their hostel and take necessary actions to resolve them.
- **Admin Panel**: Admins have full control over hostel details, including adding, updating, and deleting hostel information.
- **Meal Rating**: Students can rate today's meal, providing valuable feedback for mess management.

## Contributor

- Adarsh Tiwari

## Technologies Used

- **Frontend**: React.js, Redux, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **HTTP Client**: Axios
- **Styling**: SCSS
- **Deployment**: Vercel (Backend), Vercel (Frontend)

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/MessRelay.git`
2. Navigate to the project directory: `cd MessRelay`
3. Install dependencies:
   - For frontend: `cd client && npm install`
   - For backend: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory and add necessary variables like MongoDB connection string, JWT secret, etc.
5. Start the development server:
   - For frontend: `cd client && npm start`
   - For backend: `npm start`

## Contributing

If you'd like to contribute to MessRelay, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.
