
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const categorySchema = z.object({
    id: z.number(),
    name: z.string()
});

export type Category = z.infer<typeof categorySchema>

const resultSchema = z.object({
    trivia_categories: z.array(categorySchema)
})

const useTriviaCategories = () => {
    return useQuery({
        queryKey: ["trivia-categories"],
        queryFn: async ()=> {
            const response = await axios.get(`https://opentdb.com/api_category.php`)
            return resultSchema.parse(response?.data)?.trivia_categories;
        },
        staleTime: 60*1000*5*100,
    });
};

export default useTriviaCategories;