import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Results from "../../components/Results";
import SetQuestionsForm, { QuestionsForm } from "../../components/SetQuestionsForm";
import { useState } from "react";
import Card from "../../components/Card";

const Main = () => {
    const [questionParams, setQuestionParams] = useState<QuestionsForm | null>()
    const [answers, setAnswers] = useState<string[]>([]);
    const { data: questions = [], isLoading } = useTriviaQuestions(questionParams || null, !questionParams);

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }

    const calculateScore = () => {
        let numberCorrect = 0;
        questions?.map((question, index) => {
            if (answers[index] === question.correct_answer) {
                numberCorrect++;
            }
        });
        return numberCorrect;
    }

    const handleAnswerQuestion = () => {
        
    }

    return (
        <div>
            {   questions?.length < 1 && 
                <SetQuestionsForm onSubmit={(form) => setQuestionParams({...form})} />
            }
            { questions?.length > 0 &&
                <Card question={questions[answers.length]} onSubmit={(answer) => {setAnswers([...answers, answer])}}/>
            }
            { questions?.length > 0 && answers.length === questions.length &&
                <Results correct={calculateScore()} total={questions.length} />
            }
        </div>
    )
}

export default Main;