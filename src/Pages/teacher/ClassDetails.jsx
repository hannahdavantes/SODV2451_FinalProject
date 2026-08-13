import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClass } from '../../api/classesApi';
import './TeacherStyles.css';

function ClassDetails() {
  // The route is /teacher/classes/:classCode/details, but we navigate here using
  // the class id, so classCode holds the class id.
  const { classCode } = useParams();
  const navigate = useNavigate();

  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClass(classCode)
      .then((data) => {
        // Backend returns { code, name, teacherName, room, deliveryMode, enrollmentCount }
        setClassInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load class:', err);
        setError('Could not load class details. Please make sure the backend is running.');
        setLoading(false);
      });
  }, [classCode]);

  if (loading) {
    return (
      <div className="page">
        <h1 className="page-title">Class Details</h1>
        <p className="page-subtitle">Loading class details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page-title">Class Details</h1>
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
        <h1 className="details-title">{classInfo.name}</h1>
        <p className="details-subtitle">{classInfo.code}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue">👨‍🏫</div>
          <div className="stat-content">
            <div className="stat-label">Instructor</div>
            <div className="stat-value">{classInfo.teacherName}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-purple">💻</div>
          <div className="stat-content">
            <div className="stat-label">Delivery Mode</div>
            <div className="stat-value">{classInfo.deliveryMode}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-orange">🎓</div>
          <div className="stat-content">
            <div className="stat-label">Enrollment</div>
            <div className="stat-value">{classInfo.enrollmentCount} students</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassDetails;
