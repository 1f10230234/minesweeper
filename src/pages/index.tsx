//import { count } from 'console';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const direction = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  console.log('a');
  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const newUserInputs: number[][] = JSON.parse(JSON.stringify(userInputs));
  ////
  const setBombRandom = (x: number, y: number) => {
    bombMap[y][x] = 1;
    const a = Math.floor(Math.random() * 9);
    const b = Math.floor(Math.random() * 9);
    if (bombMap[a][b] === 0) {
      bombMap[a][b] = 1;
    } else {
      setBombRandom(a, b);
    }
    bombMap[y][x] = 0;
    setBombMap(bombMap);
  };
  ////
  const checkAround = (x: number, y: number) => {
    //console.log('a');
    //console.log(y, x);
    board[y][x] = 0;
    for (let k = 0; k < 2; k++) {
      //console.log('i');
      if (board[y][x] === 0) {
        //console.log('u');
        for (const d of direction) {
          //console.log('e');
          if (k) {
            //console.log('o');
            if (
              board[y + d[1]] != undefined &&
              board[x + d[0]] != undefined &&
              board[y + d[1]][x + d[0]] === -1 &&
              bombMap[y + d[1]][x + d[0]] === 0
            ) {
              //console.log(y, x);
              checkAround(x + d[0], y + d[1]);
            }
          } else {
            //console.log('ki');
            if (
              bombMap[y + d[1]] != undefined &&
              bombMap[x + d[0]] != undefined &&
              bombMap[y + d[1]][x + d[0]] === 1
            ) {
              //console.log('ku');
              board[y][x] += 1;
              console.log(y, x);
              //console.log(d);
            }
          }
        }
      }
    }
    console.log('newboard');
    console.table(board);
  };
  ////
  const makeBoard = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newUserInputs[j][i] === 1) {
          checkAround(i, j);
        }
      }
    }
  };
  ////
  const clickCell = (x: number, y: number) => {
    if (newUserInputs.some((row: number[]) => row.includes(1))) {
      //
    } else {
      for (let b = 0; b < 10; b++) {
        setBombRandom(x, y);
      }
    }
    newUserInputs[y][x] = 1;
    console.log('newUserInputs');
    console.table(newUserInputs);
    console.log('bombMap');
    console.table(bombMap);
    console.log('board');
    console.table(board);
    setUserInputs(newUserInputs);
  };
  makeBoard();

  //console.log('end');
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row: number[], y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              {cell === -1 && (
                <div className={styles.tile} style={{}}>
                  {cell}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
