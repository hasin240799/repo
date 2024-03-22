import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

const CreateQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create quiz object with question, options, and correct answer
    const quiz = {
      question,
      options,
      correctAnswer: correctAnswerIndex
    };
  
    const token = Cookies.get('token'); // Retrieve token from cookie
    try {
      const response = await fetch('http://localhost:5000/api/lectures/create_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quiz)
      });

      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      console.log('Quiz created successfully');
      // Reset form fields
      setQuestion('');
      setOptions(['', '']);
      setCorrectAnswerIndex(0);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="mr-2 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === index}
                  onChange={() => handleCorrectAnswerChange(index)}
                  className="ml-2"
                />
              </div>
            ))}
            <button type="button" onClick={addOption} className="text-blue-500 hover:text-blue-700">Add Option</button>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
