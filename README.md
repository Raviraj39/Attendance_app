# **Attendance Management System**

A comprehensive attendance tracking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system supports three user roles: **Student**, **Teacher**, and **Admin**, each with distinct permissions and responsibilities. It provides features like attendance marking, history tracking, and user management.

---

## **Features**

### **1. Student**
- **Registration & Login**:
  - Register with full name, email, and password.
  - Login with email and password.
  - Password reset functionality.
- **Mark Attendance**:
  - Capture attendance with timestamp and selfie upload.
- **Attendance History**:
  - View attendance records in a tabular format with:
    - Date of attendance.
    - Punch-in time.
    - Selfie preview.
  - Pagination supported.
- **Profile Management**:
  - Update personal details like name, email, profile picture, and contact info.
  - Change password.

---

### **2. Teacher**
- **Login**:
  - Authenticate using email and password.
- **View Attendance**:
  - Access attendance records of students with:
    - Date filter and search by student name or ID.
    - Pagination.
    - Details like student name, date, punch-in time, and selfie preview.
- **Student List**:
  - View and filter class roster by date or student details.
- **View Student Profile**:
  - Access detailed student profiles, including:
    - Personal info (name, contact details, etc.).
    - Attendance history.

---

### **3. Admin**
- **Login**:
  - Authenticate using email and password.
- **Manage Teachers**:
  - Add new teachers with details like name, email, and password.
  - Optionally assign classes to teachers.
- **Manage Users**:
  - View lists of teachers and students with:
    - Pagination.
    - Filters for date range and user details.
- **View Profiles**:
  - Access detailed profiles of teachers and students.
- **Restrict User Login**:
  - Disable logins for specific users by setting them to "inactive".
- **Change Admin Password**:
  - Update the admin account password.

---

## **System Architecture**

- **Frontend**: React.js with a CSS framework (e.g., MUI, Tailwind CSS).
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB or MySQL.
- **Authentication**: JWT (JSON Web Token).

---

## **Functional Requirements**

### **1. Student Module**
1. **Registration & Login**:
   - Validate email and password during registration.
   - Optionally send a confirmation email.
2. **Mark Attendance**:
   - Save date, time, and selfie to the database during attendance marking.
3. **Attendance History**:
   - Display history in chronological order with pagination.
4. **Profile Management**:
   - Allow viewing and updating profile information.

### **2. Teacher Module**
1. **Login**:
   - Authenticate with email and password.
2. **View Attendance**:
   - Access attendance data with filters and pagination.
3. **Student List**:
   - View class roster with filtering and pagination options.
4. **View Student Profile**:
   - Access detailed student information.

### **3. Admin Module**
1. **Login**:
   - Authenticate with a unique email and password.
2. **Manage Teachers**:
   - Add, update, or remove teacher accounts.
3. **Manage Users**:
   - View and manage user lists with filtering options.
4. **Restrict Login**:
   - Disable login for specific users.
5. **Change Password**:
   - Allow admin to update their password.

---

### **4. Frontend Technologies**
- React.js: For building the user interface with reusable components.
- React Router: For routing and navigation between pages.
- Tailwind CSS: For responsive and modern styling.
- Axios: For making HTTP requests to the backend.
-React Toastify: For displaying notifications and alerts.
### **5. Backend Technologies**
- Node.js: For building the backend server.
- Express.js: A web framework for handling routes, middleware, and APIs.
- JWT (JSON Web Tokens): For secure user authentication and authorization.
- bcrypt: For hashing and securing user passwords.
- Mongoose: For modeling and querying MongoDB databases.

