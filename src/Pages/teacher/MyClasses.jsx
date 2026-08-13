import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeacherClasses } from '../../api/classesApi';
import './TeacherStyles.css';

function MyClasses() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const teacherId = localStorage.getItem("userId");
    getTeacherClasses(teacherId)
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load classes:', err);
        setError('Could not load classes. Please make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1 className="page-title">My Classes</h1>
        <p className="page-subtitle">Loading your classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">My Classes</h1>
        <p className="page-subtitle" style={{ color: 'crimson' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">My Classes</h1>
      <p className="page-subtitle">View and manage all your classes</p>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Classes</h2>
        </div>

        {classes.length === 0 ? (
          <p style={{ padding: '16px 0', color: '#71717a' }}>
            You have no classes assigned yet.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Class Code</th>
                <th>Course Name</th>
                <th>Capacity</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td className="bold">{cls.course}</td>
                  <td>{cls.name}</td>
                  <td>{cls.capacity}</td>
                  <td className="actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/teacher/classes/${cls.id}/details`)}
                    >
                      <span className="btn-icon">👁</span>
                      View Details
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/teacher/classes/${cls.id}/students`)}
                    >
                      <span className="btn-icon">👥</span>
                      View Students
                    </button>
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

export default MyClasses;