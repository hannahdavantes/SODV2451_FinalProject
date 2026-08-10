import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import DeleteStudentModal from "../../../components/DeleteStudentModal";
import { getStudents, deleteStudent } from "../../../services/studentService";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let ignore = false;

    getStudents()
      .then((data) => {
        if (!ignore) setStudents(data);
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

    deleteStudent(selectedStudent.id)
      .then(() => {
        setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
        setShowDeleteModal(false);
        setSelectedStudent(null);
      })
      .catch((err) => {
        setDeleteError(err.message);
      });
  };

  return (
    <Layout>

      <div className="main_section">

        <h1 className="text-3xl font-bold mb-2">
          All Students
        </h1>

        <p className="text-gray-500 mb-6">
          Manage all students enrolled at BVC
        </p>

        <div className="bg-white rounded-xl border p-6">

          <div className="flex justify-between mb-4">

            <input
              type="text"
              placeholder="Search students..."
              className="border rounded-lg px-4 py-2 w-96"
            />

            <Link
              to="/admin/students/new"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              + Add New Student
            </Link>

          </div>

          {loading && <p>Loading students...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th>Student Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b text-center"
                  >

                    <td>{student.studentNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>

                    <td>

                      <Link
                        to={`/admin/students/${student.id}`}
                      >
                        👁️
                      </Link>

                      {"  "}

                      <Link
                        to={`/admin/students/${student.id}/edit`}
                      >
                        ✏️
                      </Link>

                      {"  "}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStudent(student);
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

      <DeleteStudentModal
        isOpen={showDeleteModal}
        studentName={selectedStudent?.name}
        errorMessage={deleteError}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedStudent(null);
          setDeleteError("");
        }}
        onDelete={handleDelete}
      />

    </Layout>
  );
}
