// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionScreen from './QuestionScreen';
import { StatusBar } from 'expo-status-bar';
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'London', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'What is the capital of India?',
    options: ['Kolkata', 'Mumbai', 'New Delhi', 'Patna'],
    correctAnswer: 'New Delhi',
  }
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Time's up, move to the next question or show results
      moveToNextQuestion();
    }
  }, [timeRemaining]);

  // for header for the app
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Quiz App</Text>
    </View>
  )
}

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(10); // Reset timer for the next question
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const userScore = questions.reduce((acc, question, index) => {
      if (question.selectedOption === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(userScore);
    setQuizOver(true);
  };

  const handleOptionSelect = (option) => {
    // Update selected option for the current question
    questions[currentQuestionIndex].selectedOption = option;
  };

  return (
    <View>
      <StatusBar backgroundColor='#333' style='light-content' />
      <Header />
      {quizOver ? (
        <View style={{justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Quiz Over!</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>Your Score: {score}/{questions.length}</Text>
        </View>
      ) : (
        <View>
          <Text>Time Remaining: {timeRemaining}</Text>
          <QuestionScreen
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onNextQuestion={moveToNextQuestion}
            onSelectOption={handleOptionSelect}
          />
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', // Divide by 3 for 3 photos in a row
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  modalImage: {
    width: '80%',
    height: '70%',
  },
  header: {
    marginTop: 33, //height of status bar
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  }
});
