import * as React from 'react';
import { arrayCellType } from './';
import { content } from '../content';

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== 12 && i !== 12) {
      [array[i], array[j]] = [array[j], array[i]]; // Thank you ES6
    }
  }
};

export const newBoard = (
  b: React.MutableRefObject<arrayCellType[]>,
  setCells: React.Dispatch<React.SetStateAction<arrayCellType[]>>
) => {
  let a = [];

  for (let index = 0; index < content.length; index++) {
    a.push({
      text: content[index],
      id: index,
      active: false,
      winning: false,
    });
  }
  shuffleArray(a);
  setCells(a);
  b.current = JSON.parse(JSON.stringify(a));
  b.current[12].active = true;
};
