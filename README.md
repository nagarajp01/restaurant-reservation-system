# Restaurant Reservation Management System

A full-stack restaurant reservation application built using MERN stack.

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Redux Toolkit
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Cookie-based Authentication

## Features

### Customer
- User registration and login
- Create table reservations
- View own reservations
- Cancel reservations

### Admin
- View all reservations
- Filter reservations by date
- Update reservation details
- Cancel/Delete reservations
- Manage restaurant tables

## Role Based Access

The system supports two roles:

1. Customer
- Can only access customer features
- Can manage only their own reservations

2. Admin
- Can access admin dashboard
- Can manage all reservations and tables

JWT authentication is used to protect routes.

## Reservation Availability Logic

The system validates reservations before creating or updating a booking.

### Double Booking Prevention

- Each table can have only one active reservation for a specific date and time slot.
- Before creating a reservation, the backend checks existing bookings with:
  - Table ID
  - Reservation date
  - Time slot
  - Booking status

If a matching reservation already exists, the request is rejected with an error message.

### Table Capacity Validation

- Every table has a predefined seating capacity.
- The requested number of guests is compared with the selected table capacity.
- Reservations exceeding table capacity are not allowed.

Example:

A table with capacity 4 cannot accept a reservation for 6 guests.

### Date and Time Validation

- Past dates are restricted.
- Invalid reservation time slots are prevented.
- Available reservation slots are predefined.

### Error Handling

Invalid booking attempts return proper error responses from the backend.

Examples:
- Table already booked for selected time
- Number of guests exceeds table capacity
- Invalid reservation details

The frontend displays these messages to users.

## Database Models

### User
- FullName
- email
- password
- phone
- role

### Table
- tableNumber
- capacity
- isAvailabe


### Reservation
- customer
- table
- reservationDate
- reservationTime
- numberOfGuests
- status


## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/nagarajp01/restaurant-reservation-system.git

cd restaurant-reservation-system


### 2. Backend Setup

Go to backend folder:

cd backend

Install dependencies:

npm install

Create a .env file and add:

PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=your_frontend_url

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry


Start backend server:

npm run dev


### 3. Frontend Setup

Open another terminal.

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Start React application:

npm run dev


### 4. Access Application

Frontend:

http://localhost:5173

Backend:

http://localhost:8000

Clone repository:

git clone https://github.com/nagarajp01/restaurant-reservation-system.git

Backend setup:

cd backend

npm install

Create a .env file and add:

PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=your_frontend_url

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

Run backend:

npm run dev


Frontend setup:

cd frontend

npm install

npm run dev


## Admin Access Setup

For security reasons, public user registration creates only customer accounts.

Admin accounts are not created from the frontend.  
The initial admin account is configured by updating the user role directly in the MongoDB users collection.

Example:

1. Register a normal user account.
2. Update the user role in MongoDB:

role: "admin"

The user will then get admin privileges.


### Test Admin Credentials

For evaluation purposes, a test admin account is provided:

Email: nagaraj@gmail.com

Password :123456789


Admin Features:
- View all customer reservations
- Filter reservations by date
- Update reservation details
- Cancel/Delete reservations
- Manage restaurant tables


### Customer Access

New users can register directly from the application.

Default role:

role: "customer"

Customer Features:
- Book table reservations
- View personal reservations
- Cancel own reservations


## Authentication & State Management

- JWT based authentication implemented using access and refresh tokens.
- Redux Toolkit is used for managing user authentication state on the frontend.
- Protected routes restrict unauthorized access.
- Role based access control separates Admin and Customer features.

## Assumptions

- Single restaurant system
- Admin manages available tables
- Reservations use predefined time slots
- New users are registered with customer role by default.
- Initial admin account is created by updating the user role in MongoDB.
- Only admins can manage tables and all reservations.
- Customers can manage only their own reservations.

## Known Limitations
- Admin account creation is currently handled manually through database role configuration.
- The system supports a single restaurant setup.
- Payment integration is not included.
- Email/SMS notifications are not implemented.
- Real-time reservation updates are not available.

## Future Improvements
- Add a dedicated admin creation and management feature.
- Implement email notifications for reservation confirmations.
- Add real-time updates using WebSockets.
- Improve UI/UX with advanced styling.
- Add reservation analytics for administrators.

## Security

- Sensitive configuration values are managed using environment variables.
- Database credentials and JWT secrets are stored in a .env file.
- The .env file is excluded from version control using .gitignore.
- No hard-coded secrets or credentials are present in the source code.