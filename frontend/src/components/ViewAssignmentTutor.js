import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewAssignmentTutor = () => {
  const [assignments, setAssignments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [newGrades, setNewGrades] = useState({}); // Maintain separate state for grades

  const fetchAssignments = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/get_tutor_assignment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }

      const data = await response.json();
      setAssignments(data ?? []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  
  const handleDownloadPDF = (filePath) => {
    const fileUrl = `http://localhost:5000/${filePath}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download ='Assignment';
    link.click();
  };


  const handleUpdateGrade = async (assignmentId, studentId) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/mark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignmentId, studentId, grade: newGrades[assignmentId] }), // Use the corresponding grade for the assignment
      });

      if (!response.ok) {
        throw new Error('Failed to update grade');
      }

      setSuccessMessage('Grade updated successfully');
      setTimeout(() => setSuccessMessage(''), 2000);

      // Refresh assignments after successful update
      fetchAssignments();
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  const handleGradeChange = (assignmentId, e) => {
    const value = e.target.value;
    setNewGrades(prevState => ({
      ...prevState,
      [assignmentId]: value,
    }));
  };

  return (
    <div className="container">
      <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Marks(%)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments?.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.Assignment.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.grade == 0 ? "In Progress" : assignment.grade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.grade !== 0 && (
                  <div>
                    <input
                      type="number"
                      value={newGrades[assignment.assignmentId] || ''}
                      onChange={(e) => handleGradeChange(assignment.assignmentId, e)} // Pass assignment ID to handleGradeChange
                      placeholder="Enter new grade"
                      className="mr-2"
                    />
                <button onClick={() => handleDownloadPDF(assignment.filePath)} className="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download
                </button>
                    <button
                      onClick={() => handleUpdateGrade(assignment.assignmentId, assignment.studentId)} // Pass assignment and student ID
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update Grade
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignmentTutor;
