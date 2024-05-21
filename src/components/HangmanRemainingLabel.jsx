const HangmanRemainingLabel = ({misses, isEasy}) => {
  return (
    <>
    <text x="450" y="75">Misses: {`${misses}/${isEasy ? 10 : 7}`}</text>
    </>
  )
}
export default HangmanRemainingLabel