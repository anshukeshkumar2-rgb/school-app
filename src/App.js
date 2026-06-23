import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const login = async () => {
  setError("");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    setError("Email ya password galat hai!");
    return;
  }
  if (email.includes("admin")) setRole("admin");
  else if (email.includes("teacher")) setRole("teacher");
  else if (email.includes("student")) setRole("student");
  else if (email.includes("parent")) setRole("parent");
  setPage("dashboard");
};

const login_old = (selectedRole) => {
    setRole(selectedRole);
    
    setPage("dashboard");
  };

  const logout = () => {
    setRole(null);
    
    setPage("home");
  };

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f0f4f8" }}>
      
      {/* NAVBAR */}
      <nav style={{ background: "#1a56db", padding: "14px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "white", margin: 0, fontSize: "20px" }}>🏫OXFORD PUBLIC SCHOOL</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={() => setPage("home")} style={navBtn}>Home</button>
          <button onClick={() => setPage("notices")} style={navBtn}>Notices</button>
          <button onClick={() => setPage("gallery")} style={navBtn}>Gallery</button>
          <button onClick={() => setPage("contact")} style={navBtn}>Contact</button>
          {!role && <button onClick={() => setPage("login")} style={{ ...navBtn, background: "white", color: "#1a56db", fontWeight: "bold" }}>Login</button>}
          {role && <button onClick={logout} style={{ ...navBtn, background: "#e53e3e", color: "white" }}>Logout</button>}
        </div>
      </nav>

      {/* HOME PAGE */}
      {page === "home" && (
        <div>
          <div style={{ background: "linear-gradient(135deg, #1a56db, #3b82f6)", color: "white", padding: "80px 40px", textAlign: "center" }}>
            <h1 style={{ fontSize: "48px", margin: "0 0 16px" }}>OXFORD Public School</h1>
            <p style={{ fontSize: "20px", margin: "0 0 30px" }}>Shaping Future Leaders Since 1990</p>
            <button onClick={() => setPage("login")} style={{ background: "white", color: "#1a56db", padding: "14px 32px", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
              Student/Teacher Login →
            </button>
          </div>
          <div style={{ display: "flex", gap: "24px", padding: "40px", justifyContent: "center", flexWrap: "wrap" }}>
            {[["🎓", "1200+", "Students"], ["👨‍🏫", "80+", "Teachers"], ["🏆", "50+", "Awards"], ["📚", "35+", "Years"]].map(([icon, num, label]) => (
              <div key={label} style={card}>
                <div style={{ fontSize: "40px" }}>{icon}</div>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1a56db" }}>{num}</div>
                <div style={{ color: "#666" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOGIN PAGE */}
{page === "login" && (
  <div style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
    <div style={{ background: "white", borderRadius: "16px", padding: "40px", width: "400px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#1a56db", marginBottom: "30px" }}>Login Karein</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <button
          onClick={login}
          style={{ padding: "16px", background: "#1a56db", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}


      {/* DASHBOARD */}
      {page === "dashboard" && role === "admin" && <AdminDashboard />}
      {page === "dashboard" && role === "teacher" && <TeacherDashboard />}
      {page === "dashboard" && role === "student" && <StudentDashboard />}
      {page === "dashboard" && role === "parent" && <ParentDashboard />}

      {/* NOTICES */}
      {page === "notices" && (
        <div style={{ padding: "40px" }}>
          <h2 style={{ color: "#1a56db" }}>📋 Notice Board</h2>
          {[
            { title: "Annual Sports Day", date: "25 June 2026", desc: "Sabhi students ko 8 baje school mein aana hai." },
            { title: "Summer Vacation", date: "1 July 2026", desc: "School 1 July se 15 July tak band rahega." },
            { title: "Parent Teacher Meeting", date: "28 June 2026", desc: "Class 9 aur 10 ke parents zaroor aayein." },
          ].map((n) => (
            <div key={n.title} style={{ ...card, marginBottom: "16px", textAlign: "left", width: "100%", maxWidth: "600px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, color: "#1a56db" }}>{n.title}</h3>
                <span style={{ color: "#888", fontSize: "14px" }}>{n.date}</span>
              </div>
              <p style={{ margin: "8px 0 0", color: "#444" }}>{n.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* GALLERY */}
      {page === "gallery" && (
        <div style={{ padding: "40px" }}>
          <h2 style={{ color: "#1a56db" }}>🖼️ Gallery</h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {["Sports Day 🏃", "Science Fair 🔬", "Annual Function 🎭", "Republic Day 🇮🇳", "Art Competition 🎨", "Cricket Match 🏏"].map((item) => (
              <div key={item} style={{ width: "180px", height: "140px", background: "linear-gradient(135deg, #1a56db, #60a5fa)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "16px", textAlign: "center", padding: "10px" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ padding: "40px" }}>
          <h2 style={{ color: "#1a56db" }}>📞 Contact Us</h2>
          <div style={{ ...card, textAlign: "left", maxWidth: "400px" }}>
            <p>📍 123, School Road, Delhi - 110001</p>
            <p>📞 011-12345678</p>
            <p>📧 info@delhipublicschool.com</p>
            <p>⏰ Mon-Sat: 8am - 4pm</p>
          </div>
        </div>
      )}

    </div>
  );
}

// ADMIN DASHBOARD
function AdminDashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#1a56db" }}>👨‍💼 Admin Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        {[["🎓 Total Students", "1,245"], ["👨‍🏫 Total Teachers", "83"], ["💰 Fee Pending", "₹2,40,000"], ["📋 Notices", "12"]].map(([label, val]) => (
          <div key={label} style={{ ...card, minWidth: "160px" }}>
            <div style={{ fontSize: "14px", color: "#666" }}>{label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1a56db" }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {["👥 Students Manage", "👨‍🏫 Teachers Manage", "💰 Fee Records", "📋 Post Notice"].map((btn) => (
          <button key={btn} style={{ padding: "14px 24px", background: "#1a56db", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer" }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

// TEACHER DASHBOARD
function TeacherDashboard() {
  const [attendance, setAttendance] = useState({});
  const students = ["Rahul Sharma", "Priya Singh", "Amit Kumar", "Neha Gupta", "Rohit Verma"];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#1a56db" }}>👨‍🏫 Teacher Dashboard</h2>
      <h3>📅 Aaj ki Attendance — Class 10A</h3>
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", maxWidth: "500px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        {students.map((s) => (
          <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span>{s}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setAttendance({ ...attendance, [s]: "P" })} style={{ padding: "6px 14px", background: attendance[s] === "P" ? "#22c55e" : "#e5e7eb", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>P</button>
              <button onClick={() => setAttendance({ ...attendance, [s]: "A" })} style={{ padding: "6px 14px", background: attendance[s] === "A" ? "#ef4444" : "#e5e7eb", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>A</button>
            </div>
          </div>
        ))}
        <button style={{ marginTop: "16px", width: "100%", padding: "12px", background: "#1a56db", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer", fontWeight: "bold" }}>
          ✅ Attendance Save Karo
        </button>
      </div>
    </div>
  );
}

// STUDENT DASHBOARD
function StudentDashboard() {
  const marks = [
    { subject: "Mathematics", marks: 85, total: 100 },
    { subject: "Science", marks: 78, total: 100 },
    { subject: "Hindi", marks: 92, total: 100 },
    { subject: "English", marks: 88, total: 100 },
    { subject: "Social Science", marks: 74, total: 100 },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#1a56db" }}>🎓 Student Dashboard</h2>
      <p style={{ color: "#666" }}>Naam: Rahul Sharma | Class: 10A | Roll No: 15</p>
      <h3>📊 Result Card</h3>
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", maxWidth: "500px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        {marks.map((m) => (
          <div key={m.subject} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <span>{m.subject}</span>
            <span style={{ fontWeight: "bold", color: m.marks >= 75 ? "#22c55e" : "#ef4444" }}>{m.marks}/{m.total}</span>
          </div>
        ))}
        <div style={{ marginTop: "16px", padding: "12px", background: "#eff6ff", borderRadius: "8px", textAlign: "center" }}>
          <strong>Total: 417/500 | Percentage: 83.4% | </strong>
          <span style={{ color: "#22c55e", fontWeight: "bold" }}>PASS ✅</span>
        </div>
      </div>
    </div>
  );
}

// PARENT DASHBOARD
function ParentDashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#1a56db" }}>👪 Parent Dashboard</h2>
      <p style={{ color: "#666" }}>Bachhe ka Naam: Rahul Sharma | Class: 10A</p>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={card}>
          <div style={{ fontSize: "14px", color: "#666" }}>📊 Is Month Attendance</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e" }}>92%</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: "14px", color: "#666" }}>📝 Last Result</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1a56db" }}>83.4%</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: "14px", color: "#666" }}>💰 Fee Status</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>Paid ✅</div>
        </div>
      </div>
    </div>
  );
}

const navBtn = {
  background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)",
  padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "14px"
};

const card = {
  background: "white", borderRadius: "12px", padding: "20px", textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)", minWidth: "120px"
};

export default App;