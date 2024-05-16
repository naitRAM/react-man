const HangmanInput = ({ keyStatus, click, submit, isLoss , answerShown}) => {
    return (
        <>
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

            <rect x="748" y="630" height="30" width="75" fill={isLoss && !answerShown ? 'yellow' : 'none'} rx="10" strokeWidth="1" stroke="black" />
            <text x="760" y="650" onClick={submit}>{isLoss && !answerShown ? 'SHOW' : 'ENTER'}</text>
        </>
    );
};
export default HangmanInput;