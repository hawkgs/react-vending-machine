import styles from './CoinInventory.module.css';
import { Machine } from '../../state/models';
import { classes } from '../../utils/classes';
import { coinFormatPipe } from '../../utils/helpers';

interface CoinInventoryProps {
  machine: Machine;
  className?: string;
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
            ({coinFormatPipe(coin)}) x {quantity}
          </span>
        ))}
      </code>
    </div>
  );
}
