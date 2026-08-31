# Gym Membership Management System

A full-stack web application for managing gym memberships, tracking member data, and monitoring membership status.

## Features

- **Member Management**: Add, edit, and delete gym members
- **Membership Tracking**: Track membership types, joining dates, and expiration dates
- **Real-time Statistics**: View total members, active members, expired members, and total revenue
- **Search & Filter**: Search members by name and filter by membership status
- **Payment Tracking**: Track payments and membership fees
- **Responsive Design**: Modern, dark-themed UI with smooth animations

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/gym-membership-tracker.git
cd gym-membership-tracker/GYM-TRACKER
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database

Create a PostgreSQL database named `Gym-tracker` and run the following SQL to create the required tables:

```sql
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  membership VARCHAR(100),
  joining DATE,
  end_date DATE,
  price DECIMAL(10, 2)
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  paid_amount DECIMAL(10, 2),
  membership_type VARCHAR(100),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure environment variables

Create a `.env` file in the `server` directory:

```env
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Gym-tracker
```

Or copy the example file:
```bash
cp server/.env.example server/.env
```

Then edit `server/.env` with your actual database credentials.

## Running the Application

### Start the backend server
```bash
npm run server
```
The backend will run on `http://localhost:3000`

### Start the frontend (in a new terminal)
```bash
npm run client
```
The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Click "Add Member" to register a new gym member
3. Fill in the member details (name, phone, membership type, dates, price)
4. View all members in the dashboard
5. Use the search bar to find specific members
6. Filter by "Active" or "Deactivate" status
7. Renew memberships by updating end dates
8. Delete members when needed

## API Endpoints

### Members
- `GET /members` - Get all members
- `POST /members` - Add a new member
- `PUT /members/:id` - Update member end date
- `DELETE /members/:id` - Delete a member

## Project Structure

```
GYM-TRACKER/
├── server/
│   ├── server.js       # Express server
│   ├── db.js           # Database connection
│   ├── .env            # Environment variables (not in git)
│   └── .env.example    # Environment variables template
├── src/
│   ├── app.jsx         # Main React component
│   ├── main.jsx        # React entry point
│   ├── AddMember.jsx   # Add member form
│   ├── dashboard.jsx   # Dashboard component
│   ├── MemberCard.jsx  # Member card component
│   ├── StatsCard.jsx   # Statistics card component
│   └── style.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## Database Schema

### Members Table
- `id` - Unique identifier
- `name` - Member name
- `phone` - Contact number
- `membership` - Type of membership
- `joining` - Membership start date
- `end_date` - Membership expiration date
- `price` - Membership fee

### Payments Table
- `id` - Unique identifier
- `member_id` - Reference to member
- `paid_amount` - Amount paid
- `membership_type` - Type of membership purchased
- `payment_date` - Date of payment

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications for membership renewals
- [ ] Payment gateway integration
- [ ] Export member data to CSV/PDF
- [ ] Membership plan management
- [ ] Attendance tracking
- [ ] Mobile app version

## License

This project is open source and available for educational purposes.

## Author

Developed as a full-stack project demonstrating React, Express, and PostgreSQL integration.

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. Use the provided `.env.example` as a template for setting up your environment variables.
