import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import DeleteTeacherModal from "../../../components/DeleteTeacherModal";
import { getTeacher, deleteTeacher } from "../../../services/teacherService";

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let ignore = false;

    getTeacher(id)
      .then((data) => {
        if (!ignore) setTeacher(data);
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

    deleteTeacher(id)
      .then(() => {
        navigate("/admin/teachers");
      })
      .catch((err) => {
        setDeleteError(err.message);
      });
  };

  if (loading) {
    return (
      <Layout>
        <div className="main_section">
          <p>Loading teacher...</p>
        </div>
      </Layout>
    );
  }

  if (error || !teacher) {
    return (
      <Layout>
        <div className="main_section">
          <p className="text-red-500">{error || "Teacher not found."}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div class="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Teacher Details
        </h1>

        <div className="bg-white border rounded-xl p-6">

          <div className="flex justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                {teacher.name}
              </h2>

              <p>{teacher.id}</p>
            </div>

            <div className="space-x-3">
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => navigate(`/admin/teachers/${id}/edit`)}
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
              <strong>Teacher ID</strong>
              <p>{teacher.id}</p>
            </div>

            <div>
              <strong>First Name</strong>
              <p>{teacher.firstName}</p>
            </div>

            <div>
              <strong>Last Name</strong>
              <p>{teacher.lastName}</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>{teacher.email}</p>
            </div>

          </div>

        </div>
      </div>

      <DeleteTeacherModal
        isOpen={showDeleteModal}
        teacherName={teacher.name}
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
