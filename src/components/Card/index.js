import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import css from "./Card.module.scss";
const randomizedAnswers = ({ correct_answer, incorrect_answers, type }) => {
    if (type === "multiple") {
        let answersArray = Array.from(incorrect_answers);
        answersArray.push(correct_answer);
        return answersArray.sort(() => Math.random() - 0.5);
    }
    return ["True", "False"];
};
const Card = ({ question, isLastQuestion, onSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answers, setAnswers] = useState();
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const isAnswerCorrect = selectedAnswer === question?.correct_answer;
    useEffect(() => {
        setAnswers(randomizedAnswers(question));
        setIsAnswerSelected(false);
    }, [question]);
    const handleOnClick = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswerSelected(true);
    };
    const buttonText = isLastQuestion ? "Finish Quiz" : "Next";
    return _jsxs("div", { className: css.cardContainer, children: [_jsx("div", { className: css.questionContainer, children: question.question }), _jsx(_Fragment, { children: answers?.map((answer, index) => {
                    const classes = [css.answerContainer];
                    if (answer === selectedAnswer) {
                        isAnswerCorrect ? classes.push(css.correctAnswer) : classes.push(css.incorrectAnswer);
                    }
                    if (isAnswerSelected) {
                        classes.push(css.answerIsSelected);
                    }
                    return _jsx("div", { className: css.padding, children: _jsx("button", { className: classes.join(" "), onClick: () => { handleOnClick(answer); }, children: answer }, index) }, index);
                }) }), _jsx("button", { className: css.nextButton, hidden: !isAnswerSelected, onClick: () => { onSubmit(selectedAnswer); }, children: buttonText })] });
};
export default Card;
