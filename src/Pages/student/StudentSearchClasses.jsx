import { useState } from "react";
import { BookOpen, Calendar, Clock, Search, Users } from "lucide-react";

export default function StudentSearchClasses({
  classes,
  loading,
  error,
  enrolledClassIds,
  goToClassDetails,
  enrollInClass,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredClasses = classes.filter((classItem) => {
    const courseCode = String(classItem.course || "").toLowerCase();
    const courseName = String(classItem.name || "").toLowerCase();
    const instructor = String(classItem.instructor || "").toLowerCase();

    return (
      courseCode.includes(query) ||
      courseName.includes(query) ||
      instructor.includes(query)
    );
  });

  return (
    <>
      <div className="student-page-heading">
        <h1>Search Classes</h1>
        <p>Browse and enroll in available classes</p>
      </div>

      <div className="student-page-search">
        <span>
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by course code, name, or instructor..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      {loading ? <p className="student-inline-message">Loading classes...</p> : null}
      {error !== "" ? <p className="student-inline-error">{error}</p> : null}

      <section className="student-card">
        <div className="student-card-header">
          <h2>Available Classes</h2>
        </div>
        <div className="student-card-content student-stack">
          {!loading && filteredClasses.length === 0 ? (
            <div className="student-empty">
              <span className="student-empty-icon">
                <BookOpen size={34} />
              </span>
              <h3>No classes found</h3>
              <p>Try a different search term.</p>
            </div>
          ) : null}

          {filteredClasses.map((classItem) => {
            const isEnrolled = enrolledClassIds.includes(classItem.id);
            const isFull = String(classItem.status).toLowerCase() === "full";
            const statusText = isEnrolled ? "Enrolled" : classItem.status || "Open";

            return (
              <div className="student-course-row" key={classItem.id}>
                <span className="student-course-icon">
                  <BookOpen size={21} />
                </span>
                <div className="student-course-main">
                  <h3>
                    {classItem.course} - {classItem.name}
                  </h3>
                  <div className="student-meta-row">
                    <span>
                      <Clock size={16} />
                      Instructor: {classItem.instructor || "Not available"}
                    </span>
                    <span>
                      <Calendar size={16} />
                      Room: {classItem.room || "Not available"}
                    </span>
                    <span>
                      <Users size={16} />
                      Capacity: {classItem.capacity || "Not available"}
                    </span>
                  </div>
                </div>
                <div className="student-row-actions">
                  {!isEnrolled ? (
                    <span className={isFull ? "student-status danger" : "student-status success"}>
                      {statusText}
                    </span>
                  ) : null}
                  <button
                    className="student-button outline small"
                    onClick={() => goToClassDetails(classItem.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="student-button small"
                    disabled={isEnrolled || isFull}
                    onClick={() => enrollInClass(classItem.id)}
                  >
                    {isEnrolled ? "Enrolled" : isFull ? "Full" : "Enroll"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
