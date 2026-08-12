import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

export const getClasses = async () => {
    const response = await API.get("/classes/");
    return response.data;
};

export const getClass = async (id) => {
  const response = await API.get(`/classes/${id}`);
  return response.data;
};

export const updateClass = async (id, classItem) => {
    await API.put(`/classes/${id}`, classItem);
};

export const createClass = async (classItem) => {
    await API.post("/classes/", classItem);
};

export const deleteClass = async (id) => {
    await API.delete(`/classes/${id}`);
}

export const getStudentsForClass = async (id) => {
    const response = await API.get(`/classes/${id}/students`);
    return response.data;
};