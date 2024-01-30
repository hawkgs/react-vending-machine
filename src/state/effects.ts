import { List } from 'immutable';
import {
  Action,
  cantProcessOrder,
  itemUnavailable,
  insufficientCredit,
  itemNotFound,
  dispenseItemAttempt,
  dispenseItemSuccess,
  dispenseChangeAttempt,
  dispenseChangeSuccess,
} from './actions';
import { Coin, InventoryItem, Machine } from './models';

export function effects(
  machine: Machine,
  action: Action<unknown>,
  next: (action: Action<unknown>) => Machine,
) {
  switch (action.name) {
    case 'enter-code': {
      const code = action.payload as number;
      const itemList = machine.items.get(code);
      if (!itemList) {
        return next(itemNotFound());
      }
      if (!itemList?.size) {
        return next(itemUnavailable());
      }

      const coinsSum = machine.coinsInSlot.reduce(
        (prev, next) => prev + next,
        0,
      );
      const item = itemList.first() as InventoryItem;
      if (item.price > coinsSum) {
        return next(insufficientCredit());
      }

      // TODO(Georgi): Knapsack
      const changeNum = coinsSum - item.price;
      const change = List([]);
      if (changeNum) {
        return next(cantProcessOrder());
      }

      return next(dispenseItemAttempt(code, change));
    }

    case 'cant-process-order':
      return next(dispenseChangeAttempt(machine.coinsInSlot));

    case 'dispense-item-attempt':
      {
        setTimeout(() => {
          const { code, change } = action.payload as {
            code: number;
            change: List<Coin>;
          };
          next(dispenseItemSuccess(code, change));
        }, 3000);
      }
      break;

    case 'dispense-item-success':
      return next(
        dispenseChangeAttempt(
          (action.payload as { change: List<Coin> }).change,
        ),
      );

    case 'dispense-change-attempt':
      {
        setTimeout(() => {
          const change = action.payload as List<Coin>;
          next(dispenseChangeSuccess(change));
        }, 3000);
      }
      break;
  }
}
