import { List, Map } from 'immutable';
import { InventoryItem, Machine } from '../../state/models';

export const DefaultMachine = new Machine({
  coins: Map([
    [1, 10],
    [2, 10],
    [5, 10],
    [10, 10],
    [20, 10],
    [50, 10],
    [100, 10],
    [200, 10],
  ]),
  items: Map([
    [
      10,
      List([
        new InventoryItem({ name: 'Cola', price: 150 }),
        new InventoryItem({ name: 'Cola', price: 150 }),
        new InventoryItem({ name: 'Cola', price: 150 }),
        new InventoryItem({ name: 'Cola', price: 150 }),
      ]),
    ],
    [
      11,
      List([
        new InventoryItem({ name: 'Sprite', price: 140 }),
        new InventoryItem({ name: 'Sprite', price: 140 }),
        new InventoryItem({ name: 'Sprite', price: 140 }),
        new InventoryItem({ name: 'Sprite', price: 140 }),
      ]),
    ],
  ]),
});
