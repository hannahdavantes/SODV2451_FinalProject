import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      
      {/*Logo / Title- insert logo later depending on other pages*/}
      <div className="sidebar-logo">
        BVC Portal
      </div>

      {/*Navigation*/}
      <nav>
        <NavLink
          to="/admin/courses"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Courses
        </NavLink>

        <NavLink
          to="/admin/classes"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Classes
        </NavLink>

        <NavLink
          to="/admin/students"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Students
        </NavLink>

        <NavLink
          to="/admin/teachers"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Teachers
        </NavLink>
      </nav>

    </aside>
  );
}