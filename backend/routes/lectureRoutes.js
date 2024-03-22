const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);
const Cookies = require('js-cookie');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const multer = require('multer');
const Assignment = require('../models/Assignment')(sequelize); // Initialize Course model with sequelize instance
const CourseMaterial = require('../models/CourseMaterial')(sequelize); // Initialize Course model with sequelize instance
const AssignmentSubmission = require('../models/AssignmentSubmission')(sequelize); // Initialize Course model with sequelize instance
const { deleteCourse,
  addCourse,
  addLecturer,
  scheduleLecture,
  createMessage,
  createAssignment,
  getAllAssignments,
  getAllMessages, 
  getCourses,
  getStudents,
  getMaterials,
  getMaterialsAdmin,
  createQuiz,
  addStudent,
  addSchedule,
  getQuizzes,
  getSchedules,
  getLecturers,
  getAssignmentByTutor,
  getAssignmentByUser,
  updateAssignmentByAssignmentAndStudentId,
  deleteStudent, 
  getAllAssignmentsLecturer} = require('../controllers/lectureController');


const secretKey = '31aa242da19199e28b1fdeba71c5854ef260161064ea176772953f3912d89659013bcb';

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.sub) {
      const user = await User.findByPk(req.user.sub);
      if (!user) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      if (user.role === 'admin') {
        return next();
      }
    }
    res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to which files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Keep the original file name with a timestamp prefix
  },
});

const upload = multer({ storage: storage });

// Route to handle assignment creation
router.post('/create_assignment', isAuthenticated, upload.single('file'), (req, res) => {
  const { title, description, deadline,department} = req.body;
  const file = req.file;

  if (!title || !description || !deadline || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = file.path;
  const fileName = file.filename;
  console.log(fileName)

  Assignment.create({
    title,
    description,
    deadline,
    filePath: filePath,
    fileName:fileName,
    department:department,
  })
    .then((assignment) => {
      res.status(201).json({ assignment });
    })
    .catch((error) => {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Failed to create assignment' });
    });
});


// Route to handle assignment creation
router.post('/submit_assignment', isAuthenticated, upload.single('file'), (req, res) => {
  const { assignmentId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = file.path;
  const userId = req.user.sub

  AssignmentSubmission.create({
    studentId:userId,
    assignmentId:assignmentId,
    grade:0,
    filePath: filePath,
  })
    .then((assignment) => {
      res.status(201).json({ assignment });
    })
    .catch((error) => {
      console.error('Error Submit assignment:', error);
      res.status(500).json({ error: 'Failed to Submit assignment' });
    });
});



// Route to handle assignment creation
router.post('/create_assignment', isAuthenticated,upload.single('file'), (req, res) => {
  const { title, description, deadline } = req.body;
  const file = req.file;

  if (!title || !description || !deadline || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = file.path;
  const fileName = file.filename;
  console.log(fileName)

  Assignment.create({
    title,
    description,
    deadline,
    filePath: filePath,
    fileName:fileName
  })
    .then((assignment) => {
      res.status(201).json({ assignment });
    })
    .catch((error) => {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Failed to create assignment' });
    });
});



// Route to handle assignment creation
router.post('/create_material', isAuthenticated,upload.single('file'), (req, res) => {
  const { title, description,courseId, userId,department } = req.body;
  const file = req.file;

  if (!title || !description ||  !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = file.path;
  const fileName = file.filename;
  console.log(fileName)

  CourseMaterial.create({
    title,
    user_id:userId,
    description,
    department,
    courseId,
    fileUrl: filePath,
  })
    .then((coursematerial) => {
      res.status(201).json({ coursematerial });
    })
    .catch((error) => {
      console.error('Error creating materials:', error);
      res.status(500).json({ error: 'Failed to create Materials' });
    });
});


router.post('/courses',isAuthenticated,isAdmin,addCourse);
router.get('/get_lecturers', isAuthenticated, getLecturers);
router.get('/get_students', isAuthenticated,getStudents);
router.get('/get_courses',isAuthenticated,getCourses);
router.get('/get_schedules',isAuthenticated,getSchedules);
router.post('/add_student',addStudent);
router.post('/add_lecturer',isAuthenticated,addLecturer);
router.post('/schedule',isAuthenticated,scheduleLecture);
router.post('/create_message',isAuthenticated,createMessage);
router.post('/create_quiz',isAuthenticated,createQuiz);
router.post('/get_assignments',getAllAssignments);
router.post('/get_assignments_lecturer',getAllAssignmentsLecturer);
router.get('/get_message',isAuthenticated,isAdmin,getAllMessages);
router.get('/get_quizzes',isAuthenticated,getQuizzes);
router.post('/get_user_submission_assignment',isAuthenticated,getAssignmentByUser);
router.post('/get_course_materials',isAuthenticated,getMaterials);
router.post('/get_course_materials_admin',isAuthenticated,getMaterialsAdmin);
router.get('/get_tutor_assignment',isAuthenticated,getAssignmentByTutor);
router.put('/mark',isAuthenticated,updateAssignmentByAssignmentAndStudentId);
// Route for deleting a course



router.delete('/delete_courses/:id', deleteCourse);
router.delete('/delete_student/:id', deleteStudent);

module.exports = router;
