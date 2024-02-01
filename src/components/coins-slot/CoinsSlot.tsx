import { Coin } from '../../state/models';
import { classes } from '../../utils/classes';
import styles from './CoinsSlot.module.css';

interface CoinsSlotProps {
  onCoinInserted: (coin: Coin) => void;
}

const Coins: Coin[] = [1, 5, 10, 25, 50, 100];

function coinFormatPipe(c: Coin) {
  if (c < 100) {
    return c;
  }
  return '$' + c / 100;
}

export default function CoinsSlot({ onCoinInserted }: CoinsSlotProps) {
  return (
    <div className={styles.coinsSlot}>
      {Coins.map((c: Coin) => (
        <button
          className={classes(styles.coin, styles['coin' + c])}
          onClick={() => onCoinInserted(c)}
          key={c}
        >
          {coinFormatPipe(c)}
        </button>
      ))}
    </div>
  );
}
