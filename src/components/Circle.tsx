import { GAME_STATUS } from '../constants';
import styles from './Circle.module.css';

interface IProps {
  columnIndex: number;
  className: string;
  gameStatus: string;
  onCircleClicked: Function;
}

const Circle = ({
  columnIndex,
  className,
  gameStatus,
  onCircleClicked
}: IProps) => {
  return (
    <td>
      <div
        className={styles.gameCell}
        data-testid="gameCell"
        onClick={() =>
          gameStatus === GAME_STATUS.PLAYING && onCircleClicked(columnIndex)
        }
      >
        <div
          className={`${styles.circle} ${styles[className]}`}
          data-testid="circle"
        ></div>
      </div>
    </td>
  );
};

export default Circle;
