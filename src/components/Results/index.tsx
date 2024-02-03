import React, {useState} from "react";
import css from "./Results.module.scss"; 
import { Answer } from "../../pages/Main";

type ResultsProps = {
    correct: number, 
    total: number,
    resetQuestions: () => void,
    resetQuiz: () => void,
    answersArray: Answer[]
}; 

const Results = ({correct = 3, total = 10, resetQuestions, resetQuiz, answersArray} :ResultsProps) => {
    const [modal, setModal] = useState(false); 

    const toggleModal = () => {
        setModal(!modal); 
    }

    let answersList = [];
    answersArray.forEach((answer, index) => {
      if (answer.correct) {
        answersList.push(<p className={css.pass} key={index}>Q{index+1}: {answer.answer}</p>);
      } else {
        answersList.push(<p className={css.error} key={index}>Q{index+1}: {answer.answer}</p>);
      }
    });

    let percentage = (correct/total * 100); 
    let pass = ""; 
    let pfImage = "failremovebg.png"; 
    if (percentage >= 70) {
        pass = "Congrats, You Passed!"; 
        pfImage = "passremovebg.png"; 
    }
    else {
        pass = "You did not pass, try again"; 
    }
    
    return (
        <div className={css.mainContainer}>
          <div className={css.imageContainer}>
            <img src={pfImage} className={css.image} />
          </div>
          <h1 className={css.h1}>{pass} {percentage.toFixed(2)}%</h1>
      
          <div className={css.resultsButtonContainer}>
            <button className={css.button} onClick={toggleModal}>View Quiz Results</button>
          </div>
          <div className={css.newGameButtonContainer}>
            <button className={css.button} onClick={resetQuiz}> Start New Quiz </button>
            <button className={css.button} onClick={resetQuestions}> Retake Quiz</button>
          </div>
      
          {modal && (
            <div className={css.modal}>
              <div onClick={toggleModal} className={css.overlay}>
                <div className={css.modalContent}>
                    <h2>Trivia Results</h2>
                    {answersList}
                  <button className={css.closeModalButton} onClick={toggleModal}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Results; 