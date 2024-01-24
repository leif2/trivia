import { useState } from "react";
import useTriviaCategories from "../../hooks/useTriviaCategories";
import { z } from "zod";
import css from "./SetQuestionsForm.module.scss"
import SetQuestionsFormSelect, { Option } from "./components/SetQuestionsFormSelect";
import SetQuestionsFormInput from "./components/SetQuestionsFormInput";

//TODO ADD ERRORS TO FORM INPUTS, 
//validation is already done with zod

const difficultyOptions: Option<string>[] = [
    {
        label: "Easy",
        value: "easy"
    },
    {
        label: "Medium",
        value: "medium"
    },
    {
        label: "Hard",
        value: "hard"
    },
];

const typeOptions: Option<string>[] = [
    {
        label: "Multiple Choice",
        value: "multiple"
    },
    {
        label: "True/False",
        value: "boolean"
    },
];

const QuestionsFormSchema = z.object({
    amount: z.string().transform(
        x => (x === "" || Number.isNaN(x)) ? null : Number(x)
        ).pipe(z.number().min(0).max(50)),
    category: z.number().optional(),
    difficulty: z.union([
        z.literal("easy"),
        z.literal("medium"),
        z.literal("hard")
    ]).optional(),
    type: z.union([
        z.literal("boolean"),
        z.literal("multiple")
    ]).optional()
})

export type QuestionsForm = {
    amount?: string | number;
    category?: number;
    difficulty?: string;
    type?: string;
}

type SetQuestionsFormProps = {
    onSubmit: (form: QuestionsForm) => void
}

const SetQuestionsForm = ({onSubmit}: SetQuestionsFormProps) => {
    const [form, setForm] = useState<QuestionsForm>({
        amount: "1"
    });
    const { data: categories, isLoading } = useTriviaCategories();

    const formattedCategories: Option<number>[] = categories?.map(category => ({label: category.name, value: category.id})) || [];

    const handleSubmit = (e: any) => {
        e?.preventDefault();
        try {
            const validation = QuestionsFormSchema.parse(form);

            if (validation) {
                onSubmit(form);
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues.map(issue => ({ path: issue?.path, error: issue?.message})));
            }
        }
    }
    
    return (
        <div className={css.setQuestionsFormContainer}>
            <form className={css.setQuestionsInnerContainer} onSubmit={handleSubmit}>
                <div className={css.inputContainer}>
                    <div className={css.label}>
                        Amount of Questions
                    </div>
                    <div className={css.input}>
                        <SetQuestionsFormInput value={String(form.amount || "")} onChange={(value) => setForm({...form, amount: String(value)})}
                        />
                    </div>
                </div>
                <div className={css.inputContainer}>
                    <div className={css.label}>
                        Category
                    </div>
                    <div className={css.input}>
                        <SetQuestionsFormSelect
                            onChange={(value: Option<number> | null) => setForm({...form, category: value?.value || undefined})}
                            value={formattedCategories?.find(option => option.value === form.category) || null}
                            isLoading={isLoading}
                            options={formattedCategories}
                        />
                    </div>
                </div>
                <div className={css.inputContainer}>
                    <div className={css.label}>
                        Type
                    </div>
                    <div className={css.input}>
                        <SetQuestionsFormSelect
                            onChange={(value: Option<string> | null) => setForm({...form, type: value?.value || undefined})}
                            value={typeOptions?.find(option => option.value === form.type) || null}
                            options={typeOptions}
                        />
                    </div>
                </div>
                <div className={css.inputContainer}>
                    <div className={css.label}>
                        Difficulty
                    </div>
                    <div className={css.input}>
                        <SetQuestionsFormSelect
                            onChange={(value: Option<string> | null) => setForm({...form, difficulty: value?.value || undefined})}
                            value={difficultyOptions?.find(option => option.value === form.difficulty) || null}
                            options={difficultyOptions}
                            />
                    </div>
                </div>
                <button type="submit">Quiz ME!</button>
            </form>
        </div>
    )
};

export default SetQuestionsForm;