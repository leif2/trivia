import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import useTriviaCategories from "../../hooks/useTriviaCategories";
import { z } from "zod";
import css from "./SetQuestionsForm.module.scss";
import SetQuestionsFormSelect from "./components/SetQuestionsFormSelect";
import SetQuestionsFormInput from "./components/SetQuestionsFormInput";
const difficultyOptions = [
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
const typeOptions = [
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
    amount: z.string().transform(x => (x === "" || Number.isNaN(x)) ? null : Number(x)).pipe(z.number().min(0).max(50)),
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
});
const SetQuestionsForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        amount: "1"
    });
    const [validation, setValidation] = useState([]);
    const { data: categories, isLoading } = useTriviaCategories();
    const formattedCategories = categories?.map(category => ({ label: category.name, value: category.id })) || [];
    const handleSubmit = (e) => {
        e?.preventDefault();
        try {
            const validation = QuestionsFormSchema.parse(form);
            if (validation) {
                onSubmit(form);
            }
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                setValidation(err.issues.map(issue => ({ path: issue?.path, error: issue?.message })));
            }
        }
    };
    return (_jsx("div", { className: css.setQuestionsFormContainer, children: _jsxs("form", { className: css.setQuestionsInnerContainer, onSubmit: handleSubmit, children: [_jsxs("div", { className: css.inputContainer, children: [_jsx("div", { className: css.label, children: "Amount of Questions" }), _jsx("div", { className: css.input, children: _jsx(SetQuestionsFormInput, { value: String(form.amount || ""), onChange: (value) => setForm({ ...form, amount: String(value) }) }) }), validation.find(error => error.path.includes("amount"))
                            ? _jsx("div", { className: css.error, children: "Must have a numeric amount." })
                            : null, _jsx("div", {})] }), _jsxs("div", { className: css.inputContainer, children: [_jsx("div", { className: css.label, children: "Category" }), _jsx("div", { className: css.input, children: _jsx(SetQuestionsFormSelect, { onChange: (value) => setForm({ ...form, category: value?.value || undefined }), value: formattedCategories?.find(option => option.value === form.category) || null, isLoading: isLoading, options: formattedCategories }) })] }), _jsxs("div", { className: css.inputContainer, children: [_jsx("div", { className: css.label, children: "Type" }), _jsx("div", { className: css.input, children: _jsx(SetQuestionsFormSelect, { onChange: (value) => setForm({ ...form, type: value?.value || undefined }), value: typeOptions?.find(option => option.value === form.type) || null, options: typeOptions }) })] }), _jsxs("div", { className: css.inputContainer, children: [_jsx("div", { className: css.label, children: "Difficulty" }), _jsx("div", { className: css.input, children: _jsx(SetQuestionsFormSelect, { onChange: (value) => setForm({ ...form, difficulty: value?.value || undefined }), value: difficultyOptions?.find(option => option.value === form.difficulty) || null, options: difficultyOptions }) })] }), _jsx("button", { type: "submit", children: "Quiz ME!" })] }) }));
};
export default SetQuestionsForm;
