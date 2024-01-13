import css from "./Main.module.scss"
import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Results from "../../components/Results";
import SetQuestionsForm, { QuestionsForm } from "../../components/SetQuestionsForm";
import { useState } from "react";

const Main = () => {
    const [questionParams, setQuestionParams] = useState<QuestionsForm | null>()
    const [answers, setAnswers] = useState<string[]>(["a", "b", "c"]);
    const { data: questions = [], isLoading } = useTriviaQuestions(questionParams || null, !questionParams);

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }

    return (
        <div>
            {   questions?.length < 1 && 
                <SetQuestionsForm onSubmit={(form) => setQuestionParams({...form})} />
            }
            { questions?.length > 0 && answers.length < questions.length &&
                JSON.stringify(questions)
            }
            { questions?.length > 0 && answers.length === questions.length &&
                <Results correct={0} total={questions.length} />
            }
        </div>
    )
}

export default Main;