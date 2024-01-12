import React, {useState} from "react";
import css from "./Results.module.scss"; 




type ResultsProps = {
    correct: number, 
    total: number
}; 


const Results = ({correct = 3, total = 10} :ResultsProps) => {

    const [modal, setModal] = useState(false); 

    const toggleModal = () => {
        setModal(!modal); 
    }
    let answers = ["Yes", "No", "No", "No", "Yes", "Yes", "Yes", "No", "No", "Yes"];    
    let answersList = []; 

    answers.forEach((answer, index) =>{
        answersList.push(<p key={index}>Q{index+1}: {answer}</p>); 
    })
    let percentage = (correct/total * 100); 
    let pass = ""; 
    let pfImage = "failremovebg.png"; 
    if(percentage >= 70){
        pass = "Congrats, You Passed!"; 
        pfImage = "passremovebg.png"; 
    }
    else{
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
            <button className={css.button}> New Quiz </button>
            <button className={css.button}> Try Quiz Again</button>
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