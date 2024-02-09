import Select, { SingleValue } from 'react-select';
import css from "./SetQuestionsFormSelect.module.scss"

type SetQuestionsFormSelectProps<T> = {
    options: Option<T>[],
    value: Option<T> | T | null,
    isLoading?: boolean,
    onChange: (value: Option<T> | null) => void
};

export type Option<T> = {
    label: string,
    value: T
};

const SetQuestionsFormSelect = <T,>({options, value, isLoading, onChange}: SetQuestionsFormSelectProps<T>) => {

    return (
        <div className={css.SetQuestionsFormSelectContainer}>
            <Select
                isLoading={isLoading}
                options={options}
                value={value}
                isClearable
                onChange={(option: SingleValue<T | Option<T>>) => onChange((option || null) as Option<T> | null)}
            />
        </div>
    )
};

export default SetQuestionsFormSelect;