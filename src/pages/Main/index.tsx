import useTriviaQuestions from "../../hooks/useTriviaQuestions";
import Results from "../../components/Results";
import SetQuestionsForm, { QuestionsForm } from "../../components/SetQuestionsForm";
import { useState } from "react";
import Card from "../../components/Card";

export type Answer = {
    answer: string,
    correct: boolean
}

const Main = () => {
    const [questionParams, setQuestionParams] = useState<QuestionsForm | null>()
    const [answers, setAnswers] = useState<string[]>([]);
    const { data: questions = [], isLoading } = useTriviaQuestions(questionParams || null, !questionParams);

    if (isLoading) {
        return (
            <div>...Loading</div>
        )
    }

    const calculateNumberCorrect = () => {
        let numberCorrect = 0;
        questions?.map((question, index) => {
            if (answers[index] === question.correct_answer) {
                numberCorrect++;
            }
        });
        return numberCorrect;
    }

    const constructAnswersArray = (): Answer[] => {
        let answersArray = [];
        questions?.map((question, index) => {
            const answersObject = {"${answers[index]}": answers[index] === question.correct_answer};
            answersArray.push(answersObject);
        });
        return answersArray;
    };

    const resetQuiz = () => {
        setAnswers([]);
    };

    return (
        <div>
            {questions?.length < 1 &&
                <SetQuestionsForm onSubmit={(form) => setQuestionParams({ ...form })} />
            }
            {questions?.length > 0 && answers.length !== questions.length &&
                <Card question={questions[answers.length]} onSubmit={(answer) => { setAnswers([...answers, answer]) }} />
            }
            {questions?.length > 0 && answers.length === questions.length &&
                <Results
                    correct={calculateNumberCorrect()}
                    total={questions.length}
                    resetQuiz={() => {
                        setQuestionParams(null);
                        setAnswers([]);
                    }}
                    resetQuestions={() => setAnswers([])}
                    answersArray={constructAnswersArray()}
                    />
            }
        </div>
    )
}

export default Main;