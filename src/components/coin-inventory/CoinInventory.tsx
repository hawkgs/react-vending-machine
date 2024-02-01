import styles from './CoinInventory.module.css';
import { Coin, Machine } from '../../state/models';
import { classes } from '../../utils/classes';

interface CoinInventoryProps {
  machine: Machine;
  className?: string;
}

function coinFormatPipe(c: Coin) {
  if (c < 100) {
    return `${c}c`;
  }
  return `$${c / 100}`;
}

export default function CoinInventory({
  machine,
  className,
}: CoinInventoryProps) {
  return (
    <div className={classes(styles.coinInventory, className)}>
      <p>Machine Coin Inventory</p>
      <code className={styles.coins}>
        {machine.coins.toArray().map(([coin, quantity]) => (
          <span key={coin}>
            ({coinFormatPipe(coin)}): {quantity}
          </span>
        ))}
      </code>
    </div>
  );
}
