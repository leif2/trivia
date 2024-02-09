import { jsx as _jsx } from "react/jsx-runtime";
import Select from 'react-select';
import css from "./SetQuestionsFormSelect.module.scss";
const SetQuestionsFormSelect = ({ options, value, isLoading, onChange }) => {
    return (_jsx("div", { className: css.SetQuestionsFormSelectContainer, children: _jsx(Select, { isLoading: isLoading, options: options, value: value, isClearable: true, onChange: (option) => onChange((option || null)) }) }));
};
export default SetQuestionsFormSelect;
