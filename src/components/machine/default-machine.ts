import { List, Map } from 'immutable';
import { InventoryItem, Machine } from '../../state/models';

export const DefaultMachine = new Machine({
  coins: Map([
    [1, 10],
    [5, 10],
    [10, 10],
    [25, 10],
    [50, 10],
    [100, 10],
  ]),
  items: Map([
    [
      '11',
      List([
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
      ]),
    ],
    [
      '12',
      List([
        new InventoryItem({ name: 'Beer', price: 140 }),
        new InventoryItem({ name: 'Beer', price: 140 }),
        new InventoryItem({ name: 'Beer', price: 140 }),
        new InventoryItem({ name: 'Beer', price: 140 }),
      ]),
    ],
  ]),
});
