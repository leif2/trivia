import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import css from "./Results.module.scss";
import AnswerResult from "./AnswerResult";
const PASS_PERCENTAGE = 70;
const Results = ({ correct = 3, total = 10, resetQuestions, resetQuiz, answersArray, questions }) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    const constructAnswersList = () => {
        let answersList = [];
        answersArray.forEach((answer, index) => {
            answersList.push(_jsx(AnswerResult, { index: index, cssClass: answer.correct ? css.pass : css.error, answer: answer.answer, question: index ? questions[index] : questions[0] }, index));
        });
        return answersList;
    };
    let percentage = (correct / total * 100);
    let quizResult = "";
    let quizResultImage = "failremovebg.png";
    if (percentage >= PASS_PERCENTAGE) {
        quizResult = "Congrats, You Passed!";
        quizResultImage = "passremovebg.png";
    }
    else {
        quizResult = "You did not pass, try again";
    }
    return (_jsxs("div", { className: css.mainContainer, children: [_jsx("div", { className: css.imageContainer, children: _jsx("img", { src: quizResultImage, className: css.image }) }), _jsxs("h1", { className: css.h1, children: [quizResult, " ", percentage.toFixed(2), "%"] }), _jsx("div", { className: css.resultsButtonContainer, children: _jsx("button", { className: css.button, onClick: toggleModal, children: "View Quiz Results" }) }), _jsxs("div", { className: css.newGameButtonContainer, children: [_jsx("button", { className: css.button, onClick: resetQuiz, children: " Start New Quiz " }), _jsx("button", { className: css.button, onClick: resetQuestions, children: " Retake Quiz" })] }), modal && (_jsx("div", { className: css.modal, children: _jsx("div", { className: css.overlay, children: _jsxs("div", { className: css.modalContent, children: [_jsx("h2", { children: "Trivia Results" }), constructAnswersList(), _jsx("button", { className: css.closeModalButton, onClick: toggleModal, children: "Close" })] }) }) }))] }));
};
export default Results;
