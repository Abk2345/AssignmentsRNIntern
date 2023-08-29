// QuestionScreen.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CustomButton from './CustomButton';
const QuestionScreen = ({ question, options, onNextQuestion, onSelectOption }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        onSelectOption(option);
    };

    const handleSubmit = () => {
        onNextQuestion(selectedOption);
    };

    return (
        <View>
            <Text>{question}</Text>
            {options.map((option) => (
                <CustomButton
                    key={option}
                    title={option}
                    type="options"
                    onPress={() => onSelectOption(option)}
                    selected={selectedOption === option}
                />
            ))}
            <CustomButton
                title="Submit"
                onPress={onNextQuestion}
                selected={false}
                type="submit"
                 />
        </View>
    );
};

export default QuestionScreen;
