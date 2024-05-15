const HangmanEasyButton = ({clickEasy}) => {
    return (
        <>
            <rect x="700" y="60" height="30" width="75" rx="10" stroke="black" fill="none" />
            <text x="715" y="80" onClick={clickEasy} id="easy">EASY</text>
        </>
    );
};
export default HangmanEasyButton;