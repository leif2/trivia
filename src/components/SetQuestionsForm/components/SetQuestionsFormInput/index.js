import { jsx as _jsx } from "react/jsx-runtime";
import css from "./SetQuestionsFormInput.module.scss";
const SetQuestionsFormInput = ({ value, onChange }) => {
    return (_jsx("div", { className: css.SetQuestionsFormInputContainer, children: _jsx("input", { className: css.SetQuestionsFormInput, type: "number", value: value, onChange: (e) => {
                const value = e.target.value;
                onChange(value);
            } }) }));
};
export default SetQuestionsFormInput;
