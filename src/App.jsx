import { useState } from "react";

const PLAYER_COUNT = 2;
const CARD_COUNT = 9;

function App() {
  const [cards, setCards] = useState(new Array(CARD_COUNT).fill(0));

  const [turn, setTurn] = useState(0);

  const previousPlayer = ((turn - 1) % PLAYER_COUNT) + 1;
  const currentPlayer = (turn % PLAYER_COUNT) + 1;

  function selectCard(index) {
    if (!isLegalPlay(index)) {
      return;
    }
    const cardsCopy = [...cards];
    cardsCopy[index] = currentPlayer;
    cardsCopy[index + 1] = currentPlayer;
    setCards(cardsCopy);
    incrementTurn();
  }

  function incrementTurn() {
    setTurn(turn + 1);
  }

  function isLegalPlay(index) {
    return cards[index] === 0 && cards[index + 1] === 0;
  }

  function isGameOver() {
    return !cards.some((item, index) => isLegalPlay(index));
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <div className="relative bg-white p-8 shadow-xl ring-1 rounded-lg mx-auto">
          {isGameOver()
            ? `Player ${previousPlayer} wins!`
            : `Player ${currentPlayer}: Select two boxes`}
          <div className="m-8 grid grid-flow-col gap-4">
            {cards.map((item, index) => (
              <div
                key={index}
                onClick={() => selectCard(index)}
                className={
                  "w-12 h-12 rounded-md flex items-center justify-center text-xl font-bold peer" +
                  (cards[index] ? " bg-gray-400" : " bg-gray-200") +
                  (isLegalPlay(index)
                    ? " cursor-pointer"
                    : " cursor-not-allowed")
                }
              >
                {item || "-"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
