import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import DeleteTeacherModal from "../../../components/DeleteTeacherModal";
import { getTeachers, deleteTeacher } from "../../../services/teacherService";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let ignore = false;

    getTeachers()
      .then((data) => {
        if (!ignore) setTeachers(data);
      })
      .catch(() => {
        if (!ignore) setError("Something went wrong while loading. Please try again.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = () => {
    setDeleteError("");

    deleteTeacher(selectedTeacher.id)
      .then(() => {
        setTeachers((prev) => prev.filter((t) => t.id !== selectedTeacher.id));
        setShowDeleteModal(false);
        setSelectedTeacher(null);
      })
      .catch((err) => {
        setDeleteError(err.message);
      });
  };

  return (
    <Layout>

      <div className="main_section">

        <h1 className="text-3xl font-bold mb-2">
          All Teachers
        </h1>

        <p className="text-gray-500 mb-6">
          Manage all teachers employed at BVC
        </p>

        <div className="bg-white rounded-xl border p-6">

          <div className="flex justify-between mb-4">

            <input
              type="text"
              placeholder="Search teachers..."
              className="border rounded-lg px-4 py-2 w-96"
            />

            <Link
              to="/admin/teachers/new"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              + Add New Teacher
            </Link>

          </div>

          {loading && <p>Loading teachers...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b text-center"
                  >

                    <td>{teacher.id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>

                    <td>

                      <Link
                        to={`/admin/teachers/${teacher.id}`}
                      >
                        👁️
                      </Link>

                      {"  "}

                      <Link
                        to={`/admin/teachers/${teacher.id}/edit`}
                      >
                        ✏️
                      </Link>

                      {"  "}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setDeleteError("");
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

      <DeleteTeacherModal
        isOpen={showDeleteModal}
        teacherName={selectedTeacher?.name}
        errorMessage={deleteError}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTeacher(null);
          setDeleteError("");
        }}
        onDelete={handleDelete}
      />

    </Layout>
  );
}
