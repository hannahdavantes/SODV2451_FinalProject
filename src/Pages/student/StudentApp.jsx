import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BookOpen, LayoutDashboard, LogOut, Menu, Search, UserCircle, X } from "lucide-react";
import StudentDashboard from "./StudentDashboard";
import StudentSearchClasses from "./StudentSearchClasses";
import StudentClassDetails from "./StudentClassDetails";
import StudentMyClasses from "./StudentMyClasses";
import StudentProfile from "./StudentProfile";
import { dropEnrollment, enrollStudent, getClasses, getEnrolledClasses } from "../../api/studentApi";
import "./StudentStyles.css";

export default function StudentApp() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [enrolledClassIds, setEnrolledClassIds] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "student";
  const userId = localStorage.getItem("userId") || "";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    let isActive = true;

    async function loadClasses() {
      setLoading(true);
      setError("");

      try {
        const response = await getClasses();

        if (isActive) {
          setClasses(response);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message || "Unable to load classes.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    async function loadEnrolledClasses() {
      if (!userId) {
        return;
      }

      try {
        const response = await getEnrolledClasses(userId);

        if (isActive) {
          setEnrolledClasses(response.classes);
          setEnrolledClassIds(response.classes.map((classItem) => Number(classItem.id)));
          setStudentName(response.studentName);
        }
      } catch {
        // Enrolled classes are optional for the initial page load.
      }
    }

    loadClasses();
    loadEnrolledClasses();

    return () => {
      isActive = false;
    };
  }, [userId]);

  function goToClassDetails(classId) {
    setSelectedClassId(classId);
    localStorage.setItem("selectedStudentClassId", String(classId));
    setPage("classDetails");
    setEnrollmentMessage("");
  }

  function goToPage(pageName) {
    setPage(pageName);
    setEnrollmentMessage("");
    setSidebarOpen(false);
  }

  async function enrollInClass(classId) {
    setEnrollmentMessage("");

    const numericClassId = Number(classId);

    try {
      await enrollStudent(userId, numericClassId);

      setEnrolledClassIds((currentIds) => {
        if (currentIds.includes(numericClassId)) {
          return currentIds;
        }

        return [...currentIds, numericClassId];
      });

      setEnrolledClasses((currentClasses) => {
        if (currentClasses.some((classItem) => Number(classItem.id) === numericClassId)) {
          return currentClasses;
        }

        const enrolledClass = classes.find((classItem) => Number(classItem.id) === numericClassId);

        return enrolledClass ? [...currentClasses, enrolledClass] : currentClasses;
      });

      setEnrollmentMessage("Enrollment successful.");
    } catch (enrollError) {
      setEnrollmentMessage(enrollError.message || "Enrollment failed.");
    }
  }

  async function dropClass(classId) {
    setEnrollmentMessage("");

    const numericClassId = Number(classId);

    try {
      await dropEnrollment(userId, numericClassId);

      setEnrolledClassIds((currentIds) =>
        currentIds.filter((id) => id !== numericClassId)
      );

      setEnrolledClasses((currentClasses) =>
        currentClasses.filter((classItem) => Number(classItem.id) !== numericClassId)
      );

      setEnrollmentMessage("Class dropped.");
    } catch (dropError) {
      setEnrollmentMessage(dropError.message || "Unable to drop class.");
    }
  }

  const availableClassesCount = classes.length;

  let pageContent = null;

  if (page === "dashboard") {
    pageContent = (
      <StudentDashboard
        myClassesCount={enrolledClasses.length}
        availableClassesCount={availableClassesCount}
        loading={loading}
        error={error}
      />
    );
  } else if (page === "searchClasses") {
    pageContent = (
      <StudentSearchClasses
        classes={classes}
        loading={loading}
        error={error}
        enrolledClassIds={enrolledClassIds}
        goToClassDetails={goToClassDetails}
        enrollInClass={enrollInClass}
      />
    );
  } else if (page === "classDetails") {
    pageContent = (
      <StudentClassDetails
        classId={selectedClassId}
        enrolledClassIds={enrolledClassIds}
        enrollInClass={enrollInClass}
        goBack={() => setPage("searchClasses")}
      />
    );
  } else if (page === "myClasses") {
    pageContent = <StudentMyClasses enrolledClasses={enrolledClasses} dropClass={dropClass} />;
  } else if (page === "profile") {
    pageContent = <StudentProfile />;
  }

  return (
    <div className="student-app">
      {sidebarOpen && (
        <div
          className="student-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`student-sidebar${sidebarOpen ? " student-sidebar--open" : ""}`}>
        <div className="student-sidebar-brand">
          BVC Portal
          <button
            className="student-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="student-nav" aria-label="Student navigation">
          <button
            className={page === "dashboard" ? "student-nav-button active" : "student-nav-button"}
            onClick={() => goToPage("dashboard")}
          >
            <span className="student-nav-icon">
              <LayoutDashboard size={22} />
            </span>
            Dashboard
          </button>
          <button
            className={page === "searchClasses" ? "student-nav-button active" : "student-nav-button"}
            onClick={() => goToPage("searchClasses")}
          >
            <span className="student-nav-icon">
              <Search size={22} />
            </span>
            Search Classes
          </button>
          <button
            className={page === "myClasses" ? "student-nav-button active" : "student-nav-button"}
            onClick={() => goToPage("myClasses")}
          >
            <span className="student-nav-icon">
              <BookOpen size={22} />
            </span>
            My Classes
          </button>
        </nav>
        <div className="student-sidebar-footer">
          <button className="student-nav-button" onClick={handleLogout}>
            <span className="student-nav-icon">
              <LogOut size={18} />
            </span>
            Logout
          </button>
        </div>
      </aside>

      <div className="student-main-shell">
        <header className="student-topbar">
          <button
            className="student-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="student-top-search">
            <span className="student-search-icon">
              <Search size={16} />
            </span>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="student-top-actions">
            <button className="student-bell" aria-label="Notifications">
              <span>
                <Bell size={20} />
              </span>
              <span className="student-bell-dot" />
            </button>
            <button
              className="student-user-chip"
              type="button"
              onClick={() => goToPage("profile")}
              aria-label="Open student profile"
            >
              <span className="student-user-avatar">
                <UserCircle size={20} />
              </span>
              <span>{studentName || email || role}</span>
            </button>
          </div>
        </header>
        <main className="student-content">
          {enrollmentMessage !== "" ? (
            <div className="student-inline-message" role="status">
              {enrollmentMessage}
            </div>
          ) : null}
          {pageContent}
        </main>
      </div>
    </div>
  );
}
