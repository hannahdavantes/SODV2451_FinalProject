// courseAPI.js
const BASE_URL = "http://localhost:5239/api/courses";

export const courseAPI = {
  // GET: api/courses or api/courses?search=...
  getAll: async (search = "") => {
    const url = search ? `${BASE_URL}?search=${encodeURIComponent(search)}` : BASE_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return await response.json();
  },

  // GET: api/courses/bycode/{code}
  getByCode: async (code) => {
    // Encodes characters like spaces so "COMP 201" handles safely over HTTP
    const response = await fetch(`${BASE_URL}/bycode/${encodeURIComponent(code)}`); 
    if (!response.ok) throw new Error(`Failed to fetch course with code ${code}`);
    return await response.json();
  },

  // POST: api/courses
  create: async (courseData) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create course");
    }
    return await response.json();
  },

  // PUT: api/courses/{id}
  update: async (id, courseData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update course");
    }
    return true;
  },

  // DELETE: api/courses/{id}
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete course");
    }
    return true;
  }
};