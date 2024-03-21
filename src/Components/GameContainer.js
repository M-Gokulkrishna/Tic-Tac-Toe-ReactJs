import '../App.css';
import React, { useEffect, useRef, useState } from 'react';
import ResultContainer from './ResultContainer';
// 
let MainArray = [[],[],[]];
// 
const initialState =
    [
        { id: 1, Value: '' },
        { id: 2, Value: '' },
        { id: 3, Value: '' },
        { id: 4, Value: '' },
        { id: 5, Value: '' },
        { id: 6, Value: '' },
        { id: 7, Value: '' },
        { id: 8, Value: '' },
        { id: 9, Value: '' },
    ];
// Standard Winning Stick Places in the Game Board
const WinningPointer =
{
    set00: { top: 16, left: 50, deg: 0 },
    set01: { top: 50, left: 50, deg: 0 },
    set02: { top: 83, left: 50, deg: 0 },
    set10: { top: 50, left: 16, deg: 90 },
    set11: { top: 50, left: 50, deg: 90 },
    set12: { top: 50, left: 84, deg: 90 },
    set20: { top: 50, left: 50, deg: 45 },
    set21: { top: 50, left: 50, deg: -45 },
}
const GameContainer = () => {
    // Input Tag UseRef Variable
    const InputTag = useRef(null);
    // These are States
    const [Won, setWon] = useState('none');
    const [Symbol, setSymbol] = useState('X');
    const [isShow, setisShow] = useState(false);
    const [DrawCount, setDrawCount] = useState(0);
    const [Shells, setShells] = useState(initialState);
    const [WhichPointer, setWhichPointer] = useState('none');
    // Getting value change from select tag
    function handleInputChange(e) {
        setSymbol(e.target.value);
    }
    // Reset the Game without Browser Reload
    function handleReset() {
        setWon('none');
        setSymbol('X');
        setDrawCount(0);
        setisShow(false);
        MainArray = [[],[],[]];
        setWhichPointer('none');
        setShells(initialState);
        InputTag.current.value = 'X';
    }
    // Getting Shell Click Corresponding with ID to Place a value in Shells in the UI and Update MainArray for Checks the Winning Condition & Authentication 
    function handleShellClick(Which_id) {
        if (Won === 'none') {
            setDrawCount(PreviousCount => PreviousCount + 1);
            setSymbol(Symbol === 'X' ? 'O' : 'X');
            if (Shells[Which_id - 1].Value === '') {
                setShells(Shells.map((Each) => (Each.id === Which_id && Each.Value === '') ? { ...Each, Value: Symbol } : Each));
                if (Which_id <= 3 && Symbol !== '') {
                    MainArray[0][Which_id - 1] = Symbol;
                }
                if (Which_id > 3 && Which_id <= 6 && Symbol !== '') {
                    MainArray[1][Which_id - 4] = Symbol;
                }
                if (Which_id > 6 && Which_id <= 9 && Symbol !== '') {
                    MainArray[2][Which_id - 7] = Symbol;
                }
            }
            else {
                setSymbol(Symbol === 'X' ? 'X' : 'O');
            }
            CheckWinning();
        }
    }
    // DrawCount for Checking if (DrawCount) >= 8 but
    // although Won value haven't changed yet it will taken as a Draw
    useEffect(()=>{
        if(DrawCount>=8 && Won === 'none'){
            setTimeout(() => {
                setisShow(true);
            }, 1000);
        }
    },[DrawCount]);
    // Set Result And Displays the ResultContainer
    useEffect(() => {
        if (Won === "X" || Won === "O") {
            setTimeout(() => {
                setisShow(true);
            }, 1000);
        }
        return;
    },[Won]);
    // Checking the Winning Conditions
    function CheckWinning() {
        let Pointer = 0;
        while (Pointer < 3) {
            if (MainArray[Pointer][0] === MainArray[Pointer][1] && MainArray[Pointer][0] === MainArray[Pointer][2] && MainArray[Pointer][0] !== undefined) {
                setWon(MainArray[Pointer][0]);
                setWhichPointer("set0" + Pointer);
                return;
            }
            if (MainArray[0][Pointer] === MainArray[1][Pointer] && MainArray[0][Pointer] === MainArray[2][Pointer] && MainArray[0][Pointer] !== undefined) {
                setWon(MainArray[0][Pointer]);
                setWhichPointer("set1" + Pointer);
                return;
            }
            Pointer += 1;
        }
        if (MainArray[0][0] === MainArray[1][1] && MainArray[0][0] === MainArray[2][2] &&
            MainArray[0][0] !== undefined) {
            setWon(MainArray[0][0]);
            setWhichPointer("set20");
            return;
        }
        if (MainArray[0][2] === MainArray[1][1] && MainArray[0][2] === MainArray[2][0] && 
            MainArray[0][2] !== undefined) {
            setWon(MainArray[0][2]);
            setWhichPointer("set21");
            return;
        }
    }
    return (
        <div className='Master-Container'>
            <div className='Select-Input-Container'>
                <label htmlFor="SelectInput">Select Symbol</label>
                <select name='SelectInput' id="Select-Input" onChange={handleInputChange} ref={InputTag}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                </select>
            </div>
            <div className='Game-Container'>
                {
                    Shells.map((EachShell, index) => (
                        <div
                            key={index} className='Shells'
                            onClick={() => { handleShellClick(EachShell.id); }}>
                            <h1 style={(EachShell.Value === 'X') ? { color: 'var(--Color1)' } : { color: 'var(--Color2)' }}>{EachShell.Value}</h1>
                        </div>
                    ))
                }
                <div className="Winning-Stick"
                    style={
                        (WhichPointer !== 'none') ?
                            {
                                visibility: 'visible',
                                top: `${WinningPointer[WhichPointer].top}%`,
                                left: `${WinningPointer[WhichPointer].left}%`,
                                transform: `translate(-50%, -50%) rotate(${WinningPointer[WhichPointer].deg}deg)`
                            } :
                            { top: "50%", left: "50%", visibility: 'hidden', transform: "translate(-50%, -50%) rotate(0deg)" }}
                ></div>
            </div>
            <button className='Reset-Btn' onClick={handleReset}>Reset</button>
            {
                isShow &&
                <ResultContainer WhichPlayer={Won} DrawCount={DrawCount} />
            }
        </div>

    )
}

export default GameContainer