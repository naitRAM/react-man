import { useState, useEffect } from 'react';
import HangmanWord from './HangmanWord';
import HangmanGallows from './HangmanGallows';
import HangmanHead from './HangmanHead';
import HangmanBody from './HangmanBody';
import HangmanRightArm from './HangmanRightArm';
import HangmanLeftArm from './HangmanLeftArm';
import HangmanRightLeg from './HangmanRightLeg';
import HangmanLeftLeg from './HangmanLeftLeg';
import HangmanRightEye from './HangmanRightEye';
import HangmanLeftEye from './HangmanLeftEye';
import HangmanFrown from './HangmanFrown';
import HangmanRemainingLabel from './HangmanRemainingLabel';
import HangmanCategoryLabel from './HangmanCategoryLabel';
import HangmanHintLabel from './HangmanHintLabel';
import HangmanInput from './HangmanInput';
import HangmanEasyButton from './HangmanEasyButton';
import HangmanHardButton from './HangmanHardButton';


const HangmanTemplate = () => {
    const [phrase, setPhrase] = useState('');
    const [guessed, setGuessed] = useState([]);
    const [guessedColors, setGuessedColors] = useState([]);
    const [category, setCategory] = useState('');
    const [hint, setHint] = useState('');
    const [isEasy, setIsEasy] = useState(true);
    const [isWin, setIsWin] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [xLimit, setXLimit] = useState(0);
    const [keyStatus, setKeyStatus] = useState({});
    const [answerShown, setAnswerShown] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryShown, setCategoryShown] = useState(false);
    const [hintShown, setHintShown] = useState(false);
    const initialX = 450;
    const initialY = 250;
    const letters = 'qwertyuiopasdfghjklzxcvbnm';
    let keyObj = {};
    letters.split('').forEach((letter) => {
        keyObj[letter] = { 'disabled': false, 'color': 'none' };
    });
    
    useEffect(()=> {
        newGame();
    }, []);

    const deselectKeys = (keyboardObj) => {
        for (let obj in keyboardObj) {
            if (keyboardObj[obj]['color'] == 'yellow') {
                keyboardObj[obj]['color'] = 'none';
            }
        }
    }

    // handler for letter selection
    const selectLetter = (e) => {
        if (!remaining || isWin) {
            return;
        }
        const letter = e.target.id;
        // already-played letters
        if (keyStatus[letter]['disabled']) {
            return;
        }
        // selected key will be highlighted yellow 
        const newStatus = { 'disabled': false, 'color': 'yellow' };
        // new keyboard status
        const newObj = { ...keyStatus };
        // deselect any other selected key
        deselectKeys(newObj);
        // set new status for selected key
        newObj[letter] = newStatus;
        // set state for whole keyboard
        setKeyStatus(newObj);
    };

    const getSelectedLetter = () => {
        // only one key can be yellow at a time, indicating it is valid and selected
        let letter;
        for (let obj in keyStatus) {
            if (keyStatus[obj]['color'] == 'yellow') {
                letter = obj;
                break;
            }
        }
        return letter;
    }

    const updateGuess = (letter) => {
        // update guess state so that guessed letters are revealed in the phrase
        const oldGuess = guessed;
        //need to keep unguessed letters masked
        const words = phrase.split(' ');
        const newGuess = words.map((word) => '_'.repeat(word.length));
        
        let gameWon = true;
        newGuess.forEach((word, index) => {
            let newWord = '';
            for (let i = 0; i < word.length; i++) {
                if (words[index][i] == letter) {
                    //reveal newly guessed letter
                    newWord += letter;
                } else if (oldGuess[index][i] != '_') {
                    //reveal previously guessed letters
                    newWord += oldGuess[index][i];
                } else {
                    // mask unguessed letters
                    newWord += '_';
                    // if newGuess contains underscores, game will not be won
                    // function will return this value to set isWin to true in play()
                    gameWon = false;
                }
            }
            // guessed state is passed to view where letters are displayed in uppercase
            newGuess[index] = newWord.toUpperCase();
        });
        setGuessed(newGuess);
        return gameWon;
    }

    const play = (e) => {
        const letter = getSelectedLetter();
        // in case no key was selected
        if (!letter) {
            return;
        }
        // get key status object to update
        const toUpdate = keyStatus[letter];
        
        if (phrase.includes(letter)) {
            // green if guess is good
            toUpdate['color'] = 'green';
            if (updateGuess(letter)) {
                // updateGuess returns true if the phrase has been guessed
                setIsWin(true);
            }
        } else {
            // red if guess is wrong
            toUpdate['color'] = 'red';
            setRemaining(remaining - 1);
        }
        toUpdate['disabled'] = true;
        // update key object in copied keyboard status object then set this to new key status
        const allKeys = { ...keyStatus };
        allKeys[letter] = toUpdate;
        setKeyStatus(allKeys);
    };

    const getDefaultGuessedColors = (words) => {
        return words.map((word) => {
            let result = [];
            let i = 0;
            for (i; i < word.length; i++) {
                result[i] = "black";
            }
            return result;
        });
    }



    const newGame = async (e) => {
        let data;
        let dataObj;
        setErrorLoading(false);
        setLoading(true);
        setGuessedColors(getDefaultGuessedColors('Loading...'.toLowerCase().split(' ')));
        setGuessed('Loading...'.toUpperCase().split(' '));
        try {
            const res = await fetch('/api/phrases');
            data = await res.json();
            dataObj = data[Math.floor(Math.random() * data.length)];
        } catch (error) {
            console.log('error');
            setXLimit(900);
            setLoading(false);
            setErrorLoading(true);
            setGuessedColors(getDefaultGuessedColors('Error Loading Phrase'.toLowerCase().split(' ')));
            setGuessed('Error Loading Phrase'.toUpperCase().split(' '));
            return;
        }
        setLoading(false);
        setErrorLoading(false);
        setKeyStatus(keyObj);
        setPhrase(dataObj.phrase.toLowerCase());
        setGuessed(dataObj.phrase.toLowerCase().split(" ").map((word) => '_'.repeat(word.length)));
        setGuessedColors(getDefaultGuessedColors(dataObj.phrase.toLowerCase().split(" ")));
        setCategory(dataObj.category || '');
        setCategoryShown(false);
        setHint(dataObj.hint || '');
        setHintShown(false);
        setIsWin(false);
        setAnswerShown(false);
        const longestWord = dataObj.phrase.split(" ").reduce((previous, current) => current.length > previous.length ? current : previous);
        if (longestWord.length > 9) {
            setXLimit(900 + 45 * (longestWord.length - 9));
        } else {
            setXLimit(900);
        }
        if (e == undefined) {
            setRemaining(10);
        } else {
            setRemaining(e.target.id == 'easy' ? 10 : 7);
            setIsEasy(e.target.id == 'easy');
        }
    }

    const showAnswer = () => {
        if (answerShown) {
            return;
        }
        const newColors = guessed.map((word, index) => {
            let arr = [];
            for (let i = 0; i < word.length; i++) {
                if (word[i] == "_") {
                    arr[i] = "red";
                } else {
                    arr[i] = "black";
                }
            }
            return arr;
        });
        
        setGuessedColors(newColors);
        setGuessed(phrase.toUpperCase().split(' '));
        setAnswerShown(true);
    }

    return (
        <>
            <svg width={xLimit} height="700" version="1.1" xmlns="http://www.w3.org/2000/svg">
            
                {loading || errorLoading || (isEasy && remaining < 10) || (!isEasy && remaining < 7) ? <HangmanGallows /> : ''}
                {loading || errorLoading || (isEasy && remaining < 9) || (!isEasy && remaining < 6) ? <HangmanHead /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 8) || (!isEasy && remaining < 5) ? <HangmanBody /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 7) || (!isEasy && remaining < 4) ? <HangmanRightArm /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 6) || (!isEasy && remaining < 3) ? <HangmanLeftArm /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 5) || (!isEasy && remaining < 2) ? <HangmanRightLeg /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 4) || (!isEasy && remaining < 1) ? <HangmanLeftLeg /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 3) ? <HangmanRightEye /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 2) ? <HangmanLeftEye /> : ''} 
                {loading || errorLoading || (isEasy && remaining < 1) ? <HangmanFrown /> : ''}

                {loading || errorLoading ?  '' : <HangmanRemainingLabel misses={remaining} isEasy={isEasy} />}
                {loading || errorLoading || !category ? '' : <HangmanCategoryLabel category={category} alreadyShown={categoryShown} setAlreadyShown={setCategoryShown} />}
                {loading || errorLoading || !hint ? '' : <HangmanHintLabel hint={hint} alreadyShown={hintShown} setAlreadyShown={setHintShown} />}
                {loading || errorLoading || !Object.keys(keyStatus).length? '' : <HangmanInput keyStatus={keyStatus} click={selectLetter} submit={!remaining ? showAnswer : play} isLoss={remaining == 0} answerShown={answerShown} />}

                {guessed.map((word, index) => {
                    return (
                        <HangmanWord key={index} word={word} row={index} x={initialX} y={initialY} guessColors={guessedColors} />
                    );
                })}
                {errorLoading ? <HangmanEasyButton isHighlighted={false} clickEasy={newGame}/> : (loading ? '' : <HangmanEasyButton isHighlighted={isEasy && !(isWin || remaining == 0)} clickEasy={newGame}/>)}
                {errorLoading ? <HangmanHardButton isHighlighted={false} clickHard={newGame}/> : (loading ? '' : <HangmanHardButton isHighlighted={!isEasy && !(isWin || remaining == 0)} clickHard={newGame}/>)}
            </svg>
        </>
    );
};
export default HangmanTemplate;