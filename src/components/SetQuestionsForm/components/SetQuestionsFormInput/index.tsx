import css from "./SetQuestionsFormInput.module.scss"

type SetQuestionsFormInputProps = {
    value: string,
    onChange: (value: string | null) => void
};


const SetQuestionsFormInput = ({ value, onChange }: SetQuestionsFormInputProps) => {

    return (
        <div className={css.SetQuestionsFormInputContainer}>
            <input
                className={css.SetQuestionsFormInput}
                type="number"
                value={value}
                onChange={(e) => {
                    const value = e.target.value;
                    onChange(value)
                }}
            />
        </div>
    )
};

export default SetQuestionsFormInput;