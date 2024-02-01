import { Machine } from '../../state/models';
import Items from '../items/Items';
import styles from './Inventory.module.css';

interface InventoryProps {
  machine: Machine;
}

export default function Inventory({ machine }: InventoryProps) {
  return (
    <div className={styles.inventory}>
      {machine.items.toArray().map(([code, items]) => (
        <div className={styles.itemRow} key={code}>
          <div className={styles.code}>{code}</div>
          {items.first() && (
            <div className={styles.price}>
              ${((items.first()?.price || 0) / 100).toFixed(2)}
            </div>
          )}
          <Items items={items} />
        </div>
      ))}
    </div>
  );
}
