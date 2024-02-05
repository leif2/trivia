type AnswerResultProps = {
	index: number,
	cssClass: string,
	answer: string,
	question: string
}

const AnswerResult = ({index, cssClass, answer, question}: AnswerResultProps) => {

	const handleOnClick = () => {
		console.log({question});
	}

	return <p key={index} className={cssClass} onClick={handleOnClick}>Q{index + 1}: {answer}</p>;
}

export default AnswerResult;