import { Coin, Machine } from '../../state/models';
import { classes } from '../../utils/classes';
import { isMachineInUse } from '../../utils/helpers';
import styles from './CoinsSlot.module.css';

interface CoinsSlotProps {
  machine: Machine;
  onCoinInserted: (coin: Coin) => void;
}

const Coins: Coin[] = [1, 5, 10, 25, 50, 100];

function coinFormatPipe(c: Coin) {
  if (c < 100) {
    return c;
  }
  return '$' + c / 100;
}

export default function CoinsSlot({ onCoinInserted, machine }: CoinsSlotProps) {
  return (
    <div className={styles.coinsSlot}>
      <p>Pick a coin to insert in the slot</p>
      <div className={styles.coins}>
        {Coins.map((c: Coin) => (
          <button
            className={classes(styles.coin, styles['coin' + c])}
            onClick={() => onCoinInserted(c)}
            key={c}
            disabled={isMachineInUse(machine)}
          >
            {coinFormatPipe(c)}
          </button>
        ))}
      </div>
    </div>
  );
}
