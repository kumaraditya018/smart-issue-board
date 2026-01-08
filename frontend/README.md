# Smart Issue Board

A professional and interactive issue tracking web application built using **React + Tailwind CSS + Firebase (Auth + Firestore)**.  
It allows users to **signup, login, create issues, and view them in real-time** with smart features like **similar issue detection** and **status rules**.

---

## 🔹 Tech Stack

- **Frontend:** React + Tailwind CSS + Vite  
- **Backend / Database:** Firebase Firestore  
- **Authentication:** Firebase Auth (Email/Password)  
- **Hosting:** Vercel  
- **AI Tools:** Optional (not used)

**Why React + Tailwind + Vite?**  
- Fast development, lightweight, modern frontend  
- Tailwind gives responsive, clean, professional UI  
- Firebase easy to integrate with React + real-time updates  
- Vercel for hassle-free deployment

---

## 🔹 Firestore Data Structure

**Collection:** `issues`  
**Document Fields:**

```json
{
  "title": "Issue title",
  "description": "Issue description",
  "priority": "Low | Medium | High",
  "status": "Open | In Progress | Done",
  "assignedTo": "user email",
  "createdBy": "user email",
  "createdAt": "timestamp"
}

