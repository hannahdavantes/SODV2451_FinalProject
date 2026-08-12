import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { createClass } from "../../../api/classesApi";
import { courseAPI } from "../../../api/courseAPI";
import { getTeachers } from "../../../services/teacherService";

export default function CreateClass() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    course: "",
    name: "",
    teacher: "",
    room: "",
    deliveryMode: "",
  });

  useEffect(() => {
    courseAPI.getAll().then(setCourses).catch(console.error);
    getTeachers().then(setTeachers).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const selected = courses.find((c) => c.code === e.target.value);
    setFormData((prev) => ({
      ...prev,
      course: selected ? selected.code : "",
      name: selected ? selected.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClass = {
      CourseCode: formData.course,
      Name: formData.name,
      TeacherName: formData.teacher,
      Room: formData.room,
      DeliveryMode: formData.deliveryMode,
    };

    try {
      await createClass(newClass);
      navigate("/admin/classes");
    } catch (error) {
      console.error(error);
      alert("Failed to create class.");
    }
  };

  return (
    <Layout>
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Add New Class
        </h1>

        <form
          className="bg-white border rounded-xl p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                ID
              </label>

              <input
                className="w-full border p-3 rounded bg-gray-100"
                placeholder="Automatically assigned"
                disabled
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Code
              </label>

              <input
                className="w-full border p-3 rounded bg-gray-100"
                value={formData.course}
                placeholder="Auto-filled from course"
                readOnly
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Course
              </label>

              <select
                value={formData.course}
                onChange={handleCourseChange}
                className="w-full border p-3 rounded"
              >
                <option value="" disabled>Select a course</option>
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Instructor
              </label>

              <select
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="" disabled>Select an instructor</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Room
              </label>

              <input
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                placeholder="Room 201"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="deliveryMode"
                value={formData.deliveryMode}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="" disabled>
                  Select Delivery Mode
                </option>
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="mt-8 bg-black text-white px-6 py-3 rounded-lg"
          >
            Create Class
          </button>
        </form>
      </div>
    </Layout>
  );
}
