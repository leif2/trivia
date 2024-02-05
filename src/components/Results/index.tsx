import { useState } from "react";
import css from "./Results.module.scss";
import { Answer } from "../../pages/Main";
import AnswerResult from "./AnswerResult";

const PASS_PERCENTAGE = 70;

type ResultsProps = {
  correct: number,
  total: number,
  resetQuestions: () => void,
  resetQuiz: () => void,
  answersArray: Answer[],
  questions: string[]
};

const Results = ({ correct = 3, total = 10, resetQuestions, resetQuiz, answersArray, questions }: ResultsProps) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  const constructAnswersList = (): any[] => {
    let answersList: any[] = [];
    answersArray.forEach((answer, index) => {
      answersList.push(
        <AnswerResult
          key={index}
          index={index}
          cssClass={answer.correct ? css.pass : css.error}
          answer={answer.answer}
          question={index ? questions[index] : questions[0]}
        />
      )
    });
    return answersList;
  }

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

  return (
    <div className={css.mainContainer}>
      <div className={css.imageContainer}>
        <img src={quizResultImage} className={css.image} />
      </div>
      <h1 className={css.h1}>{quizResult} {percentage.toFixed(2)}%</h1>

      <div className={css.resultsButtonContainer}>
        <button className={css.button} onClick={toggleModal}>View Quiz Results</button>
      </div>
      <div className={css.newGameButtonContainer}>
        <button className={css.button} onClick={resetQuiz}> Start New Quiz </button>
        <button className={css.button} onClick={resetQuestions}> Retake Quiz</button>
      </div>

      {modal && (
        <div className={css.modal}>
          <div className={css.overlay}>
            <div className={css.modalContent}>
              <h2>Trivia Results</h2>
              {constructAnswersList()}
              <button className={css.closeModalButton} onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results; 