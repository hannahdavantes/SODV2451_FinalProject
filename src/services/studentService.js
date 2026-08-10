import { apiClient } from "./apiClient";

export const getStudents = () => apiClient.get("/api/students");
export const getStudent = (id) => apiClient.get(`/api/students/${id}`);
export const createStudent = (student) => apiClient.post("/api/students", student);
export const updateStudent = (id, student) => apiClient.put(`/api/students/${id}`, student);
export const deleteStudent = (id) => apiClient.del(`/api/students/${id}`);
