const HangmanHintButton = ({setAlreadyShown}) => {
    const showHint = (e) => {
        setAlreadyShown(true);
    }
    return (
        <>
            <rect x="450" y="125" height="30" width="120" fill="none" stroke="black" rx="10"  />
            <text x="460" y="145" onClick={showHint}>Show Hint</text>
        </>
    );
}
export default HangmanHintButton