import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import DeleteClassModal from "../../../components/DeleteClassModal";
import { useState, useEffect } from "react";
import { getClasses, deleteClass } from "../../../api/classesApi";

export default function ClassList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
        try {
            const data = await getClasses();
            setClasses(data);
        } catch (error) {
            console.error(error);
        }
    };

    loadClasses();

}, []);

  const handleDelete = async () => {
    try {
      await deleteClass(selectedClass?.id);
      setShowDeleteModal(false);
      setSelectedClass(null);
      setDeleteError("");
      window.location.reload(false);
    } catch (error) {
      const message = error.response?.data || "Failed to delete class.";
      setDeleteError(message);
    }
  };

  return (
    <Layout>

      <div className="main_section">

        <h1 className="text-3xl font-bold mb-2">
          All Classes
        </h1>

        <p className="text-gray-500 mb-6">
          Manage all classes offered at BVC
        </p>

        <div className="bg-white border rounded-xl p-6">

          <div className="flex justify-between mb-4">

            <input
              type="text"
              placeholder="Search classes..."
              className="border rounded-lg px-4 py-2 w-96"
            />

            <Link
              to="/admin/classes/new"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              + Add New Class
            </Link>

          </div>

         <table className="w-full text-center">
            <thead>
              <tr className="border-b">
                <th className="py-3">Class ID</th>
                <th className="py-3">Course</th>
                <th className="py-3">Instructor</th>
                <th className="py-3">Capacity</th>
                <th className="py-3">Status</th>
                <th className="py-3 w-36">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((cls) => (
                <tr
                  key={cls.id}
                  className="border-b"
                >
                  <td className="py-4">{cls.id}</td>

                  <td>{cls.name}</td>

                  <td>{cls.instructor}</td>

                  <td>{cls.capacity}</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {cls.status}
                    </span>
                  </td>

                  <td className="w-36">
                    <div className="flex justify-center items-center gap-4">

                      {/* View class details */}
                      <Link to={`/admin/classes/${cls.id}`}>
                        👁️
                      </Link>

                      {/* Edit class */}
                      <Link to={`/admin/classes/${cls.id}/edit`}>
                        ✏️
                      </Link>

                      {/* Delete class */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedClass(cls);
                          setShowDeleteModal(true);
                        }}
                      >
                        🗑️
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
      
       {/* Delete confirmation modal */}
      <DeleteClassModal
        isOpen={showDeleteModal}
        classId={selectedClass?.id}
        error={deleteError}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedClass(null);
          setDeleteError("");
        }}
        onDelete={handleDelete}
      />

    </Layout>
  );
}
