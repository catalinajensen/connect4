import { useEffect, useState } from 'react';
import { GAME_STATUS } from '../constants';
import { isWinnerOrDraw } from '../gameBoard.helper';
import Circle from './Circle';
import Footer from './Footer';
import Header from './Header';
import styles from './GameBoard.module.css';

const PLAYER_1 = 1;
const PLAYER_2 = 2;

const initialGameBoard = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
];

const GameBoard = () => {
  const [gameBoard, setGameBoard] =
    useState<(number | null)[][]>(initialGameBoard);
  const [currentPlayer, setCurrentPlayer] = useState<number>(PLAYER_1);
  const [gameStatus, setGameStatus] = useState<string>(GAME_STATUS.PLAYING);
  const [winPlayer, setWinPlayer] = useState<number>(0);

  const initGame = () => {
    setGameBoard(initialGameBoard);
    setCurrentPlayer(PLAYER_1);
    setGameStatus(GAME_STATUS.PLAYING);
  };

  const updateBoard = (
    board: (number | null)[][],
    currentPlayer: number,
    column: number
  ): void => {
    if (board[0][column]) {
      return;
    }

    const temp_board = [
      [...board[0]],
      [...board[1]],
      [...board[2]],
      [...board[3]],
      [...board[4]],
      [...board[5]]
    ];

    for (let row = 5; row >= 0; row--) {
      if (!temp_board[row][column]) {
        temp_board[row][column] = currentPlayer;
        break;
      }
    }

    setGameBoard(temp_board);

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const clickCircle = (column: number): void => {
    updateBoard(gameBoard, currentPlayer, column);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const result = isWinnerOrDraw(gameBoard);

    switch (result) {
      case 1:
      case 2:
        setGameStatus(GAME_STATUS.WIN);
        setWinPlayer(result);
        break;
      case 'draw':
        setGameStatus(GAME_STATUS.DRAW);
        break;
      default:
      // do nothing
    }
  }, [gameBoard]);

  return (
    <>
      <Header
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        winPlayer={winPlayer}
      />
      <table className={styles.boardGame}>
        <tbody>
          {gameBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row?.map((cellValue, columnIndex) => (
                <Circle
                  key={columnIndex}
                  columnIndex={columnIndex}
                  className={`player_${cellValue}`}
                  gameStatus={gameStatus}
                  onCircleClicked={clickCircle}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {gameStatus !== GAME_STATUS.PLAYING && (
        <Footer onClickNewGame={initGame} />
      )}
    </>
  );
};

export default GameBoard;
