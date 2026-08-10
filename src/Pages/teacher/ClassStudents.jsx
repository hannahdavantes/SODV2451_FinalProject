import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClass, getStudentsForClass } from '../../api/classesApi';
import './TeacherStyles.css';

function ClassStudents() {
  // The route is /teacher/classes/:classCode/students, but we navigate here using
  // the class id, so classCode holds the class id.
  const { classCode } = useParams();
  const navigate = useNavigate();

  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the class name (for the heading) and its students together.
    Promise.all([getClass(classCode), getStudentsForClass(classCode)])
      .then(([classData, studentData]) => {
        setClassName(classData.name);
        // Backend returns { studentId, studentNumber, name, email, enrollmentStatus }
        setStudents(studentData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load students:', err);
        setError('Could not load students. Please make sure the backend is running.');
        setLoading(false);
      });
  }, [classCode]);

  if (loading) {
    return (
      <div className="page">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle" style={{ color: 'crimson' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate('/teacher/classes')}>
        <span className="back-link-arrow">←</span>
        Back to My Classes
      </button>

      <div className="details-header">
        <h1 className="details-title">Students - {className}</h1>
        <p className="details-subtitle">{classCode}</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Student List ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <p style={{ padding: '16px 0', color: '#71717a' }}>
            No students are enrolled in this class yet.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.studentId}>
                  <td className="bold">{s.studentNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.enrollmentStatus === 'active'
                          ? 'badge-active'
                          : 'badge-inactive'
                      }`}
                    >
                      {s.enrollmentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ClassStudents;
