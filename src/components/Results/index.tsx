import React from "react";
import css from "./Results.module.scss"

type ResultsProps = {
    correct: number, 
    total: number
}; 


const Results = ({correct = 4, total = 10} :ResultsProps) => {

    let percentage = (correct/total * 100); 
    let pass = ""; 
    if(percentage >= 70){
        pass = "Congrats, You Passed!"; 
    }
    else{
        pass = "You did not pass, try again"; 
    }
    
    return (
        <div className={css.mainContainer}> 
            <h1 className={css.h1}>{pass} {percentage}%</h1>
            <div className={css.newGameButtonContainer}>
                <button className={css.button}> New Game </button>
                <button className={css.button}> Try Again</button>
            </div>
            <div className={css.resultsButtonContainer}>
                <button className={css.button}>View Results</button>
            </div>
        
        </div>
    )
}

export default Results; 