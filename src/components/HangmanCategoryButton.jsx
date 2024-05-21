const HangmanCategoryButton = ({ setAlreadyShown }) => {
    const showCategory = (e) => {
        setAlreadyShown(true);
    }
    return (
        <>
            <rect x="450" y="90" height="30" width="120" fill="none" stroke="black" rx="10"  />
            <text x="460" y="110" onClick={showCategory}>Show Category</text>
        </>
    );
};
export default HangmanCategoryButton;