
import HangmanCategoryButton from './HangmanCategoryButton';
const HangmanCategoryLabel = ({category, alreadyShown, setAlreadyShown}) => {

  return (
    <>
    {alreadyShown ? <text x="450" y="110">Category: {category} </text> : <HangmanCategoryButton setAlreadyShown={setAlreadyShown} />}
    </>
  )
}
export default HangmanCategoryLabel