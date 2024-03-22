import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewAssignmentsLecturer = () => {
  const [assignments, setAssignments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAssignments = async () => {
    try {
      const token = Cookies.get('token');
      const user_id = Cookies.get('user_id'); // Get user_id from cookie
   
      const response = await fetch('http://localhost:5000/api/lectures/get_assignments_lecturer', {
  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id
          }),
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

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:5000/api/lectures/delete_assignment/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete assignment');
      }

      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleUpload = async (id, file) => {
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('assignmentId', id);
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/lectures/submit_assignment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload assignment');
      }
      // Display success message
      ;
      setTimeout(()=>setSuccessMessage('Assignment Submitted successfully'),2000)
      // Refresh assignments after successful upload
      fetchAssignments();
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const handleDownloadPDF = (filePath, fileName) => {
    const fileUrl = `http://localhost:5000/${filePath}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments?.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.deadline}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDownloadPDF(assignment.filePath, assignment.fileName)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download
                </button>
                <input className='m-4' type="file" onChange={(e) => handleUpload(assignment.id, e.target.files[0])} />
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignmentsLecturer;

// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const ViewAssignmentsLecturer = () => {
//   const [assignments, setAssignments] = useState([]);

//   const fetchAssignments = async () => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch('http://localhost:5000/api/lectures/get_assignments', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch assignments');
//       }

//       const data = await response.json();
//       setAssignments(data ?? []);
//     } catch (error) {
//       console.error('Error fetching assignments:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(`http://localhost:5000/api/lectures/delete_assignment/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete assignment');
//       }

//       fetchAssignments();
//     } catch (error) {
//       console.error('Error deleting assignment:', error);
//     }
//   };

//   const handleDownloadPDF = (filePath, fileName) => {
//     const fileUrl = `http://localhost:5000/${filePath}`; // Adjust the URL if needed
//     const link = document.createElement('a');
//     link.href = fileUrl;
//     link.download = fileName; // Set the custom file name for download
//     link.click();
//   };
  

//   return (
//     <div className="container">
//       <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Title</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {assignments?.map((assignment) => (
//             <tr key={assignment.id}>
//               <td className="px-6 py-4 whitespace-nowrap">{assignment.title}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{assignment.description}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{assignment.deadline}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <button onClick={() => handleDownloadPDF(assignment.filePath, assignment.fileName)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   Download
//                 </button>
//                 <button onClick={() => handleDelete(assignment.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewAssignmentsLecturer;
