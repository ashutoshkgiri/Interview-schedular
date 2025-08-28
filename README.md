This project is an Interview Scheduler built using the MERN stack, designed to simplify the process of scheduling, managing, and reminding users about interviews. It ensures efficiency, scalability, and reliability with the integration  email notifications, and rate limiting for security.

🔑 Key Features



Schedule Interviews with flexible time slots

Conflict Detection – prevents double booking

Email Notifications using SendGrid (confirmation + reminders)

Admin Panel to manage interviewers & candidates

Scalable Architecture ready for cloud deployment (AWS, Docker, Kubernetes)

⚙️ Tech Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)


Email Service: SendGrid

🔧 Environment Variables

To run this project, create a .env file in the root directory and add the following variables:

# Server Port
PORT  

# Email Config (SendGrid)
EMAIL_SERVICE=sendgrid  
SENDGRID_API_KEY=your_sendgrid_api_key  
SENDGRID_SENDER=your_verified_sender_email  

# Optional: Database URL
MONGO_URI=your_mongodb_connection_url
