import React, {useState} from "react";
import css from "./Results.module.scss"; 

type ResultsProps = {
    correct: number, 
    total: number
}; 

const Results = ({correct = 3, total = 10} :ResultsProps) => {
  //TODOs: line 29, 41, and handling the parameters passed in. 

  //create a modal state and declare it false that way modal does not show open on arrival 
    const [modal, setModal] = useState(false); 

    //method to be called when onclick of view results, this will change the setModal. If it's true it'll display Modal. 
    const toggleModal = () => {
        setModal(!modal); 
    }

    //navigate to the beginning page 
    //TODO: insert info to navigate to the new page. 
    function navigateAway(page: number) {
      if (page === 1) {
        console.log("Navigating to a new page"); 
      } else {
        console.log("Navigate to Question 1"); 
      }
    }

    //this creates an array and stores the users answers to display if they click "view results".
    //TODO: take in the users answers and update the foreach method. 
    let answers = ["Yes", "No", "No", "No", "Yes", "Yes", "Yes", "No", "No", "Yes"];    
    let answersList = []; 

    //this takes each answer and pushes them into another aray with the correct wording to display to the user. 
    //TODO: fix the if state depending on how API handles correct answer vs incorrect answer.
    answers.forEach((answer, index) => {
      if (index % 2 === 0) {
        answersList.push(<p className={css.pass} key={index}>Q{index+1}: {answer}</p>);
      } else {
        answersList.push(<p className={css.error} key={index}>Q{index+1}: {answer}</p>);

      }
    });

    //create the percentage of correct answers 
    let percentage = (correct/total * 100); 
    //declare the variable to display if they passed/failed 
    let pass = ""; 
    //set default image to fail
    let pfImage = "failremovebg.png"; 
    //check if percentage is above 70%, if so set the pass and image to correct items. 
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
          <h1 className={css.h1}>{pass} {percentage}%</h1>
      
          <div className={css.resultsButtonContainer}>
            <button className={css.button} onClick={toggleModal}>View Quiz Results</button>
          </div>
          <div className={css.newGameButtonContainer}>
            <button className={css.button} onClick={(e) => navigateAway(1)}> Start New Quiz </button>
            <button className={css.button} onClick={(e) => navigateAway(2)}> Retake Quiz</button>
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