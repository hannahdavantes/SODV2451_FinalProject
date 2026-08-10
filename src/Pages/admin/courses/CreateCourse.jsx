import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { courseAPI } from "../../../api/courseAPI"; 

export default function CreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    department: "Computer Science",
    credits: 3,
    duration: 16,
    status: "Active",
    description: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Sync inputs dynamically with state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "credits" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      await courseAPI.create(formData);
      
      // Redirect
      navigate("/admin/courses");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">Add New Course</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Course Code</label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., COMP100"
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Course Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Intro to Programming"
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Business">Software Development</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Credits</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
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
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 bg-black text-white px-6 py-3 rounded disabled:bg-gray-400 hover:bg-gray-800 transition"
          >
            {submitting ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </Layout>
  );
}