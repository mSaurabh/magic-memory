import React, { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<iCard[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<iCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<iCard | null>(null);
  const [allMatched, setAllMatched] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards: iCard[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() * 1000 }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card: iCard) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  };

  React.useEffect(() => {
    //console.log(`c1 : ${choiceOne?.src}, c2 : ${choiceTwo?.src}`);
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne?.src === choiceTwo?.src) {
        //setMatch(true);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("✅");
      } else {
        // setMatch(false);
        console.log("🚫");
      }
      setTimeout(() => {
        resetTurn();
      }, 1000);
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // const { height, width } = useWindowDimensions();

  return (
    <div className="App">
      {cards.length > 0 && !!!cards.find((c) => c.matched === false) ? (
        <Confetti width={windowWidth} height={windowHeight * 3} />
      ) : null}
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            coverSrc={"/img/cover.png"}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export interface iCard {
  id?: number;
  src: string;
  matched: boolean;
}
export default App;
