type AnswerResultProps = {
	index: number,
	cssClass: string,
	answer: string,
	onClick: () => void
}

const AnswerResult = ({index, cssClass, answer, onClick}: AnswerResultProps) => {
	return <p key={index} className={cssClass} onClick={onClick}>Q{index + 1}: {answer}</p>;
}

export default AnswerResult;