import styles from './Footer.module.css';

interface IProps {
  onClickNewGame: Function;
}

const Footer = ({ onClickNewGame }: IProps) => {
  return (
    <div className={styles.footer}>
      <button className={styles.footerButton} onClick={() => onClickNewGame()}>
        New game
      </button>
    </div>
  );
};

export default Footer;
