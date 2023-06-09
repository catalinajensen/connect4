import { useEffect, useState } from 'react';
import { GAME_STATUS } from '../constants';
import { isWinnerOrDraw } from '../gameBoard.helper';
import Circle from './Circle';
import Footer from './Footer';
import Header from './Header';
import styles from './GameBoard.module.css';

// const PLAYER_1 = 1;
// const PLAYER_2 = 2;
// const PLAYER_3 = 3;

// const players = [PLAYER_1, PLAYER_2, PLAYER_3];

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
  const [players, setPlayers] = useState<number[]>([1, 2]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(players[0]);
  const [gameStatus, setGameStatus] = useState<string>(GAME_STATUS.PLAYING);
  const [winPlayer, setWinPlayer] = useState<number>(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  const [prevState, setPrevState] = useState<{
    board: (number | null)[][];
    currentPlayer: number;
    column: number;
  }>({
    board: [],
    currentPlayer: 0,
    column: 0
  });

  const initGame = () => {
    setGameBoard(initialGameBoard);
    setCurrentPlayer(players[0]);
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

    setPrevState({
      board,
      currentPlayer,
      column
    });

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

    const currentPlayerIndex = players.indexOf(currentPlayer);

    // console.info(currentPlayerIndex);

    let nextPlayer = players[currentPlayerIndex + 1];

    if (currentPlayerIndex === players.length - 1) {
      nextPlayer = players[0];
    }

    setCurrentPlayer(nextPlayer);
  };

  const goPrevState = () => {
    console.info(prevState);

    updateBoard(prevState.board, prevState.currentPlayer, prevState.column);

    setCurrentPlayer(prevState.currentPlayer);

    console.info(gameBoard);
  };

  const clickCircle = (column: number): void => {
    updateBoard(gameBoard, currentPlayer, column);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (numberOfPlayers) {
      let players = [];

      for (let i = 0; i < numberOfPlayers; i++) {
        players.push(i + 1);
      }

      setPlayers([...players]);
    }
  }, [numberOfPlayers]);

  useEffect(() => {
    const result = isWinnerOrDraw(gameBoard);

    console.info('result', result);

    switch (result) {
      case 1:
      case 2:
      case 3:
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
      <input
        type="number"
        placeholder="min 2"
        onChange={(e) => {
          console.info(e.target.value);

          setNumberOfPlayers(+e.target.value);
        }}
      />
      <button
        onClick={() => {
          goPrevState();
        }}
      >
        Undo
      </button>
      {gameStatus !== GAME_STATUS.PLAYING && (
        <Footer onClickNewGame={initGame} />
      )}
    </>
  );
};

export default GameBoard;
