import { useState, useEffect } from "react";
import { Question } from "../../hooks/useTriviaQuestions";
import css from "./Card.module.scss";

type CardProps = {
    question: Question,
    isLastQuestion: boolean,
    onSubmit: (answer: string) => void
};

const randomizedAnswers = ({ correct_answer, incorrect_answers, type }: { correct_answer: string, incorrect_answers: string[], type: string }) => {
    if (type === "multiple") {
        let answersArray = Array.from(incorrect_answers);
        answersArray.push(correct_answer);
        return answersArray.sort(() => Math.random() - 0.5);
    }
    return ["True", "False"];
};

const Card = ({ question, isLastQuestion, onSubmit }: CardProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>();
    const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
    const isAnswerCorrect = selectedAnswer === question?.correct_answer;

    useEffect(() => {
        setAnswers(randomizedAnswers(question));
        setIsAnswerSelected(false);
    }, [question]);

    const handleOnClick = (answer: string) => {
        setSelectedAnswer(answer);
        setIsAnswerSelected(true);
    }

    const buttonText = isLastQuestion ? "Finish Quiz" : "Next";

    return <div className={css.cardContainer}>
        <div className={css.questionContainer}>
            {question.question}
        </div>
        <>
            {answers?.map((answer, index) => {
                const classes = [css.answerContainer];
                if (answer === selectedAnswer) {
                    isAnswerCorrect ? classes.push(css.correctAnswer) : classes.push(css.incorrectAnswer);
                }
                if (isAnswerSelected) {
                    classes.push(css.answerIsSelected);
                }
                return <div key={index} className={css.padding}>
                    <button
                        key={index}
                        className={classes.join(" ")}
                        onClick={() => { handleOnClick(answer) }}
                    >
                        {answer}
                    </button>
                </div>;
            }
            )
            }
        </>
        <button
            className={css.nextButton}
            hidden={!isAnswerSelected}
            onClick={() => { onSubmit(selectedAnswer) }}
        >
            {buttonText}
        </button>
    </div>
}

export default Card;