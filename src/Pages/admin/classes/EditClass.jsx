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
        setCapacity(data.capacity);
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
      Name: name,
      Room: room,
      Capacity: Number(capacity),
      DeliveryMode: status,
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
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Course Code</label>
              <input
                value={course}
                readOnly
                className="border p-3 rounded bg-gray-100"
              />
            </div>

            {/* Class Name (Editable) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Class Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded"
              />
            </div>

            {/* Instructor (Read Only) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Instructor</label>
              <input
                value={instructor}
                readOnly
                className="border p-3 rounded bg-gray-100"
              />
            </div>

            {/* Room (Editable) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Room</label>
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="border p-3 rounded"
              />
            </div>

            {/* Capacity (Editable) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="border p-3 rounded"
                min="1"
              />
            </div>

            {/* Status (Editable Dropdown) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Delivery Mode</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-3 rounded"
              >
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </select>
            </div>

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