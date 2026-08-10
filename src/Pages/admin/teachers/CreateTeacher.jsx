import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { createTeacher } from "../../../services/teacherService";

export default function CreateTeacher() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    setSubmitting(true);

    createTeacher(form)
      .then(() => {
        navigate("/admin/teachers");
      })
      .catch((err) => {
        setError(err.message);
        setSubmitting(false);
      });
  };

  return (
    <Layout>
      <div class="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Add New Teacher
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

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 bg-black text-white px-6 py-3 rounded"
          >
            {submitting ? "Creating..." : "Create Teacher"}
          </button>

        </form>
      </div>
    </Layout>
  );
}
