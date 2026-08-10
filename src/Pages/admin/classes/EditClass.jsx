import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { getClass, updateClass } from "../../../api/classesApi";

export default function EditClass() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadClass = async () => {
      try {
        const data = await getClass(id);

        setCourse(data.code);
        setName(data.name);
        setInstructor(data.teacherName);
        setRoom(data.room);
        setCapacity(data.enrollmentCount);
        setStatus(data.deliveryMode);
      } catch (error) {
        console.error("Error loading class:", error);
      }
    };

    loadClass();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedClass = {
      name: name,
      roomNum: room,
      status: status,
    };

    try {
      await updateClass(id, updatedClass);

      alert("Class updated successfully!");

      navigate("/admin/classes");
    }  catch (error) {
        console.error(error);
        console.error(error.response);
        console.error(error.response?.status);
        console.error(error.response?.data);

        alert("Failed to update class.");
    }
  };

  return (
    <Layout>
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Edit Class
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-8"
        >
          <div className="grid grid-cols-2 gap-6">

            {/* Course Code (Read Only) */}
            <input
              value={course}
              readOnly
              className="border p-3 rounded bg-gray-100"
              placeholder="Course Code"
            />

            {/* Class Name (Editable) */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded"
              placeholder="Class Name"
            />

            {/* Instructor (Read Only) */}
            <input
              value={instructor}
              readOnly
              className="border p-3 rounded bg-gray-100"
              placeholder="Instructor"
            />

            {/* Room (Editable) */}
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border p-3 rounded"
              placeholder="Room"
            />

            {/* Capacity (Read Only) */}
            <input
              value={capacity}
              readOnly
              className="border p-3 rounded bg-gray-100"
              placeholder="Capacity"
            />

            {/* Status (Editable Dropdown) */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded"
            >
              <option value="Online">Online</option>
              <option value="In Person">In Person</option>
            </select>

          </div>

          <button
            type="submit"
            className="mt-8 bg-black text-white px-6 py-3 rounded-lg"
          >
            Update Class
          </button>
        </form>
      </div>
    </Layout>
  );
}