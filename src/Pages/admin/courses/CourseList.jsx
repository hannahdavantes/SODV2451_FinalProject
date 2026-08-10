import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import DeleteCourseModal from "../../../components/DeleteCourseModal";
import { courseAPI } from "../../../api/courseAPI"; 

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Hook up your backend database fetching
  const fetchCourses = async (searchTerm = "") => {
    try {
      setLoading(true);
      const data = await courseAPI.getAll(searchTerm);
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial mount load
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchCourses(val); 
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;

    try {
      await courseAPI.delete(selectedCourse.id);
      alert(`Deleted ${selectedCourse.name}`);
      setCourses((prevCourses) => prevCourses.filter(c => c.id !== selectedCourse.id));
    } catch (err) {
      alert(`Error deleting course: ${err.message}`);
    } finally {
      
      setShowDeleteModal(false);
      setSelectedCourse(null);
    }
  };

  return (
    <Layout>
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-2">All Courses</h1>
        <p className="text-gray-500 mb-6">Manage all courses offered at BVC</p>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={handleSearchChange}
              className="border rounded-lg px-4 py-2 w-96"
            />
            <Link to="/admin/courses/new" className="bg-black text-white px-4 py-2 rounded-lg">
              + Add New Course
            </Link>
          </div>

          {loading && <div className="py-4 text-center">Loading course directory...</div>}
          {error && <div className="py-4 text-center text-red-500">Error: {error}</div>}

          {!loading && !error && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-center">
                  <th className="pb-2">Code</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Department</th>
                  <th className="pb-2">Credits</th>
                  <th className="pb-2">Duration</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.code} className="border-b text-center hover:bg-gray-50">
                    <td className="py-3 font-semibold">{course.code}</td>
                    <td className="py-3 text-left pl-4">{course.name}</td>
                    <td className="py-3">{course.department}</td>
                    <td className="py-3">{course.credits}</td>
                    <td className="py-3">{course.duration} weeks</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3 space-x-2">
                      <Link to={`/admin/courses/${course.code}`}>👁️</Link>
                      <Link to={`/admin/courses/${course.code}/edit`}>✏️</Link>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowDeleteModal(true);
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DeleteCourseModal
        isOpen={showDeleteModal}
        courseName={selectedCourse?.name}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCourse(null);
        }}
        onDelete={handleDelete}
      />
    </Layout>
  );
}