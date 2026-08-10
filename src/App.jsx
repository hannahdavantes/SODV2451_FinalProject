import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Course Pages
import CourseList from "./Pages/admin/courses/CourseList";
import CourseDetails from "./Pages/admin/courses/CourseDetails";
import CreateCourse from "./Pages/admin/courses/CreateCourse";
import EditCourse from "./Pages/admin/courses/EditCourse";

// Class Pages
import ClassList from "./Pages/admin/classes/ClassList";
import ClassDetails from "./Pages/admin/classes/ClassDetails";
import CreateClass from "./Pages/admin/classes/CreateClass";
import EditClass from "./Pages/admin/classes/EditClass";

// Student Admin Pages
import StudentList from "./Pages/admin/students/StudentList";
import StudentDetails from "./Pages/admin/students/StudentDetails";
import CreateStudent from "./Pages/admin/students/CreateStudent";
import EditStudent from "./Pages/admin/students/EditStudent";

// Teacher Admin Pages
import TeacherList from "./Pages/admin/teachers/TeacherList";
import TeacherDetails from "./Pages/admin/teachers/TeacherDetails";
import CreateTeacher from "./Pages/admin/teachers/CreateTeacher";
import EditTeacher from "./Pages/admin/teachers/EditTeacher";

import "./CourcesClasses.css";

// Auth Pages
import Login from "./Pages/auth/Login";

// Student Pages
import StudentApp from "./Pages/student/StudentApp";

// Teacher Pages
import TeacherMyClasses from "./Pages/teacher/MyClasses";
import TeacherClassDetails from "./Pages/teacher/ClassDetails";
import TeacherClassStudents from "./Pages/teacher/ClassStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Course Routes */}
        <Route path="/admin/courses" element={<CourseList />} />

        <Route path="/admin/courses/new" element={<CreateCourse />} />

        <Route path="/admin/courses/:id" element={<CourseDetails />} />

        <Route path="/admin/courses/:id/edit" element={<EditCourse />} />

        {/* Class Routes */}
        <Route path="/admin/classes" element={<ClassList />} />

        <Route path="/admin/classes/new" element={<CreateClass />} />

        <Route path="/admin/classes/:id" element={<ClassDetails />} />

        <Route path="/admin/classes/:id/edit" element={<EditClass />} />

        {/* Student Admin Routes */}
        <Route path="/admin/students" element={<StudentList />} />

        <Route path="/admin/students/new" element={<CreateStudent />} />

        <Route path="/admin/students/:id" element={<StudentDetails />} />

        <Route path="/admin/students/:id/edit" element={<EditStudent />} />

        {/* Teacher Admin Routes */}
        <Route path="/admin/teachers" element={<TeacherList />} />

        <Route path="/admin/teachers/new" element={<CreateTeacher />} />

        <Route path="/admin/teachers/:id" element={<TeacherDetails />} />

        <Route path="/admin/teachers/:id/edit" element={<EditTeacher />} />

        {/* Student Routes */}
        <Route path="/student/*" element={<StudentApp />} />

        {/* Teacher Routes */}
        <Route path="/teacher/classes" element={<TeacherMyClasses />} />

        <Route
          path="/teacher/classes/:classCode/details"
          element={<TeacherClassDetails />}
        />

        <Route
          path="/teacher/classes/:classCode/students"
          element={<TeacherClassStudents />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
