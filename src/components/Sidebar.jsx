import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  BookMarked,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Search,
  User,
  Users,
  X,
} from "lucide-react";

const ADMIN_ITEMS = [
  { label: "Courses", to: "/admin/courses", icon: <BookOpen size={18} /> },
  { label: "Classes", to: "/admin/classes", icon: <BookMarked size={18} /> },
  { label: "Students", to: "/admin/students", icon: <Users size={18} /> },
  { label: "Teachers", to: "/admin/teachers", icon: <GraduationCap size={18} /> },
];

const TEACHER_ITEMS = [
  { label: "My Classes", to: "/teacher/classes", icon: <BookOpen size={18} /> },
];

const STUDENT_ITEMS = [
  { label: "Dashboard", page: "dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Search Classes", page: "searchClasses", icon: <Search size={18} /> },
  { label: "My Classes", page: "myClasses", icon: <BookOpen size={18} /> },
  { label: "Profile", page: "profile", icon: <User size={18} /> },
];

export default function Sidebar({ onNavigate, activePage, isOpen, onClose }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  let items = [];
  if (role === "admin") items = ADMIN_ITEMS;
  else if (role === "teacher") items = TEACHER_ITEMS;
  else if (role === "student") items = STUDENT_ITEMS;

  return (
    <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      <div className="sidebar-logo">
        BVC Portal
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <nav>
        {items.map((item) =>
          item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={onClose}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ) : (
            <button
              key={item.label}
              className={activePage === item.page ? "active" : ""}
              onClick={() => {
                onNavigate && onNavigate(item.page);
                onClose && onClose();
              }}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          )
        )}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout}>
          <span className="sidebar-nav-icon"><LogOut size={18} /></span>
          Logout
        </button>
      </div>
    </aside>
  );
}
