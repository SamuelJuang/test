import RICIBs from 'react-individual-character-input-boxes';
import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputForm = ({ans, win,resetWord}) => {
    const [guess, setGuess] = React.useState('');
    const [guesses, setGuesses] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const submitGuess = () => {
        console.log(guesses);
        if(guesses.includes(guess)){
            toast.info("You have already guessed that word", {
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide
              });
            return;
        }else if(guess.length < 5){
            toast.info("Please enter a 5 letter word!", {
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide
              });
            return;
        }else{
            setGuesses([...guesses, guess]);
            console.log(guess)
            console.log(ans);
            setGuess('');
            if(guess === ans){
                toast.success("YOU WIN", {
                    autoClose: 3000, //3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                  });
                  toast.info("Refresh the Extension for more", {
                    autoClose: 5000, //3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                  });
                  win();
            }else{
                toast.warning("Try Again!", {
                    autoClose: 1000, //3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                  });
                if(guesses.length == 4){
                    setDisabled(true);
                    console.log(disabled)
                    win();
                }
            }
        }
        
    }

    const reset = () => {
        setGuess('');
        setGuesses([]);
        setDisabled(false);
        resetWord();
    }

    const settingClass =(letter,pos) => {
        let check = ans.split("");
        
        if(check[pos] === letter){
            return "has-background-success"
        }else if(check.includes(letter)) {
            return "has-background-warning"
        }else{
            return "has-background-danger"
        }
    }
    return (
        <div className='px-3'>
            <div className='field'>
                <div className='control has-icon-left'>
                    <input disabled = {disabled} type="text" className='input' value={guess} onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                            setGuess(e.target.value);
                        }
                    }} maxLength={5}/>
                </div>
            </div>
            <div className='is-flex is-flex-direction-column is-gap-1'>
            <button disabled = {disabled} className='button is-success' onClick={submitGuess}>Submit</button>
            <p>Guesses : {5 - guesses.length}</p>
            {guesses.length == 5 && <button className='button is-danger' onClick={reset}>Reset</button>}
            </div>
            {guesses.map((guess, index) => {
                let splitGuess = guess.split('');
                return (
                    <div className='is-flex is-flex-direction-row mt-2 is-rounded has-border is-justify-content-center'>
                        {splitGuess.map((letter, pos) => {
                            return (
                                <div className={`${settingClass(letter,pos)} p-3`}>
                                    {letter}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            <div className="toast-container"><ToastContainer limit={2}/></div>
        </div>
    );
}

export default InputForm;