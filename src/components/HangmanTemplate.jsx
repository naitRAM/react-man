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
import HangmanInput from './HangmanInput';
import HangmanEasyButton from './HangmanEasyButton';
import HangmanHardButton from './HangmanHardButton';

const HangmanTemplate = () => {
    const [phrase, setPhrase] = useState('');
    const [words, setWords] = useState([]);
    const [guessed, setGuessed] = useState([]);
    const [guessedColors, setGuessedColors] = useState([]);
    const [isEasy, setIsEasy] = useState(true);
    const [isOver, setIsOver] = useState(false);
    const [tries, setTries] = useState(0);
    const [xLimit, setXLimit] = useState(0);
    const [keyStatus, setKeyStatus] = useState({});
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

    const isWin = () => {
        for (let i = 0; i < guessed.length; i++) {
            if (guessed[i].includes('_')) {
                return false;
            }
        }
        return true;
    }
    // handler for letter selection
    const selectLetter = (e) => {
        if (!tries || isWin()) {
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
                setIsOver(true);
            }
        } else {
            // red if guess is wrong
            if (tries == 1) {
                setIsOver(true);
            } 
            toUpdate['color'] = 'red';
            setTries(tries - 1);
        }
        toUpdate['disabled'] = true;
        // update key object in copied keyboard status object then set this to new key status
        const allKeys = { ...keyStatus };
        allKeys[letter] = toUpdate;
        setKeyStatus(allKeys);
    };

    const newGame = (e) => {
        setKeyStatus(keyObj);
        const phrase = ["Onomatopoeia", "Hotel California", "The Great Escape"][Math.floor(Math.random() * 3)].toLowerCase();
        setPhrase(phrase);
        setWords(phrase.split(" "));
        setGuessed(phrase.split(" ").map((word) => '_'.repeat(word.length)));
        setGuessedColors(phrase.split(" ").map((word) => {
            let result = [];
            let i = 0;
            for (i; i < word.length; i++) {
                result[i] = "black";
            }
            return result;
        }));
        const longestWord = phrase.split(" ").reduce((previous, current) => current.length > previous.length ? current : previous);
        if (longestWord.length > 9) {
            setXLimit(900 + 45 * (longestWord.length - 9));
        } else {
            setXLimit(900);
        }
        if (e == undefined) {
            setTries(10);
        } else {
            setTries(e.target.id == 'easy' ? 10 : 7);
            setIsEasy(e.target.id == 'easy');
        }
        setIsOver(false);
    }

    const showAnswer = () => {
        
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
    }

    return (
        <>
            <svg width={xLimit} height="700" version="1.1" xmlns="http://www.w3.org/2000/svg">

                {(isEasy && tries < 10) || (!isEasy && tries < 7) ? <HangmanGallows /> : ''}
                {(isEasy && tries < 9) || (!isEasy && tries < 6) ? <HangmanHead /> : ''} 
                {(isEasy && tries < 8) || (!isEasy && tries < 5) ? <HangmanBody /> : ''} 
                {(isEasy && tries < 7) || (!isEasy && tries < 4) ? <HangmanRightArm /> : ''} 
                {(isEasy && tries < 6) || (!isEasy && tries < 3) ? <HangmanLeftArm /> : ''} 
                {(isEasy && tries < 5) || (!isEasy && tries < 2) ? <HangmanRightLeg /> : ''} 
                {(isEasy && tries < 4) || (!isEasy && tries < 1) ? <HangmanLeftLeg /> : ''} 
                {(isEasy && tries < 3) ? <HangmanRightEye /> : ''} 
                {(isEasy && tries < 2) ? <HangmanLeftEye /> : ''} 
                {(isEasy && tries < 1) ? <HangmanFrown /> : ''}

                
                {!Object.keys(keyStatus).length ? '' : <HangmanInput keyStatus={keyStatus} click={selectLetter} submit={isOver ? showAnswer : play} gameOver={isOver} />}

                {guessed.map((word, index) => {
                    return (
                        <HangmanWord key={index} word={word} row={index} x={initialX} y={initialY} guessColors={guessedColors} />
                    );
                })}
                <HangmanEasyButton isEasy={isEasy} clickEasy={newGame}/>
                <HangmanHardButton isHard={!isEasy} clickHard={newGame}/>

            </svg>
        </>
    );
};
export default HangmanTemplate;