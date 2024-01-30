import { Coin } from '../../state/models';
import styles from './CoinsSlot.module.css';

interface CoinsSlotProps {
  onCoinInserted: (coin: Coin) => void;
}

const Coins: Coin[] = [1, 2, 5, 10, 20, 50, 100, 200];

function coinFormatPipe(c: Coin) {
  if (c < 100) {
    return c + 'c';
  }
  return '$' + c / 100;
}

export default function CoinsSlot({ onCoinInserted }: CoinsSlotProps) {
  return (
    <div className={styles.coinsList}>
      {Coins.map((c: Coin) => (
        <button
          className={`${styles.coin} ${styles['coin' + c]}`}
          onClick={() => onCoinInserted(c)}
          key={c}
        >
          {coinFormatPipe(c)}
        </button>
      ))}
    </div>
  );
}
