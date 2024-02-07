import { useEffect, useRef, useState } from 'react';
import css from './AnswerResult.module.scss'

type AnswerResultProps = {
	index: number,
	cssClass: string,
	answer: string,
	question: string
}

const AnswerResult = ({index, cssClass, answer, question}: AnswerResultProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [height, setHeight] = useState<number | undefined>(
		modalIsOpen ? undefined : 0
	);
	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen);
	}

	const cssClasses = cssClass + " " + css.answerResultContainer;

	useEffect(() => {
		if (modalIsOpen) {
			setHeight(contentRef.current?.getBoundingClientRect().height);
		} else {
			setHeight(0);
		}
	}, [modalIsOpen]);

	return (
		<div onClick={toggleModal}>
			<div className={cssClasses}>Question {index + 1}</div>
			<div className={css.collapsibleContent} style={{height}}>
				<div ref={contentRef} key={index}>
					<div><b>Question:</b> {question} </div>
					<div><b>Your Answer:</b> {answer}</div>
				</div>
				</div>
		</div>
	);
}

export default AnswerResult;