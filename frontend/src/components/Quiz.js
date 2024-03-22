import React, { useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const sampleQuizData = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
      correctAnswer: 'William Shakespeare'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars'
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 'Blue Whale'
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
      correctAnswer: 'Leonardo da Vinci'
    },
    {
      question: 'In which year did World War I begin?',
      options: ['1914', '1917', '1918', '1920'],
      correctAnswer: '1914'
    },
    {
      question: 'What is the chemical symbol for water?',
      options: ['H2O', 'CO2', 'O2', 'N2'],
      correctAnswer: 'H2O'
    },
    {
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'South Korea', 'Vietnam'],
      correctAnswer: 'Japan'
    },
    {
      question: 'Who wrote "To Kill a Mockingbird"?',
      options: ['Harper Lee', 'J.K. Rowling', 'F. Scott Fitzgerald', 'Mark Twain'],
      correctAnswer: 'Harper Lee'
    },
    {
      question: 'What is the currency of Japan?',
      options: ['Yen', 'Euro', 'Dollar', 'Pound'],
      correctAnswer: 'Yen'
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
      correctAnswer: 'Mount Everest'
    },
    {
      question: 'Who was the first man to step on the moon?',
      options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Michael Collins'],
      correctAnswer: 'Neil Armstrong'
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 'Pacific Ocean'
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Pb'],
      correctAnswer: 'Au'
    },
    {
      question: 'Who wrote "The Great Gatsby"?',
      options: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'John Steinbeck', 'Virginia Woolf'],
      correctAnswer: 'F. Scott Fitzgerald'
    },
    {
      question: 'What is the main ingredient in guacamole?',
      options: ['Tomato', 'Onion', 'Avocado', 'Lime'],
      correctAnswer: 'Avocado'
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Antarctic Desert'],
      correctAnswer: 'Antarctic Desert'
    },
    {
      question: 'Who is known as the Father of Computers?',
      options: ['Charles Babbage', 'Alan Turing', 'Tim Berners-Lee', 'Bill Gates'],
      correctAnswer: 'Charles Babbage'
    },
    {
      question: 'What is the chemical symbol for oxygen?',
      options: ['O2', 'H2O', 'CO2', 'N2'],
      correctAnswer: 'O2'
    },
    {
      question: 'Which country is famous for its tulips?',
      options: ['Netherlands', 'France', 'Italy', 'Belgium'],
      correctAnswer: 'Netherlands'
    }
    // Add more quiz questions here...
  ];
  

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([...userAnswers, { question: currentQuestion.question, selectedAnswer }]);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
    }
  };

  const startQuiz = () => {
    setQuestions(sampleQuizData);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
        {questions.length === 0 ? (
          <button onClick={startQuiz} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Start Quiz</button>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Question {currentQuestionIndex + 1}</h2>
            <p className="mb-4">{questions[currentQuestionIndex].question}</p>
            <ul>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} onClick={() => handleAnswerSelect(option)} className="cursor-pointer mb-2 p-2 bg-gray-200 hover:bg-gray-300 rounded">{option}</li>
              ))}
            </ul>
            <p className="mt-4">Score: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
