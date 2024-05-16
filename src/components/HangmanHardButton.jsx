const HangmanHardButton = ({clickHard, isHard}) => {
  return (
    <>
    <rect x="800" y="60" height="30" width="75" rx="10" stroke="black" fill={isHard ? 'green' : 'none'}/>
    <text x="815" y="80" onClick={clickHard} id="hard" style={{fontFamily: "Calibri", fontSize: "18px"}}>HARD</text>
    </>
  )
}
export default HangmanHardButton