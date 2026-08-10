import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { courseAPI } from "../../../api/courseAPI"; 
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  // Grabs whatever is in the URL parameter path (e.g., "COMP100" from /admin/courses/COMP100)
  const { id } = useParams(); 
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use our updated string-based course lookups
        const data = await courseAPI.getByCode(id); 
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]); // Re-runs nicely if you click to a different course link string

  if (loading) return <Layout><div className="p-6">Loading course details...</div></Layout>;
  if (error) return <Layout><div className="p-6 text-red-500">Error: {error}</div></Layout>;
  if (!course) return <Layout><div className="p-6">No course found.</div></Layout>;

  return (
    <Layout>
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">Course Details</h1>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{course.code}</h2>
              <p>{course.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <strong>Department</strong>
              <p>{course.department}</p>
            </div>

            <div>
              <strong>Credits</strong>
              <p>{course.credits}</p>
            </div>

            <div>
              <strong>Duration</strong>
              <p>{course.duration} weeks</p>
            </div>

            <div>
              <strong>Status</strong>
              <p>{course.status}</p>
            </div>
          </div>

          <div className="mt-6">
            <strong>Description</strong>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}