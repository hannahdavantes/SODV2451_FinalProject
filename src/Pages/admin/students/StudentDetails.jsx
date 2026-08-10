import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import DeleteStudentModal from "../../../components/DeleteStudentModal";
import { getStudent, deleteStudent } from "../../../services/studentService";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let ignore = false;

    getStudent(id)
      .then((data) => {
        if (!ignore) setStudent(data);
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
  }, [id]);

  const handleDelete = () => {
    setDeleteError("");

    deleteStudent(id)
      .then(() => {
        navigate("/admin/students");
      })
      .catch((err) => {
        setDeleteError(err.message);
      });
  };

  if (loading) {
    return (
      <Layout>
        <div className="main_section">
          <p>Loading student...</p>
        </div>
      </Layout>
    );
  }

  if (error || !student) {
    return (
      <Layout>
        <div className="main_section">
          <p className="text-red-500">{error || "Student not found."}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div class="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Student Details
        </h1>

        <div className="bg-white border rounded-xl p-6">

          <div className="flex justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                {student.name}
              </h2>

              <p>{student.studentNumber}</p>
            </div>

            <div className="space-x-3">
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => navigate(`/admin/students/${id}/edit`)}
              >
                Edit
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setDeleteError("");
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <strong>Student ID</strong>
              <p>{student.id}</p>
            </div>

            <div>
              <strong>Student Number</strong>
              <p>{student.studentNumber}</p>
            </div>

            <div>
              <strong>First Name</strong>
              <p>{student.firstName}</p>
            </div>

            <div>
              <strong>Last Name</strong>
              <p>{student.lastName}</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>{student.email}</p>
            </div>

          </div>

        </div>
      </div>

      <DeleteStudentModal
        isOpen={showDeleteModal}
        studentName={student.name}
        errorMessage={deleteError}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteError("");
        }}
        onDelete={handleDelete}
      />

    </Layout>
  );
}
