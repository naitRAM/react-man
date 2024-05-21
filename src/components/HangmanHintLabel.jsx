
import HangmanHintButton from './HangmanHintButton';
const HangmanHintLabel = ({ hint, alreadyShown, setAlreadyShown }) => {
 
    return (
        <>
            {alreadyShown ? <text x="450" y="145">Hint: {hint} </text> : <HangmanHintButton setAlreadyShown={setAlreadyShown}/>}
        </>
    );
};
export default HangmanHintLabel;