const HangmanWord = ({ word, row, y, x}) => {
    return (
        <>
            {word.split('').map((letter, i) => {
                let comp = (<text style={{fontWeight: "lighter", fontSize: "50px"}} key={`${row}${i}`} x={x} y={y + (row * 100)}>{letter}</text>);
                x += 40;
                return comp;
            })
            }
        </>
    );
};
export default HangmanWord;