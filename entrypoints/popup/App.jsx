import { useEffect, useState, React } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import fetchWords from "./api";
import "bulma/css/bulma.min.css";
import InputForm from "./InputForm";

function App() {
  const { words, loading, error, refetch } = fetchWords();
  const [winning, setWinning] = useState(false);
  console.log(words);
  const win = (status) => {
    
    if(status === false){
      setWinning(false);
      refetch(5);
    }else{
      setWinning(true);
    }
  };
  return (
    <>
      <div className="is-flex is-flex-direction-column p-3">
        <h1>Random Words</h1>
        {loading ? (
          <progress className="progress is-primary" max="50"></progress>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            {" "}
            <p> {winning ? `The word is ${words}` : ""}</p>
            <h2>Guess the word</h2>
            <InputForm ans={words} win={() => win(true)} resetWord={() => win(false)} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
