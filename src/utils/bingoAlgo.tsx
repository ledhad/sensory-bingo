// the algo is not optimized. There is a way to skip some algo that we know will not give any result. E.g if I click on cell 0 there is no need to two the second diagonal algo. If we needed to be fast we could change that. There was no need here.

const bingoAlgo = (array: any, position: number) => {
  // variables
  let arrLength = array.length;
  let stack = 5;
  let conditionWin = false;
  let winnerIndexes = [];
  let algoCount = 4;

  while (algoCount) {
    // There are four algos when we do them all we exit the loop. I don't like using potentially infinie loop but I wanted to go fast
    // horinzontal
    stack = 5;
    let idBaseHor = position - (position % 5);
    for (let index = idBaseHor; index < idBaseHor + 5; index++) {
      if (array[index].active === true) {
        stack--;
        winnerIndexes.push(index); // we populate this array to be updated in App where the state is.
      }
      if (stack === 0) {
        conditionWin = true;
        break;
      }
    }

    if (conditionWin) break;
    // vertical
    let inc = 5;
    stack = 5;
    winnerIndexes = [];
    let idBaseVert = position % 5;
    for (let index = idBaseVert; index < idBaseVert + arrLength; index += inc) {
      if (array[index].active === true) {
        stack--;
        winnerIndexes.push(index);
      }
      if (stack === 0) {
        conditionWin = true;
        break;
      }
    }
    if (conditionWin) break;
    // diagonal
    // one
    let incre = 6;
    stack = 5;
    winnerIndexes = [];
    for (let index = 0; index < arrLength; index += incre) {
      if (array[index].active === true) {
        stack--;
        winnerIndexes.push(index);
      }
      if (stack === 0) {
        conditionWin = true;
        break;
      }
    }

    if (conditionWin) break;
    // diagonal
    // two
    let incre2 = 4;
    stack = 5;
    winnerIndexes = [];
    for (let index = 4; index < arrLength; index += incre2) {
      if (array[index].active === true) {
        stack--;
        winnerIndexes.push(index);
      }
      if (stack === 0) {
        conditionWin = true;
        break;
      }
    }
    if (conditionWin) break;
    algoCount--;
  }

  return { conditionWin, winnerIndexes };
};

export default bingoAlgo;
