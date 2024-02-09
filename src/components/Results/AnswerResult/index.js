import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import css from './AnswerResult.module.scss';
const AnswerResult = ({ index, cssClass, answer, question }) => {
    const contentRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [height, setHeight] = useState(modalIsOpen ? undefined : 0);
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const cssClasses = cssClass + " " + css.answerResultContainer;
    useEffect(() => {
        if (modalIsOpen) {
            setHeight(contentRef.current?.getBoundingClientRect().height);
        }
        else {
            setHeight(0);
        }
    }, [modalIsOpen]);
    return (_jsxs("div", { onClick: toggleModal, children: [_jsxs("div", { className: cssClasses, children: ["Question ", index + 1] }), _jsx("div", { className: css.collapsibleContent, style: { height }, children: _jsxs("div", { ref: contentRef, children: [_jsxs("div", { children: [_jsx("b", { children: "Question:" }), " ", question, " "] }), _jsxs("div", { children: [_jsx("b", { children: "Your Answer:" }), " ", answer] })] }, index) })] }));
};
export default AnswerResult;
