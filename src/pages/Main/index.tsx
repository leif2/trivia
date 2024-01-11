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
            <div className={css.mainContainer}>
                {
                    questions?.map(question => (
                        <div className={`${css.something} ${css.subContainer} `}><Card question={question} /></div>
                    ))
                }
            </div>
            <div>
            {
                    questions?.map(question => (
                        <div className={css.subContainer}><Card question={question} /></div>
                    ))
                }
            </div>
        </div>
    )
}

export default Main;