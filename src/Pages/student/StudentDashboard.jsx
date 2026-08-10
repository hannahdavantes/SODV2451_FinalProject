import { BookOpen, Search } from "lucide-react";

export default function StudentDashboard({ myClassesCount, availableClassesCount, loading, error }) {
  return (
    <>
      <div className="student-page-heading">
        <h1>Welcome back!</h1>
        <p>Use the student menu to browse classes and check your profile.</p>
      </div>

      <section className="student-summary-grid">
        <div className="student-card student-summary-card">
          <div>
            <p>My Classes</p>
            <strong>{loading ? "..." : myClassesCount}</strong>
          </div>
          <span className="student-summary-icon blue">
            <BookOpen size={24} />
          </span>
        </div>

        <div className="student-card student-summary-card">
          <div>
            <p>Available Classes</p>
            <strong>{loading ? "..." : availableClassesCount}</strong>
          </div>
          <span className="student-summary-icon green">
            <Search size={24} />
          </span>
        </div>
      </section>

      {error !== "" ? (
        <section className="student-card">
          <div className="student-card-content">
            <p className="student-inline-error">{error}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
