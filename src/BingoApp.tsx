import * as React from 'react';
import './App.css';
import { Grid } from './components';
import { Cell } from './components';
import { content } from './content';
import { arrayCellType } from './components';
import { bingoAlgo } from './utils';
import Button from './components/Button';
import shuffleArray from './utils/shuffleArray';
import ConfettiGenerator from 'confetti-js';

function BingoApp() {
  //al the state is in this component
  const [cells, setCells] = React.useState<arrayCellType[]>([]);
  const initialCells = React.useRef<arrayCellType[]>([]); //just for init, ref does not trigger a render
  const [loading, setLoading] = React.useState(true);
  const [winnerCells, setWinnerCells] = React.useState<number[]>();
  const [blockGame, setBlockGame] = React.useState(false);

  // optional match up

  const partyEmoji = '🥳';

  // onClick cell mark cell as active and we run the algo
  let handleClickCell = (id: number) => {
    let cellAlreadyClicked = cells[id].active; // to avoid useless computation
    let middleId = (-1 + cells.length) / 2; // 12
    let middleCellClicked = id === middleId;

    const tempCells = JSON.parse(JSON.stringify(cells)); //for algo and avoiding shallow copy. Works because our data is simple (e.g. no functions)

    tempCells[middleId].active = true; // This one is bonus

    if (!cellAlreadyClicked && !blockGame) {
      // Updating cell to active status
      if (!middleCellClicked) {
        setCells((c) =>
          c.map((cell) => (cell.id === id ? { ...cell, active: true } : cell))
        );
        tempCells[id].active = true;
      }

      // Run algo
      let res = bingoAlgo(tempCells, id);
      if (res.conditionWin) {
        setWinnerCells(res.winnerIndexes); // taken care of in useEffect
        // And block boardgame
        setBlockGame(true);
      }
    }
  };

  // Handle new game
  const handleClickButton = () => {
    setCells(initialCells.current);
    setBlockGame(false);

    //And making new board
    initialCells.current = [];
    shuffleArray(content);
    for (let index = 0; index < content.length; index++) {
      initialCells.current.push({
        text: content[index],
        id: index,
        active: false,
        winning: false,
      });
    }
    setCells(initialCells.current);
  };

  // Init
  React.useEffect(() => {
    initialCells.current = [];
    shuffleArray(content); // randomize board
    const contentRobot = content.map((el) => el);
    shuffleArray(contentRobot);
    for (let index = 0; index < content.length; index++) {
      initialCells.current.push({
        text: content[index],
        id: index,
        active: false,
        winning: false,
      });
    }
    setCells(initialCells.current);

    setTimeout(() => {
      setLoading(false);
    }, 100); // just for fun. Actually does not serve a purpose

    return () => {
      setLoading(true);
    };
  }, []);

  // Updating UI for winner cells (turns green)
  React.useEffect(() => {
    if (winnerCells)
      setCells((c) =>
        c.map((cell) =>
          winnerCells.filter((index: number) => index === cell.id).length !== 0
            ? { ...cell, winning: true }
            : cell
        )
      );
  }, [winnerCells]);

  React.useEffect(() => {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);

    if (blockGame) confetti.render();
    else confetti.clear();

    return () => confetti.clear();
  }, [blockGame]); // add the var dependencies or not

  return (
    <div className="App">
      <canvas
        id="my-canvas"
        style={{
          position: 'absolute',
          marginTop: 30,
          zIndex: 20,
          maxHeight: 700,
          height: 'calc(100vw)',
          width: '100%',
          pointerEvents: 'none',
        }}
      ></canvas>
      {blockGame && (
        <span
          style={{
            position: 'absolute',
            top: 'min(25vw, 300px)',
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            fontSize: 150,
            zIndex: 21,
          }}
        >
          {partyEmoji}
        </span>
      )}

      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          <Button onClick={handleClickButton}>Restart Game</Button>
          <Grid>
            {cells.map((cell, idx) => {
              return (
                <Cell
                  text={cell.text}
                  index={cell.id}
                  winCell={cell.winning}
                  key={idx}
                  onClick={handleClickCell}
                  activeCell={cell.active}
                />
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
}

export default BingoApp;
