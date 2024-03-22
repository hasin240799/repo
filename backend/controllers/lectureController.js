const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);
const Course = require('../models/Course')(sequelize); // Initialize Course model with sequelize instance
const Student = require('../models/Student')(sequelize); // Initialize Course model with sequelize instance
const Schedule = require('../models/Schedule')(sequelize); // Initialize Course model with sequelize instance
const Lecturer = require('../models/Lecturer')(sequelize); // Initialize Course model with sequelize instance
const Message = require('../models/Message')(sequelize); // Initialize Course model with sequelize instance

const Assignment = require('../models/Assignment')(sequelize); // Initialize Course model with sequelize instance
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const CourseMaterial = require('../models/CourseMaterial')(sequelize); // Initialize Course model with sequelize instance

const Quiz = require('../models/Quiz')(sequelize); // Initialize Course model with sequelize instance
const AssignmentSubmission = require('../models/AssignmentSubmission')(sequelize);





// Method to create a new message
exports.createMessage = async function(req, res) {
  try {
    const { message } = req.body;
    // Get the user ID from the request
    const userId = req.user.sub;
    // Ensure that userId is defined
    if (!userId) {
      return res.status(400).json({ message: 'User ID is not provided' });
    }
    // Find the student by user ID
    const student = await Student.findOne({ where: { user_id: userId } });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Extract sender name from the student
    const sender = student.name;
    // Create a new message
    const newMessage = await Message.create({ sender, message });
    // Send the newly created message as a response
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



// Method to get all materials
exports.getMaterials = async function(req, res) {
  try {
    const { user_id } = req.body;

    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch student from the database based on user_id
    const student = await Student.findOne({ where: { user_id: user_id } });
    
    // If student is not found, return 404 status
    if (!student) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    // Fetch assignments/materials based on the student's department
    const assignments = await CourseMaterial.findAll({ where: { department: student.department } });
    
    // Send the assignments/materials as a response
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to get all materials
exports.getMaterialsAdmin = async function(req, res) {
  try {
    const { user_id } = req.body;

    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch student from the database based on user_id
    const lecturer = await Lecturer.findOne({ where: { user_id: user_id } });
    
    // If student is not found, return 404 status
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer Not Found' });
    }

    // Fetch assignments/materials based on the student's department
    const materials = await CourseMaterial.findAll({ where: { department: lecturer.department } });
    
    // Send the assignments/materials as a response
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Method to get all assignments
exports.getAllAssignments = async function(req, res) {
  try {
    const { user_id } = req.body;

    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch student from the database based on user_id
    const student = await Student.findOne({ where: { user_id: user_id } });
    
    // If student is not found, return 404 status
    if (!student) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    // Fetch assignments based on the student's department
    const assignments = await Assignment.findAll({ where: { department: student.department } });
    
    // Send the assignments as a response
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Method to get all assignments
exports.getAllAssignmentsLecturer = async function(req, res) {
  try {
    const { user_id } = req.body;

    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch student from the database based on user_id
    const lecturer = await Lecturer.findOne({ where: { user_id: user_id } });
    
    // If student is not found, return 404 status
    if (!lecturer) {
      return res.status(404).json({ message: 'Student Not Found' });
    }

    // Fetch assignments based on the student's department
    const assignments = await Assignment.findAll({ where: { department: lecturer.department } });
    
    // Send the assignments as a response
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



// Method to get all messages
exports.getAllMessages = async function(req, res) {
  try {
    // Fetch all messages from the database
    const messages = await Message.findAll();
    // Send the messages as a response
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to get a single message by ID
exports.getMessageById = async function(req, res) {
  const { id } = req.params;
  try {
    // Find the message by ID in the database
    const message = await Message.findByPk(id);
    // If the message is not found, return a 404 response
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    // Send the message as a response
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to get a single assignment submission by student ID
exports.getAssignmentByUser = async function(req, res) {
  try {
    const { user_id } = req.body;
    // Fetch all messages from the database
   
    const assignments = await AssignmentSubmission.findAll({ 
      where: { studentId: user_id },
      include: 'Assignment' // Include the associated Assignment model
    });

    // If no assignment submissions are found, return a 404 response
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ error: 'Assignments not found' });
    }

    // Send the assignment submissions as a response
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Method to get a single assignment submission by student ID
exports.getAssignmentByTutor = async function(req, res) {
  try {
    // Find the assignment submissions by student ID in the database, including the associated Assignment data
    const assignments = await AssignmentSubmission.findAll({ 
      include: 'Assignment' // Include the associated Assignment model
    });

    // If no assignment submissions are found, return a 404 response
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ error: 'Assignments not found' });
    }

    // Send the assignment submissions as a response
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to update assignment by assignment and student ID
exports.updateAssignmentByAssignmentAndStudentId = async (req, res) => {
  const { assignmentId, studentId, grade } = req.body;
    
  try {
    // Find the assignment submission by both assignment and student ID
    const assignmentSubmission = await AssignmentSubmission.findOne({
      where: { assignmentId, studentId }
    });

    // If assignment submission is not found, return 404 error
    if (!assignmentSubmission) {
      return res.status(404).json({ error: 'Assignment submission not found' });
    }

    // Update the grade
    assignmentSubmission.grade = grade;
    await assignmentSubmission.save();

    // Return the updated assignment submission
    res.json({"message":"Assignment marked"});
  } catch (error) {
    console.error('Error updating assignment submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Method to delete a message by ID
exports.deleteMessage = async function(req, res) {
  const { id } = req.params;
  try {
    // Find the message by ID in the database
    const message = await Message.findByPk(id);
    // If the message is not found, return a 404 response
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    // Delete the message from the database
    await message.destroy();
    // Send a success response
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



exports.createQuiz = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
   
    // Create quiz in the database
    const quiz = await Quiz.create({
      question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      correctOption:correctAnswer,
    });

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch quizzes
exports.getQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes from the database
    const quizzes = await Quiz.findAll();

    // Send the quizzes as a response
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.addCourse = async (req, res) => {
  try {
    const { courseTitle,courseCode,lecturerId,LecturerName,courseLevel, creditUnit } = req.body;
    const user = await User.findOne({ where: { id:lecturerId } });
    const course = await Course.create({ 
      title: courseTitle,
      courseId: courseCode,
      lecturerId:lecturerId,
      lecturer_name:user.username,
      credit_unit:creditUnit,
      course_level:courseLevel
    });

    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.addStudent = async (req, res) => {
  try {
    const { name, level, department, contact, email,reg } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log(reg)
    // Create a new user
    const hashedPassword = bcrypt.hashSync(contact, 10);
    const newUser = await User.create({ username:email,email:email, password: hashedPassword });

    const student = await Student.create({ 
      name: name,
      level: level,
      department: department,
      contact: contact,
      email: email,
      user_id:newUser.id,
      reg_no:reg,
    });

    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addLecturer = async (req, res) => {
  try {
    const { name, expertise, department, contact, email } = req.body;
    // Check if the user already exists

       // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
    
      // Create a new user
      const hashedPassword = bcrypt.hashSync(contact, 10);
      const newUser = await User.create({ username:email,email:email, password: hashedPassword,role:'instructor' });

       
    const existingLecturer = await Lecturer.findOne({ where: { email } });
    if (existingLecturer) {
      return res.status(400).json({ message: 'Lecturer already exists' });
    }
 
    const lecturer = await Lecturer.create({ 
      name: name,
      user_id:newUser.id,
      expertise:expertise,
      department: department,
      contact: contact,
      email: email,
    });

    res.status(201).json({ message: 'Lecturer added successfully', lecturer });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// // Controller function to schedule a new lecture
// exports.scheduleLecture = async (req, res) => {
//   try {
//     const {
//       course_code,
//       schedule_date,
//       start_time,
//       end_time
//     } = req.body;

//     // Create a new lecture instance
//     const newLecture = new Lecture({
      // lecture_name,
      // lecturer_id,
      // course_level,
      // course_id,
      // course_title,
//       course_code,
//       schedule_date,
//       start_time,
//       end_time
//     });

//     // Save the new lecture to the database
//     await newLecture.save();

//     res.status(201).json({ message: 'Lecture scheduled successfully', lecture: newLecture });
//   } catch (error) {
//     console.error('Error scheduling lecture:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Controller function to schedule a new lecture
exports.scheduleLecture = async (req, res) => {
  try {
    const {
      lecture_name,
      lecturer_id,
      course_level,
      course_id,
      course_title,
      courseId,
      scheduleDate,
      startTime,
      endTime
    } = req.body;

    const course = await Course.findOne({
      where: { id: courseId } // Specify conditions in the where clause
    });

    const newLecture = await Schedule.create({
      course_id: courseId,
      course_code:course.courseId,
      lecture_name:course.lecturer_name,
      lecturer_id:course.lecturerId,
      course_title:course.title,
      course_level:course.course_level,
      schedule_date: scheduleDate,
      start_time: startTime,
      end_time: endTime
    });

    res.status(201).json({ message: 'Lecture scheduled successfully', lecture: newLecture });
  } catch (error) {
    console.error('Error scheduling lecture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function for deleting a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // Assume Course is your model
  
    const deletedCourse = await Course.destroy({
      where: {
         id: id,
      },
   });
    
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function for deleting a course
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    // Assume Course is your model
  
    const deletedStudent = await User.destroy({
      where: {
         id: id,
      },
   });
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getStudents = async (req, res) => {
  try {
    const student = await Student.findAll();
    res.status(200).json({ student });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





exports.getLecturers = async (req, res) => {
  try {
    const lecturer = await Lecturer.findAll();
    res.status(200).json({ lecturer });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// exports.addSchedule = async (req, res) => {
//   try {
//     const { courseId, date, time, topic } = req.body;
//     const schedule = await Schedule.create({ courseId, date, time, topic });
//     res.status(201).json({ message: 'Schedule added successfully', schedule });
//   } catch (error) {
//     console.error('Error adding schedule:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// exports.getSchedules = async (req, res) => {
//   try {
//     const schedules = await Schedule.findAll();
//     res.status(200).json({ schedules });
//   } catch (error) {
//     console.error('Error fetching schedules:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
