import { useEffect, useState } from "react";
import { BookOpen, Calendar, Clock, Users } from "lucide-react";
import { getClassDetails } from "../../api/studentApi";

export default function StudentClassDetails({
  classId,
  enrolledClassIds,
  enrollInClass,
  goBack,
}) {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const numericClassId = Number(classId);
  const isEnrolled = enrolledClassIds.includes(numericClassId);

  useEffect(() => {
    let isActive = true;

    async function loadClassDetails() {
      if (classId === null || classId === undefined) {
        setLoading(false);
        setError("No class selected.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await getClassDetails(numericClassId);

        if (isActive) {
          setClassDetails(response);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message || "Unable to load class details.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadClassDetails();

    return () => {
      isActive = false;
    };
  }, [classId, numericClassId]);

  if (loading) {
    return <p className="student-inline-message">Loading class details...</p>;
  }

  if (error !== "") {
    return (
      <>
        <div className="student-page-heading">
          <button
            type="button"
            className="student-button ghost back-button"
            onClick={goBack}
          >
            Back to Search
          </button>

          <h1>Class Details</h1>
        </div>

        <p className="student-inline-error">{error}</p>
      </>
    );
  }

  if (!classDetails) {
    return <p className="student-inline-message">No class details available.</p>;
  }

  return (
    <>
      <div className="student-page-heading">
        <button
          type="button"
          className="student-button ghost back-button"
          onClick={goBack}
        >
          Back to Search
        </button>

        <h1>
          {classDetails.code} - {classDetails.name}
        </h1>

        <p>Course details from the backend</p>
      </div>

      <section className="student-card student-details-card">
        <div className="student-card-header">
          <h2>Class Information</h2>
        </div>

        <div className="student-card-content">
          <div className="student-detail-grid">
            <div className="student-detail-item">
              <span className="student-detail-icon blue">
                <BookOpen size={21} />
              </span>

              <div>
                <p>Code</p>
                <strong>{classDetails.code}</strong>
              </div>
            </div>

            <div className="student-detail-item">
              <span className="student-detail-icon green">
                <Clock size={21} />
              </span>

              <div>
                <p>Name</p>
                <strong>{classDetails.name}</strong>
              </div>
            </div>

            <div className="student-detail-item">
              <span className="student-detail-icon purple">
                <Users size={21} />
              </span>

              <div>
                <p>Teacher</p>
                <strong>
                  {classDetails.teacherName || "Not available"}
                </strong>
              </div>
            </div>

            <div className="student-detail-item">
              <span className="student-detail-icon pink">
                <Calendar size={21} />
              </span>

              <div>
                <p>Delivery Mode</p>
                <strong>
                  {classDetails.deliveryMode || "Not available"}
                </strong>
              </div>
            </div>

            <div className="student-detail-item">
              <span className="student-detail-icon cyan">
                <Users size={21} />
              </span>

              <div>
                <p>Enrollment Count</p>
                <strong>{classDetails.enrollmentCount}</strong>
              </div>
            </div>
          </div>

          <div className="student-detail-footer">
            <div>
              <p>Enrollment Status</p>

              <span
                className={
                  isEnrolled
                    ? "student-status success"
                    : "student-status"
                }
              >
                {isEnrolled ? "Enrolled" : "Not enrolled"}
              </span>
            </div>

            <button
              type="button"
              className="student-button"
              disabled={isEnrolled}
              onClick={() => enrollInClass(numericClassId)}
            >
              {isEnrolled ? "Enrolled" : "Enroll"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}