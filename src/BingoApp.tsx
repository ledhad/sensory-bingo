import * as React from 'react';
import './App.css';
import { Grid } from './components';
import { Cell } from './components';
import { bingoAlgo, newBoard, arrayCellType, useCreateBoard } from './utils';
import Button from './components/Button';
import ConfettiGenerator from 'confetti-js';
import WinningEmoji from './components/WinningEmoji';
import LinkCode from './components/LinkCode';

function BingoApp() {
  // All the state is in this component
  const [loading, setLoading] = React.useState(true);
  const [winnerCells, setWinnerCells] = React.useState<number[]>();
  const [blockGame, setBlockGame] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null); // for confetti

  const { a: initialCells, b: cellsVirtual } = useCreateBoard(); // two sets of INITIAL cells

  const [cells, setCells] = React.useState<arrayCellType[]>([]); // UI cells stored in useState (for re-rendering)
  const virtualCells = React.useRef<arrayCellType[]>([]); // computation cells stored in useRef (no re-render)

  // Init
  React.useEffect(() => {
    setCells(initialCells.current);
    virtualCells.current = cellsVirtual.current;

    // just for fun. Actually does not serve a purpose
    setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      setLoading(true);
    };
  }, [initialCells, cellsVirtual]);

  // onClick cell mark cell as active and we run the algo
  let handleClickCell = (position: number) => {
    // console.log('clicked on cell : ', position);
    let cellID = cells[position].id;

    // to avoid useless computation
    let cellAlreadyClicked = cells[position].active;
    // 12 middle cell
    let middleCellClicked = cellID === (-1 + cells.length) / 2;

    if (!cellAlreadyClicked && !blockGame) {
      // Updating cell to active status
      if (!middleCellClicked) {
        setCells((c) =>
          c.map((cell) =>
            cell.id === cellID ? { ...cell, active: true } : cell
          )
        );
        // And also computation cells
        virtualCells.current[position].active = true;
      }

      // Run algo
      let res = bingoAlgo(virtualCells.current, position);
      if (res.conditionWin) {
        // We receive the position value of the winners, not their actual id.
        let winCellsNotVirtual = res.winnerIndexes.map((id) => cells[id].id);

        // UI update taken care of in useEffect
        setWinnerCells(winCellsNotVirtual);

        // And block boardgame
        setBlockGame(true);
      }
    }
  };

  // Handle new game
  const handleClickButton = () => {
    newBoard(virtualCells, setCells);
    setBlockGame(false);
  };

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

  // Success UI support
  React.useEffect(() => {
    const confettiSettings = { target: canvasRef.current };
    const confetti = new ConfettiGenerator(confettiSettings);
    if (blockGame) confetti.render();
    else confetti.clear();

    return () => confetti.clear();
  }, [blockGame]); // add the var dependencies or not

  // JSX for the UI
  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginTop: 30,
          zIndex: 20,
          maxHeight: 700,
          height: '100vw',
          width: '100%',
          pointerEvents: 'none',
        }}
      />
      {blockGame && <WinningEmoji />}
      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          <Button onClick={handleClickButton}>
            {!blockGame ? 'Start' : 'New'} Game
          </Button>
          <Grid>
            {cells.map((cell, idx) => {
              return (
                <Cell
                  text={cell.text}
                  index={cell.id}
                  position={idx}
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
      {/* Link to the code on github */}
      <LinkCode />
    </div>
  );
}

export default BingoApp;

// Idea of functionality to add : play with others! I started to do it against a robot but realized it would require quite a lot of rework. But that's a fun idea, I think.
