import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setIssues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();

    if (status === "Done") {
      alert("Issue cannot move directly from Open to Done.");
      return;
    }

    const q = query(
      collection(db, "issues"),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const snap = await getDocs(q);

    let similar = false;
    snap.forEach((doc) => {
      if (doc.data().title.toLowerCase().includes(title.toLowerCase())) {
        similar = true;
      }
    });

    if (similar && !window.confirm("Similar issue exists. Continue?")) return;

    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy: user.email,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
    setAssignedTo("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Smart Issue Board</h1>

        {!user ? (
          <div style={styles.card}>
            <h2 style={styles.subHeading}>Login / Signup</h2>
            <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={styles.row}>
              <button style={styles.primaryBtn} onClick={handleSignup}>Signup</button>
              <button style={styles.secondaryBtn} onClick={handleLogin}>Login</button>
            </div>
          </div>
        ) : (
          <>
            <div style={styles.card}>
              <div style={styles.headerRow}>
                <p><b>{user.email}</b></p>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
              </div>

              <h2 style={styles.subHeading}>Create Issue</h2>
              <form onSubmit={handleCreateIssue}>
                <input style={styles.input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea style={styles.textarea} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <div style={styles.row}>
                  <select style={styles.select} value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>

                <input style={styles.input} placeholder="Assigned To (email)" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />

                <button style={styles.primaryBtn} type="submit">Create Issue</button>
              </form>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeading}>All Issues</h2>
              {issues.map((i) => (
                <div key={i.id} style={styles.issueCard}>
                  <h4>{i.title}</h4>
                  <p>{i.description}</p>
                  <small>
                    {i.priority} | {i.status} | Assigned to: {i.assignedTo}
                  </small>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#53d573ff",
    padding: "40px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  subHeading: {
    marginBottom: "15px",
  },
  card: {
    background: "#074302ff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #0e0d0dff",
  },
  select: {
    width: "48%",
    padding: "10px",
    borderRadius: "6px",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#6b7280",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  issueCard: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};
