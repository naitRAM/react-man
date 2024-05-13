const HangmanWord = ({ word, row, y, x}) => {
    return (
        <>
            {word.split('').map((letter, i) => {
                let comp = (<text style={{fontWeight: "lighter", fontSize: "50px", fontFamily: "Calibri"}} 
                            key={`${row}${i}`} x={x} y={y + (row * 100)}>{letter}</text>);
                // a fix for spacing issues between text elements with narrow letters
                if (word[i] == "I") {
                    x += 25;
                } else {
                    x += 40;
                }
                return comp;
            })
            }
        </>
    );
};
export default HangmanWord;