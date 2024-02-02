
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { QuestionsForm } from "../../components/SetQuestionsForm";

const questionsSchema = z.object({
    category: z.string(),
    correct_answer: z.string(),
    difficulty: z.string(),
    incorrect_answers: z.array(z.string()),
    question: z.string(),
    type: z.string()
});

export type Question = z.infer<typeof questionsSchema>

const resultSchema = z.object({
    response_code: z.number(),
    results: z.array(questionsSchema)
})

const convert = (string: string) => {
    return string.replace(/&#(?:x([\da-f]+)|(\d+));/ig, function (_, hex, dec) {
      return String.fromCharCode(dec || +('0x' + hex))
    })
  }

const useTriviaQuestions = (questionParam: QuestionsForm | null, disabled = false) => {
    console.log(disabled)
    return useQuery({
        queryKey: ["trivia-questions", JSON.stringify(questionParam)],
        queryFn: async ()=> {
            console.log("GET Q's")
            let url = `https://opentdb.com/api.php?amount=${questionParam?.amount}`;

            if (questionParam?.category) {
                url += `&category=${questionParam?.category || 10}`
            }

            if (questionParam?.type) {
                url += `&type=${questionParam?.type}`
            }

            if (questionParam?.difficulty) {
                url += `&difficulty=${questionParam?.difficulty}`
            }

            const response = await axios.get(url)
            let questions = resultSchema.parse(response?.data)?.results;
            return questions.map(questionData => ({...questionData, question: convert(questionData.question)}));
        },
        staleTime: 60*1000*5,
        enabled: !disabled
    });
};

export default useTriviaQuestions;