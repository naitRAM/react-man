import { useState } from 'react';
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

const HangmanTemplate = ({ phrase, easy = true }) => {
    phrase = phrase.toLowerCase();
    const words = phrase.split(' ');
    // split the phrase to place individual words on separate rows
    const [guessed, setGuessed] = useState(words.map((word) => '_'.repeat(word.length)));

    const [tries, setTries] = useState(easy ? 10 : 7);
    // values used to render initial underscores in place of unguessed letters
    const initialX = 450;
    let xLimit = 900;
    const initialY = 250;

    // find longestWord in phrase
    const longestWord = words.reduce((previous, current) => current.length > previous.length ? current : previous);

    // width of SVG will depend on the size of the longest word in the phrase
    // a longestWord length of 9 will fit perfectly within the initial xLimit width value
    if (longestWord.length > 9) {
        xLimit += 45 * (longestWord.length - 9)
    }
    
    // set up state for keyboard
    const letters = 'qwertyuiopasdfghjklzxcvbnm';
    let keyObj = {};
    letters.split('').forEach((letter) => {
        keyObj[letter] = { 'disabled': false, 'color': 'none' };
    });
    const [keyStatus, setKeyStatus] = useState(keyObj);

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
    const click = (e) => {
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
                }
            }
            // guessed state is passed to view where letters are displayed in uppercase
            newGuess[index] = newWord.toUpperCase();
        });
        setGuessed(newGuess);
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
            updateGuess(letter);
        } else {
            // red if guess is wrong
            toUpdate['color'] = 'red';
            setTries(tries - 1);
            
        }
        toUpdate['disabled'] = true;

        // update key object in copied keyboard status object then set this to new key status
        const allKeys = { ...keyStatus };
        allKeys[letter] = toUpdate;
        console.log(allKeys);
        setKeyStatus(allKeys);
        
    };

    return (
        <>
            <svg width={xLimit} height="700" version="1.1" xmlns="http://www.w3.org/2000/svg">

                {(easy && tries < 10) || (!easy && tries < 7) ? <HangmanGallows /> : ''}
                {(easy && tries < 9) || (!easy && tries < 6) ? <HangmanHead /> : ''} 
                {(easy && tries < 8) || (!easy && tries < 5) ? <HangmanBody /> : ''} 
                {(easy && tries < 7) || (!easy && tries < 4) ? <HangmanRightArm /> : ''} 
                {(easy && tries < 6) || (!easy && tries < 3) ? <HangmanLeftArm /> : ''} 
                {(easy && tries < 5) || (!easy && tries < 2) ? <HangmanRightLeg /> : ''} 
                {(easy && tries < 4) || (!easy && tries < 1) ? <HangmanLeftLeg /> : ''} 
                {(easy && tries < 3) ? <HangmanRightEye /> : ''} 
                {(easy && tries < 2) ? <HangmanLeftEye /> : ''} 
                {(easy && tries < 1) ? <HangmanFrown /> : ''}

                
                <HangmanInput keyStatus={keyStatus} click={click} submit={play} />

                {guessed.map((word, index) => {
                    return (
                        <HangmanWord key={index} word={word} row={index} x={initialX} y={initialY} />
                    );
                })}

            </svg>
        </>
    );
};
export default HangmanTemplate;