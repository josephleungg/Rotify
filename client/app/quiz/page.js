'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import confetti from 'canvas-confetti';

const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if quiz is submitted
  const [isValid, setIsValid] = useState(false); // Track if quiz is valid (e.g., all questions answered)
  const [score,setScore] = useState(null);
  const [quizData,setQuizData] = useState(null);

  useEffect(() => {
    // Parse the query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const data = queryParams.get('data');
    if (data) {
      setQuizData(JSON.parse(decodeURIComponent(data)));
    }
  }, []);
  
//   const testData = {
//     "quizTitle": "Science & Technology Trivia",
//     "questions": [
//       {
//         "questionId": 1,
//         "questionText": "What is the chemical symbol for gold?",
//         "options": [
//           { "optionId": "A", "text": "Ag" },
//           { "optionId": "B", "text": "Au" },
//           { "optionId": "C", "text": "Pb" },
//           { "optionId": "D", "text": "Fe" }
//         ],
//         "correctAnswer": "B"
//       },
//       {
//         "questionId": 2,
//         "questionText": "Who developed the theory of general relativity?",
//         "options": [
//           { "optionId": "A", "text": "Isaac Newton" },
//           { "optionId": "B", "text": "Albert Einstein" },
//           { "optionId": "C", "text": "Nikola Tesla" },
//           { "optionId": "D", "text": "Galileo Galilei" }
//         ],
//         "correctAnswer": "B"
//       },
//       {
//         "questionId": 3,
//         "questionText": "Which planet has the most moons?",
//         "options": [
//           { "optionId": "A", "text": "Saturn" },
//           { "optionId": "B", "text": "Jupiter" },
//           { "optionId": "C", "text": "Neptune" },
//           { "optionId": "D", "text": "Uranus" }
//         ],
//         "correctAnswer": "A"
//       },
//       {
//         "questionId": 4,
//         "questionText": "What is the powerhouse of the cell?",
//         "options": [
//           { "optionId": "A", "text": "Nucleus" },
//           { "optionId": "B", "text": "Mitochondria" },
//           { "optionId": "C", "text": "Ribosome" },
//           { "optionId": "D", "text": "Endoplasmic Reticulum" }
//         ],
//         "correctAnswer": "B"
//       },
//     ],
//   }
  

  // Handle answer selection
  const handleAnswerSelect = (questionId, optionId) => {
    if (!isSubmitted) {
        console.log("selected " + optionId + " for question " + questionId);
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: optionId,
      }));
      const selectedCount = Object.keys(selectedAnswers).length + 1;
      const questionCount = quizData.questions.length;
      if(selectedCount >= questionCount){
        setIsValid(true);
      }
      else{
        setIsValid(false);
      }
    }
  };

  // Handle submit
  const handleSubmit = () => {
    const selectedCount = Object.keys(selectedAnswers).length + 1;
    const questionCount = quizData.questions.length;
    if(selectedCount < questionCount) return;

    let correctCount = 0;
    quizData.questions.forEach((question) => {
      if (selectedAnswers[question.questionId] === question.correctAnswer) {
        correctCount++;
      }
    });

    // Calculate the percentage of correct answers
    const percentage = (correctCount / questionCount) * 100;
    setScore(percentage);
    if(percentage >= 80){
        confetti();
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle try again
  const handleTryAgain = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setIsValid(false);
    setScore(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if the selected answer is correct
  const isAnswerCorrect = (questionId) => {
    const selectedAnswer = selectedAnswers[questionId];
    const correctAnswer = quizData.questions.find(
      (q) => q.questionId === questionId
    )?.correctAnswer;
    return selectedAnswer === correctAnswer;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="bg-[#1A1D2D] w-[1000px] h-fit flex flex-col justify-center rounded-xl px-12 font-roboto pb-20">
        <h1 className="text-center text-white text-5xl py-8 border-b-1 border-white font-jaro">
          {quizData?.quizTitle}
        </h1>
        {quizData?.questions.map((question, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <h2 className="text-white text-xl font-bold">
              {question.questionId}. {question.questionText}
            </h2>
            <div className="flex flex-col ml-12 py-4">
              {question.options.map((option, poo) => {
                const isSelected = selectedAnswers[question.questionId] === option.optionId;
                const isCorrect = isAnswerCorrect(question.questionId);
                const isSubmittedAndCorrect = isSubmitted && isCorrect && isSelected;
                const isSubmittedAndIncorrect = isSubmitted && !isCorrect && isSelected;

                return (
                  <div
                    className={`w-full py-4 border-b border-[#414558] flex items-center gap-8 cursor-pointer px-4 rounded-xl ${
                      isSelected
                        ? isSubmittedAndCorrect
                          ? 'bg-[#5B9F64]'
                          : isSubmittedAndIncorrect
                          ? 'bg-[#B93939]'
                          : 'bg-[#556E9F]'
                        : 'hover:bg-[#3a3f61]'
                    }`}
                    onClick={() => handleAnswerSelect(question.questionId, option.optionId)}
                    key={poo}
                  >
                    <div className={`font-jaro h-12 w-12 text-center rounded-full text-xl text-white flex justify-center items-center
                            ${
                                isSelected
                                ? isSubmittedAndCorrect
                                  ? 'bg-[#3C6341]'
                                  : isSubmittedAndIncorrect
                                  ? 'bg-[#783030]'
                                  : 'bg-[#2D3951]'
                                : 'bg-background'
                            }`}>
                        <h1>{option.optionId}</h1>
                    </div>
                    <p className="text-white text-lg font-light">{option.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center flex-col">
            {(score || score == 0) && <h1 className={`font-jaro text-3xl ${score >= 60 ? 'text-green-600' : 'text-red-600'}`}>{score}%</h1>}
          <div
            className={`py-2 px-8 flex flex-col justify-center items-center rounded-lg ${
              isValid
                ? 'bg-[#685680] cursor-pointer hover:opacity-80 transition-all text-[#B1A6C0]'
                : 'border border-1 border-[#685680] text-textGray text-opacity-50'
            }`}
            onClick={isSubmitted ? handleTryAgain : handleSubmit}
          >
            <h1 className="font-jaro text-3xl">
              {isSubmitted ? 'Try Again' : 'Submit'}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;