import css from "./Main.module.scss"
import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Card from "../../components/Card";
import Results from "../../components/Results";

const Main = () => {
    const { data: questions, isLoading } = useTriviaQuestions(12);

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div>
            <Results />          
        </div>
    )
}

export default Main;