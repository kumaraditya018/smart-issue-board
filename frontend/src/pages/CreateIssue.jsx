import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);

  // Auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Issue states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  // Auth listener
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  // Signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
  };

  // ✅ CREATE ISSUE (WITH STATUS RULE)
  const handleCreateIssue = async (e) => {
    e.preventDefault();

    // 🔴 STATUS RULE
    if (status === "Done") {
      alert(
        "Issue cannot be created directly in Done status. Please use Open or In Progress."
      );
      return;
    }

    try {
      await addDoc(collection(db, "issues"), {
        title,
        description,
        priority,
        status,
        assignedTo,
        createdBy: user.email,
        createdAt: serverTimestamp(),
      });

      alert("Issue created successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Open");
      setAssignedTo("");
    } catch (err) {
      console.error(err);
      alert("Error creating issue");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      {!user ? (
        <>
          <h2>Signup / Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleSignup}>Signup</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h2>Create Issue</h2>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <form onSubmit={handleCreateIssue}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <input
              placeholder="Assign To (email)"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />

            <button type="submit">Submit Issue</button>
          </form>
        </>
      )}
    </div>
  );
}
