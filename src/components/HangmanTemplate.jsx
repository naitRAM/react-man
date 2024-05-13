import { useState, useEffect } from 'react';
import HangmanWord from './HangmanWord';
const HangmanTemplate = ({ phrase }) => {
    phrase = phrase.toLowerCase();
    const words = phrase.split(' ');
    // split the phrase to place individual words on separate rows
    const [guessed, setGuessed] = useState(words.map((word) => "_".repeat(word.length)));

    // values used to render initial underscores in place of unguessed letters
    const initialX = 450;
    let xLimit = 800;
    const initialY = 250;

    // find longestWord in phrase
    const longestWord = words.reduce((previous, current) => current.length > previous.length ? current : previous);

    // width of SVG will depend on the size of the longest word in the phrase
    // a longestWord length of 9 will fit perfectly within the initial xLimit width value
    if (longestWord.length > 9) {
        xLimit += 45 * (longestWord.length - 9)
    }
    
    // set up state for keyboard
    const letters = "qwertyuiopasdfghjklzxcvbnm";
    let keyObj = {};
    letters.split('').forEach((letter) => {
        keyObj[letter] = { 'disabled': false, 'color': 'none' };
    });
    const [keyStatus, setKeyStatus] = useState(keyObj);

    // handler for letter selection
    const click = (e) => {
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
        for (let obj in newObj) {
            if (newObj[obj]['color'] == 'yellow') {
                newObj[obj]['color'] = 'none';
            }
        }
        // set new status for selected key
        newObj[letter] = newStatus;
        // set state for whole keyboard
        setKeyStatus(newObj);
    };

    const submit = (e) => {
        let letter;
        // only one key can be yellow at a time, indicating it is valid and selected
        for (let obj in keyStatus) {
            if (keyStatus[obj]['color'] == 'yellow') {
                letter = obj;
                break;
            }
        }
        // in case no key was selected
        if (!letter) {
            return;
        }
        // get key status object to update
        const toUpdate = keyStatus[letter];
        
        if (phrase.includes(letter)) {
            // green if guess is good
            toUpdate['color'] = 'green';
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
        } else {
            // red if guess is wrong
            toUpdate['color'] = 'red';
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

                <rect x="50" y="650" height="10" width="150" rx="10" stroke="black" strokeWidth="10" />
                <rect x="125" y="50" height="600" width="10" stroke="black" strokeWidth="10" />
                <rect x="125" y="47.5" height="5" width="225" stroke="black" strokeWidth="5" />
                <line x1="325" y1="50" x2="325" y2="100" stroke="black" strokeWidth="2.5" />

                <circle cx="325" cy="150" r="50" stroke="black" strokeWidth="2.5" fill="none" />

                <line x1="325" y1="200" x2="325" y2="400" stroke="black" strokeWidth="5" />

                <line x1="325" y1="275" x2="250" y2="250" stroke="black" strokeWidth="5" />

                <line x1="325" y1="275" x2="400" y2="250" stroke="black" strokeWidth="5" />

                <line x1="325" y1="400" x2="250" y2="500" stroke="black" strokeWidth="5" />

                <line x1="325" y1="400" x2="400" y2="500" stroke="black" strokeWidth="5" />

                <line x1="300" y1="130" x2="315" y2="145" stroke="black" strokeWidth="2.5" />
                <line x1="300" y1="145" x2="315" y2="130" stroke="black" strokeWidth="2.5" />

                <line x1="335" y1="130" x2="350" y2="145" stroke="black" strokeWidth="2.5" />
                <line x1="335" y1="145" x2="350" y2="130" stroke="black" strokeWidth="2.5" />

                <path d="M 300 175 C 315 160 335 160 350 175" stroke="black" strokeWidth="2.5" fill="none" />

                {guessed.map((word, index) => {
                    return (
                        <HangmanWord key={index}  word={word} row={index} x={initialX} y={initialY} />
                    );
                })}

                <circle cx="456" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['q']['color']} />
                <text x="450" y="550" id="q" onClick={click}>Q</text>

                <circle cx="497" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['w']['color']} />
                <text x="490" y="550" id="w" onClick={click}>W</text>

                <circle cx="535" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['e']['color']} />
                <text x="530" y="550" id="e" onClick={click}>E</text>

                <circle cx="575" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['r']['color']} />
                <text x="570" y="550" id="r" onClick={click}>R</text>

                <circle cx="615" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['t']['color']} />
                <text x="610" y="550" id="t" onClick={click}>T</text>

                <circle cx="656" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['y']['color']} />
                <text x="650" y="550" id="y" onClick={click}>Y</text>

                <circle cx="695" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['u']['color']} />
                <text x="690" y="550" id="u" onClick={click}>U</text>

                <circle cx="734" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['i']['color']} />
                <text x="730" y="550" id="i" onClick={click}>I</text>

                <circle cx="775" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['o']['color']} />
                <text x="770" y="550" id="o" onClick={click}>O</text>

                <circle cx="815" cy="545" r="15" strokeWidth="1" stroke="black" fill={keyStatus['p']['color']} />
                <text x="810" y="550" id="p" onClick={click}>P</text>

                <circle cx="465" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['a']['color']} />
                <text x="460" y="600" id="a" onClick={click}>A</text>

                <circle cx="505" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['s']['color']} />
                <text x="500" y="600" id="s" onClick={click}>S</text>

                <circle cx="545" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['d']['color']} />
                <text x="540" y="600" id="d" onClick={click}>D</text>

                <circle cx="585" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['f']['color']} />
                <text x="580" y="600" id="f" onClick={click}>F</text>

                <circle cx="625" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['g']['color']} />
                <text x="620" y="600" id="g" onClick={click}>G</text>

                <circle cx="665" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['h']['color']} />
                <text x="660" y="600" id="h" onClick={click}>H</text>

                <circle cx="704" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['j']['color']} />
                <text x="700" y="600" id="j" onClick={click}>J</text>

                <circle cx="745" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['k']['color']} />
                <text x="740" y="600" id="k" onClick={click}>K</text>

                <circle cx="785" cy="595" r="15" strokeWidth="1" stroke="black" fill={keyStatus['l']['color']} />
                <text x="780" y="600" id="l" onClick={click}>L</text>

                <circle cx="475" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['z']['color']} />
                <text x="470" y="650" id="z" onClick={click}>Z</text>

                <circle cx="515" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['x']['color']} />
                <text x="510" y="650" id="x" onClick={click}>X</text>

                <circle cx="555" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['c']['color']} />
                <text x="550" y="650" id="c" onClick={click}>C</text>

                <circle cx="596" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['v']['color']} />
                <text x="590" y="650" id="v" onClick={click}>V</text>

                <circle cx="635" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['b']['color']} />
                <text x="630" y="650" id="b" onClick={click}>B</text>

                <circle cx="675" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['n']['color']} />
                <text x="670" y="650" id="n" onClick={click}>N</text>

                <circle cx="716" cy="645" r="15" strokeWidth="1" stroke="black" fill={keyStatus['m']['color']} />
                <text x="710" y="650" id="m" onClick={click}>M</text>

                <rect x="748" y="630" height="30" width="75" fill="none" rx="10" strokeWidth="1" stroke="black" />
                <text x="760" y="650" onClick={submit}>ENTER</text>

            </svg>
        </>
    );
};
export default HangmanTemplate;