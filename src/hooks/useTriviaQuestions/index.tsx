
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

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

const useTriviaQuestions = () => {
    return useQuery({
        queryKey: ["trivia-questions"],
        queryFn: async ()=> {
            const response = await axios.get("https://opentdb.com/api.php?amount=10")
            console.log(response)
            return resultSchema.parse(response?.data)?.results;
        },
        staleTime: 60*1000*5,
    });
};

export default useTriviaQuestions;