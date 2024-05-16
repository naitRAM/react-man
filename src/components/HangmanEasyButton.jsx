const HangmanEasyButton = ({clickEasy, isEasy}) => {
    return (
        <>
            <rect x="700" y="60" height="30" width="75" rx="10" stroke="black" fill={isEasy ? 'green' : 'none'} />
            <text x="720" y="80" onClick={clickEasy} id="easy" style={{fontFamily: "Calibri", fontSize: "18px"}}>EASY</text>
        </>
    );
};
export default HangmanEasyButton;