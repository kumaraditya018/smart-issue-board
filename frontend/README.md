# Smart Issue Board

Smart Issue Board is a simple issue tracking web application built as part of an internship assignment.  
It allows authenticated users to create and view issues with priority, status, and assignment details.

---

## Tech Stack

- Frontend: React (Vite)
- Backend / Database: Firebase Firestore
- Authentication: Firebase Auth (Email & Password)
- Hosting: Vercel
- Code Hosting: GitHub (Public Repository)

---

## Why I chose this frontend stack

I chose React with Vite because it provides fast development, a clean component-based architecture, and smooth integration with Firebase. Vite’s fast build and hot reload helped me focus on functionality instead of configuration.

---

## Firestore Data Structure

A single collection named `issues` is used.

Each issue document contains:
- title
- description
- priority (Low / Medium / High)
- status (Open / In Progress / Done)
- assignedTo
- createdBy
- createdAt (timestamp)

This structure is simple, scalable, and easy to maintain.

---

## Similar Issue Handling

When creating a new issue, the application checks existing issues for similar titles.  
If a similar issue exists, the user is warned and asked for confirmation before creating a duplicate issue.

---

## Status Rule Handling

The application enforces a rule where an issue cannot be directly created with status `Done`.  
Users must follow the proper flow instead of skipping steps, and a friendly message is shown when violated.

---

## Challenges Faced

- Understanding Firebase authentication flow
- Managing Firestore read/write operations
- Handling validations without over-engineering

---

## Future Improvements

- Edit and update issue status
- Role-based access control
- Search and filtering improvements
- Enhanced UI and responsiveness

---

## Deployment

The application is deployed on Vercel using environment variables for Firebase configuration.
