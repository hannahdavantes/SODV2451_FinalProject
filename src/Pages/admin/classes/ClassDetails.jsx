import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { getClass } from "../../../api/classesApi";

export default function ClassDetails() {
  const { id } = useParams();

  const [classData, setClassData] = useState(null);

  useEffect(() => {

  const loadClass = async () => {

    try {

      const data = await getClass(id);

      setClassData(data);

    } catch (error) {

      console.error("Error loading class:", error);

    }

  };

  loadClass();

}, [id]);
if (!classData) {
  return (
    <Layout>
      <div className="main_section">
        <p>Loading...</p>
      </div>
    </Layout>
  );
}
  return (
    <Layout>
      
      <div className="main_section">
        <h1 className="text-3xl font-bold mb-6">
          Class Details
        </h1>

        <div className="bg-white border rounded-xl p-6">

          <div className="flex justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                {classData.code}
              </h2>

              <p>{classData.name}</p>
            </div>

          </div>

        </div>

        <div className="bg-white border rounded-xl p-6 mt-6">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <strong>Instructor</strong>
              <p>{classData.teacherName}</p>
            </div>

            <div>
              <strong>Capacity</strong>
              <p>{classData.enrollmentCount}</p>
            </div>

            <div>
              <strong>Status</strong>
              <p>{classData.deliveryMode}</p>
            </div>

          </div>

        </div>
      </div>

    </Layout>
  );
}