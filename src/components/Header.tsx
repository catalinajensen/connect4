import { GAME_STATUS } from '../constants';
import styles from './Header.module.css';

interface IProps {
  currentPlayer: number;
  gameStatus: string;
  winPlayer: number;
}

const Header = ({ currentPlayer, gameStatus, winPlayer }: IProps) => {
  const getDisplayText = () => {
    switch (gameStatus) {
      case GAME_STATUS.WIN:
        return `Player ${winPlayer} wins`;
      case GAME_STATUS.DRAW:
        return 'Draw';
      default:
        return `Player ${currentPlayer} turn`;
    }
  };

  const getClassName = () => {
    switch (gameStatus) {
      case GAME_STATUS.WIN:
      case GAME_STATUS.DRAW:
        return `end`;
      default:
        return `player_${currentPlayer}`;
    }
  };

  return (
    <div
      className={`${styles.header} ${styles[getClassName()]}`}
      data-testid="header"
    >
      <div className={styles.headerText}>{getDisplayText()}</div>
    </div>
  );
};

export default Header;
