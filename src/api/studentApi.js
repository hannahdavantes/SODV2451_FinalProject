const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getAuthHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function getErrorMessage(errorBody, fallbackMessage) {
  if (typeof errorBody === "string" && errorBody.trim() !== "") {
    return errorBody;
  }

  if (errorBody && typeof errorBody === "object") {
    return errorBody.message || errorBody.title || fallbackMessage;
  }

  return fallbackMessage;
}

function normalizeClassListItem(classItem) {
  return {
    id: classItem.Id ?? classItem.id,
    course: classItem.Course ?? classItem.course ?? "",
    name: classItem.Name ?? classItem.name ?? "",
    instructor: classItem.Instructor ?? classItem.instructor ?? "",
    status: classItem.Status ?? classItem.status ?? "",
    capacity: classItem.Capacity ?? classItem.capacity ?? "",
  };
}

function normalizeClassDetails(classItem) {
  return {
    id: classItem.id ?? classItem.Id,
    code: classItem.code ?? classItem.Code ?? classItem.course ?? classItem.Course ?? "",
    name: classItem.name ?? classItem.Name ?? "",
    teacherName: classItem.teacherName ?? classItem.TeacherName ?? classItem.instructor ?? classItem.Instructor ?? "",
    deliveryMode: classItem.deliveryMode ?? classItem.DeliveryMode ?? "",
    enrollmentCount: classItem.enrollmentCount ?? classItem.EnrollmentCount ?? 0,
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: options.headers || getAuthHeaders(),
  });

  const body = await readResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(body, "Request failed."));
  }

  return body;
}

export async function loginUser(email, password) {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function getClasses(search = "") {
  const query = search.trim() === "" ? "" : `?search=${encodeURIComponent(search.trim())}`;
  const data = await request(`/classes${query}`);

  return Array.isArray(data) ? data.map(normalizeClassListItem) : [];
}

export async function getClassDetails(classId) {
  const data = await request(`/classes/${classId}`);
  return normalizeClassDetails(data);
}

export async function enrollStudent(userId, classId) {
  return request("/enrollments", {
    method: "POST",
    body: JSON.stringify({ userId: Number(userId), classId: Number(classId) }),
  });
}

export async function dropEnrollment(userId, classId) {
  return request(`/enrollments/user/${userId}/class/${classId}`, {
    method: "DELETE",
  });
}

export async function getEnrolledClasses(userId) {
  const data = await request(`/enrollments/user/${userId}`);

  return {
    studentName: data.studentName ?? "",
    classes: Array.isArray(data.classes) ? data.classes.map(normalizeClassListItem) : [],
  };
}

export { API_BASE_URL };