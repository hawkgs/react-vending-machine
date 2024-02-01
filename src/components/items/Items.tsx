import styles from './Items.module.css';
import { List } from 'immutable';
import { InventoryItem } from '../../state/models';

const ItemIconsMap: { [key: string]: string } = {
  ['Chips']: '🍟',
  ['Pop Corn']: '🍿',
  ['Coffee']: '☕️',
  ['Soda']: '🥤',
  ['Beer']: '🍺',
};

interface ItemsProps {
  items: List<InventoryItem>;
}

export default function Items({ items }: ItemsProps) {
  return items.map((item, idx) => (
    <span className={styles.item} key={item.name + idx}>
      {ItemIconsMap[item.name]}
    </span>
  ));
}
