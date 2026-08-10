import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { getTeacher, updateTeacher } from "../../../services/teacherService";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    getTeacher(id)
      .then((data) => {
        if (!ignore) {
          setForm({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
        }
      })
      .catch(() => {
        if (!ignore) setLoadError("Something went wrong while loading. Please try again.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    updateTeacher(id, form)
      .then(() => {
        navigate(`/admin/teachers/${id}`);
      })
      .catch((err) => {
        setError(err.message);
        setSubmitting(false);
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

  if (loadError || !form) {
    return (
      <Layout>
        <div className="main_section">
          <p className="text-red-500">{loadError || "Teacher not found."}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
       <div class="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Edit Teacher
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl border"
        >

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label>First Name</label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label>Last Name</label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={form.email}
                disabled
                className="w-full border border-gray-300 p-3 rounded bg-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            {submitting ? "Updating..." : "Update Teacher"}
          </button>

        </form>
      </div>
    </Layout>
  );
}
