import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { courseAPI } from "../../../api/courseAPI";

export default function EditCourse() {
  const { id: routeCode } = useParams(); 
  const navigate = useNavigate(); 

  const [course, setCourse] = useState({
    id: "",
    code: "",
    name: "",
    department: "Computer Science",
    credits: 3,
    duration: 16,
    status: "Active",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchExistingCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseAPI.getByCode(routeCode);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (routeCode) {
      fetchExistingCourse();
    }
  }, [routeCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: name === "credits" || name === "duration" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await courseAPI.update(course.id, {
        Code: course.code,
        Name: course.name,
        Department: course.department,
        Credits: course.credits,
        Duration: course.duration,
        Status: course.status,
        Description: course.description
      });

      alert("Course updated successfully!");
      navigate("/admin/courses"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Layout><div className="p-6">Loading course data...</div></Layout>;
  if (error) return <Layout><div className="p-6 text-red-500">Error: {error}</div></Layout>;

  return (
    <Layout>
       <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border">
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">Course Code</label>
              <input
                name="code"
                value={course.code}
                onChange={handleChange}
                disabled 
                className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Course Name</label>
              <input
                name="name"
                value={course.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>
              <select
                name="department"
                value={course.department}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Software Development">Software Development</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Credits</label>
              <input
                type="number"
                name="credits"
                value={course.credits}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Duration (weeks)</label>
              <input
                type="number"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Status</label>
              <select
                name="status"
                value={course.status}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows="4"
              name="description"
              value={course.description}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400 hover:bg-gray-800 transition"
          >
            {submitting ? "Updating..." : "Update Course"}
          </button>

        </form>
      </div>
    </Layout>
  );
}