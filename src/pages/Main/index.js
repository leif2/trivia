import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Results from "../../components/Results";
import SetQuestionsForm from "../../components/SetQuestionsForm";
import { useState } from "react";
import Card from "../../components/Card";
const Main = () => {
    const [questionParams, setQuestionParams] = useState();
    const [answers, setAnswers] = useState([]);
    const { data: questions = [], isLoading } = useTriviaQuestions(questionParams || null, !questionParams);
    if (isLoading) {
        return (_jsx("div", { children: "...Loading" }));
    }
    const calculateNumberCorrect = () => {
        let numberCorrect = 0;
        questions?.map((question, index) => {
            if (answers[index] === question.correct_answer) {
                numberCorrect++;
            }
        });
        return numberCorrect;
    };
    const constructAnswersArray = () => {
        let answersArray = [];
        questions?.map((question, index) => {
            const answersObject = { answer: answers[index], correct: answers[index] === question.correct_answer };
            answersArray.push(answersObject);
        });
        return answersArray;
    };
    const quizHasNotStarted = questions?.length < 1;
    const quizIsInProgress = questions?.length > 0 && answers.length !== questions.length;
    const quizIsComplete = questions?.length > 0 && answers.length === questions.length;
    return (_jsxs("div", { children: [quizHasNotStarted &&
                _jsx(SetQuestionsForm, { onSubmit: (form) => setQuestionParams({ ...form }) }), quizIsInProgress &&
                _jsx(Card, { question: questions[answers.length], isLastQuestion: answers.length === questions.length - 1, onSubmit: (answer) => { setAnswers([...answers, answer]); } }, answers.length), quizIsComplete &&
                _jsx(Results, { correct: calculateNumberCorrect(), total: questions.length, resetQuiz: () => {
                        setQuestionParams(null);
                        setAnswers([]);
                    }, resetQuestions: () => setAnswers([]), answersArray: constructAnswersArray(), questions: questions.map(question => question.question) })] }));
};
export default Main;
