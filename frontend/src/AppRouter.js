import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './components/LoginForm';
import RegisterPage from './components/RegistrationForm';
import AddCoursePage from './components/AddCourseForm';
import ViewCourses from './components/ViewCourses';
import AddStudentPage from './pages/addStudent';
import ViewStudents from './components/ViewStudent';
import ScheduleLecturePage from './pages/scheduleLecture';
import AddLecturerPage from './pages/addLecturer';
import TimetablePage from './pages/timeTable';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MessageForm from './components/MessageForm';
import MessagePage from './components/GetMessages';
import CreateAssignmentPage from './components/CreateAssignment';
import ViewAssignemntPage from './components/ViewAssignment';
import ViewLecturesPage from './pages/viewLecturers';
import ViewUserAssignment from './components/viewUserAssignment';
import ViewAssignmentTutor from './components/ViewAssignmentTutor';
import CreateCourseMaterialPage from './pages/courseMaterial';
import ViewCourseMaterialsPage from './pages/viewMaterial';
import QuizPage from './pages/QuizPage';
import CreateQuizPage from './pages/createQuiz';
import Landing from './pages/Landing';
import ViewCourseMaterialsAdminPage from './pages/viewMaterial';
import ViewAssignemntLecturerPage from './pages/viewLecturerAssignment';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has a token stored in a cookie
    const token = Cookies.get('token');
   
    token ? setIsAuthenticated(true): setIsAuthenticated(false);
  }, []);

  return (
    <Router>
      <div className="flex">
      {isAuthenticated && <Sidebar 
       
        />}
        
        <div className="p-7 w-full">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            {isAuthenticated ? (
              <>
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add_course" element={<AddCoursePage />} />
                {/* <Route path="/add_student" element={<AddStudentPage/>} /> */}
                <Route path="/add_lecturer" element={<AddLecturerPage />} />
                <Route path="/view_courses" element={<ViewCourses />} />
                <Route path="/view_student" element={<ViewStudents />} />
                <Route path="/view_lecturers" element={<ViewLecturesPage />} />
                <Route path="/messages" element={<MessagePage/>} />
                <Route path="/schedule_lecture" element={<ScheduleLecturePage />} />
                <Route path="/timetable" element={<TimetablePage/>} />
                <Route path="/message" element={<MessageForm/>} />               
                {/* <Route path="/create_assignment" element={<CreateAssignmentPage/>} />
                <Route path="/view_assignment" element={<ViewAssignemntPage/>} />      
                <Route path="/view_assignment_lecturer" element={<ViewAssignemntLecturerPage/>} />      
                <Route path="/view_tutor_assignment" element={<ViewAssignmentTutor/>} />                
                <Route path="/create_quiz" element={<CreateQuizPage />} />          
                <Route path="/create_material" element={<CreateCourseMaterialPage />} /> */}
             
{/*                
                <Route path="/view_material" element={<ViewCourseMaterialsPage />} />
                <Route path="/view_material_admin" element={<ViewCourseMaterialsAdminPage />} />
                <Route path="/view_user_assignment" element={<ViewUserAssignment/>} />
                <Route path="/quiz" element={<QuizPage />} /> */}

              </>
            ) : (
              // Redirect to login page if not authenticated
              <Route element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
