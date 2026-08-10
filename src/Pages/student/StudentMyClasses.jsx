import { BookOpen, Calendar, Clock, Users } from "lucide-react";

export default function StudentMyClasses({ enrolledClasses, dropClass }) {
  return (
    <>
      <div className="student-page-heading">
        <h1>My Classes</h1>
        <p>View your enrolled classes</p>
      </div>

      <section className="student-card">
        <div className="student-card-header">
          <h2>Enrolled Classes</h2>
        </div>
        <div className="student-card-content student-stack">
          {enrolledClasses.length === 0 ? (
            <div className="student-empty">
              <span className="student-empty-icon">
                <BookOpen size={34} />
              </span>
              <h3>No enrolled classes</h3>
              <p>Enroll in a class from Search Classes to see it here.</p>
            </div>
          ) : null}

          {enrolledClasses.map((classItem) => (
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
                <button
                  type="button"
                  className="student-button outline small"
                  onClick={() => dropClass(classItem.id)}
                >
                  Drop Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
