import { List, Map } from 'immutable';
import { InventoryItem, Machine } from '../../state/models';

export const InitialMachine = new Machine({
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
        new InventoryItem({ name: 'Chips', price: 425 }),
        new InventoryItem({ name: 'Chips', price: 425 }),
        new InventoryItem({ name: 'Chips', price: 425 }),
        new InventoryItem({ name: 'Chips', price: 425 }),
        new InventoryItem({ name: 'Chips', price: 425 }),
      ]),
    ],
    [
      '12',
      List([
        new InventoryItem({ name: 'Pop Corn', price: 375 }),
        new InventoryItem({ name: 'Pop Corn', price: 375 }),
        new InventoryItem({ name: 'Pop Corn', price: 375 }),
        new InventoryItem({ name: 'Pop Corn', price: 375 }),
        new InventoryItem({ name: 'Pop Corn', price: 375 }),
      ]),
    ],
    [
      '21',
      List([
        new InventoryItem({ name: 'Coffee', price: 200 }),
        new InventoryItem({ name: 'Coffee', price: 200 }),
        new InventoryItem({ name: 'Coffee', price: 200 }),
        new InventoryItem({ name: 'Coffee', price: 200 }),
        new InventoryItem({ name: 'Coffee', price: 200 }),
      ]),
    ],
    [
      '22',
      List([
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
        new InventoryItem({ name: 'Soda', price: 150 }),
      ]),
    ],
    [
      '31',
      List([
        new InventoryItem({ name: 'Beer', price: 240 }),
        new InventoryItem({ name: 'Beer', price: 240 }),
        new InventoryItem({ name: 'Beer', price: 240 }),
        new InventoryItem({ name: 'Beer', price: 240 }),
        new InventoryItem({ name: 'Beer', price: 240 }),
      ]),
    ],
  ]),
});
