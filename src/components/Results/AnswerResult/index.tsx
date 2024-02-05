import { useState } from 'react';
import css from './AnswerResult.module.scss'

type AnswerResultProps = {
	index: number,
	cssClass: string,
	answer: string,
	question: string
}

const AnswerResult = ({index, cssClass, answer, question}: AnswerResultProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	let cssClasses = cssClass + " " + css.answerResultContainer;

	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen);
	}

	return (
		<div onClick={toggleModal}>
			<div className={cssClasses}>Question {index + 1}</div>
				<div key={index} className={modalIsOpen ? css.questionInformation : css.questionInformationSquished}>
					<div>Question: {question} </div>
					<div>Your Answer: {answer}</div>
				</div>
		</div>
	);
}

export default AnswerResult;