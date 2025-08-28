# 📅 Interview Scheduler  

This project is an **Interview Scheduler** built using the **MERN stack**, designed to simplify the process of scheduling, managing, and reminding users about interviews.  
It ensures **efficiency, scalability, and reliability** with features like email notifications and rate limiting for security.  

---

## 🔑 Key Features  

✅ **Schedule Interviews** with flexible time slots  
✅ **Conflict Detection** – prevents double booking  
✅ **Email Notifications** using **SendGrid** (confirmation + reminders)  
✅ **Admin Panel** to manage interviewers & candidates  
✅ **Scalable Architecture** ready for **cloud deployment** (AWS, Docker, Kubernetes)  
✅ **Rate Limiting** with `express-rate-limit` to prevent abuse  

---

## ⚙️ Tech Stack  

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Email Service**: SendGrid  
- **Caching / Queue (Optional)**: Redis  

---

## 🔧 Environment Variables  

To run this project, create a `.env` file in the root directory and add the following variables:  

```env
# Server Port
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_url

# Email Config (SendGrid)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_SENDER=your_verified_sender_email

# Redis (Optional - for caching / rate limiting)
REDIS_URL=your_redis_connection_url
