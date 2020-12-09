import * as React from 'react';
import { arrayCellType } from './';
import { shuffleArray } from './utils.bingo';
import { content } from '../content';

const useCreateBoard = () => {
  const a = React.useRef<arrayCellType[]>([]);
  const b = React.useRef<arrayCellType[]>([]);

  a.current = [];
  for (let index = 0; index < content.length; index++) {
    a.current.push({
      text: content[index],
      id: index,
      active: false,
      winning: false,
    });
  }
  shuffleArray(a.current);

  b.current = JSON.parse(JSON.stringify(a.current));
  b.current[12].active = true;

  return { a, b };
};

export default useCreateBoard;
