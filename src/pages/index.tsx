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
    const a = Math.floor(Math.random() * 9);
    const b = Math.floor(Math.random() * 9);
    if (bombMap[a][b] === 0) {
      bombMap[a][b] = 1;
    } else {
      setBombRandom(a, b);
    }

    setBombMap(bombMap);
  };
  ////
  function newGame() {
    if (confirm('新しいゲームを作りますか？')) {
      setUserInputs([
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
      setBombMap([
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
    }
    return false;
  }
  ////
  const checkAround = (x: number, y: number) => {
    board[y][x] = 0;
    if (bombMap[y][x]) {
      board[y][x] = 11;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (bombMap[j][i]) {
            board[j][i] = 11;
          }
        }
      }
    } else {
      for (let k = 0; k < 2; k++) {
        if (board[y][x] === 0 && userInputs[y][x] !== 10) {
          for (const d of direction) {
            if (k) {
              if (
                board[y + d[1]] != undefined &&
                board[x + d[0]] != undefined &&
                board[y + d[1]][x + d[0]] === -1 &&
                bombMap[y + d[1]][x + d[0]] === 0
              ) {
                checkAround(x + d[0], y + d[1]);
              }
            } else {
              if (
                bombMap[y + d[1]] != undefined &&
                bombMap[x + d[0]] != undefined &&
                bombMap[y + d[1]][x + d[0]] === 1
              ) {
                board[y][x] += 1;
              }
            }
          }
        }
      }
    }
    if (userInputs[y][x] === 1 && board[y][x] < 9 && board[y][x] > 0) {
      console.log('a');
      let count = 0;
      for (let k = 0; k < 2; k++) {
        for (const d of direction) {
          if (k) {
            if (
              board[y + d[1]] != undefined &&
              board[x + d[0]] != undefined &&
              board[y][x] === count &&
              board[y + d[1]][x + d[0]] === -1 &&
              userInputs[y + d[1]][x + d[0]] !== 10
            ) {
              console.log(count);
              checkAround(x + d[0], y + d[1]);
            }
          } else {
            if (
              bombMap[y + d[1]] != undefined &&
              bombMap[x + d[0]] != undefined &&
              userInputs[y + d[1]][x + d[0]] === 10
            ) {
              count += 1;
              console.log(count);
            }
          }
        }
      }
    }
  };
  ////
  const makeBoard = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newUserInputs[j][i] === 1) {
          checkAround(i, j);
        } else if (userInputs[j][i] !== 0) {
          board[j][i] = userInputs[j][i];
        }
      }
    }
  };
  ////
  const rClickCell = (x: number, y: number) => {
    //console.log('aa');
    if (board[y][x] === -1) {
      newUserInputs[y][x] = 10;
      //console.log('ii');
    } else if (board[y][x] === 10) {
      newUserInputs[y][x] = 9;
      //console.log('uu');
    } else if (board[y][x] === 9) {
      newUserInputs[y][x] = 0;
      //console.log('ee');
    }
    setUserInputs(newUserInputs);
  };
  ////
  const clickCell = (x: number, y: number) => {
    if (newUserInputs.some((row: number[]) => row.includes(1))) {
      //
    } else {
      bombMap[y][x] = 1;
      for (const d of direction) {
        if (bombMap[y + d[1]] != undefined && bombMap[x + d[0]] != undefined) {
          bombMap[y + d[1]][x + d[0]] = 1;
        }
      }
      for (let b = 0; b < 10; b++) {
        setBombRandom(x, y);
      }
      bombMap[y][x] = 0;
      for (const d of direction) {
        if (bombMap[y + d[1]] != undefined && bombMap[x + d[0]] != undefined) {
          bombMap[y + d[1]][x + d[0]] = 0;
        }
      }
    }
    if (userInputs[y][x] !== 10) {
      newUserInputs[y][x] = 1;
    }
    // console.log('newUserInputs');
    // console.table(newUserInputs);
    // console.log('bombMap');
    // console.table(bombMap);
    // console.log('board');
    // console.table(board);
    setUserInputs(newUserInputs);
  };
  makeBoard();
  let game = 0;
  if (newUserInputs.some((row: number[]) => row.includes(1))) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (bombMap[j][i]) {
          if (board[j][i] === -1 || board[j][i] === 10) {
            game += 1;
          }
          if (userInputs[j][i] === 1) {
            game = -999;
            // setTimeout(function () {
            //   alert('You lose...');
            //   newGame();
            // }, 0);
          }
        } else {
          if (board[j][i] !== -1 && board[j][i] !== 10) {
            game += 1;
          }
        }
      }
    }
    if (game === 81) {
      // setTimeout(function () {
      //   alert('You won!');
      //   newGame();
      // }, 0);
    }
    console.log(game);
    document.getElementsByTagName('html')[0].oncontextmenu = function () {
      return false;
    };
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.nikkori}
        style={{ backgroundPosition: game === 81 ? 60 : game < 0 ? 30 : 90 }}
      />

      <div className={styles.board}>
        {board.map((row: number[], y) =>
          row.map((cell, x) => (
            <div
              className={styles.border}
              key={`${x}-${y}`}
              onClick={() => clickCell(x, y)}
              onContextMenu={() => rClickCell(x, y)}
            >
              {cell !== 0 && (
                <div className={styles.cell} style={{ backgroundPosition: -30 * cell + 30 }}>
                  {(cell === -1 || cell === 9 || cell === 10) && (
                    <div className={styles.tile} style={{}}>
                      {(cell === 9 || cell === 10) && (
                        <div
                          className={styles.flag}
                          style={{
                            backgroundPosition: -30 * cell + 30,
                          }}
                        />
                      )}
                    </div>
                  )}
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
