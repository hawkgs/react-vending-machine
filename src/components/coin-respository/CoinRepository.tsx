import styles from './CoinRepository.module.css';
import { Machine } from '../../state/models';
import { classes } from '../../utils/classes';
import { coinFormatPipe } from '../../utils/helpers';

interface CoinRepositoryProps {
  machine: Machine;
  className?: string;
}

export default function CoinRepository({
  machine,
  className,
}: CoinRepositoryProps) {
  return (
    <div className={classes(styles.coinRepository, className)}>
      <p>Machine Coin Repository</p>
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
