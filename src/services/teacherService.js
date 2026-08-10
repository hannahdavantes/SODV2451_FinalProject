import { apiClient } from "./apiClient";

export const getTeachers = () => apiClient.get("/api/teachers");
export const getTeacher = (id) => apiClient.get(`/api/teachers/${id}`);
export const createTeacher = (teacher) => apiClient.post("/api/teachers", teacher);
export const updateTeacher = (id, teacher) => apiClient.put(`/api/teachers/${id}`, teacher);
export const deleteTeacher = (id) => apiClient.del(`/api/teachers/${id}`);
