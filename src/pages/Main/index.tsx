import React from "react";
import css from "./Main.module.scss"
import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Card from "../../components/Card";

const Main = () => {
    const { data: questions, isLoading } = useTriviaQuestions();

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div>
            {
                questions?.map(question => (
                    <Card question={question} />
                ))
            }
        </div>
    )
}

export default Main;