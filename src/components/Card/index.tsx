import React from "react";
import { Question } from "../../hooks/useTriviaQuestions";

type CardProps = {
    question: Question,
    name?: string
}

const Card = ({question, name = "Stuff"}: CardProps) => {

    return <div>
        {question.question}
        {name}
    </div>
}

export default Card;