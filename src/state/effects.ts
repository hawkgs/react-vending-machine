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
  machineReady,
} from './actions';
import { Coin, InventoryItem, Machine } from './models';
import { processChange } from '../utils/subset-sum';

const AsyncOpWaitTime = 2000;

export function effects(
  machine: Machine,
  action: Action,
  dispatch: (action: Action) => void,
) {
  switch (action.name) {
    case 'enter-code': {
      const code = action.payload as string;
      const itemList = machine.items.get(code);
      const coinsSum = machine.coinsInSlot.reduce(
        (prev, next) => prev + next,
        0,
      );

      if (!coinsSum) {
        return dispatch(insufficientCredit());
      }
      if (!itemList) {
        return dispatch(itemNotFound());
      }
      if (!itemList?.size) {
        return dispatch(itemUnavailable());
      }

      const item = itemList.first() as InventoryItem;
      if (item.price > coinsSum) {
        return dispatch(insufficientCredit());
      }

      const targetChange = coinsSum - item.price;
      let change = List<Coin>([]);

      if (targetChange) {
        const allCoins = machine.coins
          .map((qt, coin) => List(new Array<Coin>(qt).fill(coin)))
          .toList()
          .reduce((p, c) => p.concat(c), List<Coin>([]))
          .concat(machine.coinsInSlot);

        const { cantProcess, changeCoins } = processChange(
          allCoins,
          targetChange,
        );

        if (cantProcess) {
          return dispatch(cantProcessOrder());
        }

        change = changeCoins;
      }

      return dispatch(dispenseItemAttempt(code, change));
    }

    case 'cant-process-order':
      return dispatch(dispenseChangeAttempt(machine.coinsInSlot));

    case 'dispense-item-attempt':
      {
        setTimeout(() => {
          const { code, change } = action.payload as {
            code: string;
            change: List<Coin>;
          };
          dispatch(dispenseItemSuccess(code, change));
        }, AsyncOpWaitTime);
      }
      break;

    case 'dispense-item-success': {
      const { change } = action.payload as { change: List<Coin> };
      return dispatch(dispenseChangeAttempt(change));
    }

    case 'dispense-change-attempt':
      {
        setTimeout(() => {
          const change = action.payload as List<Coin>;
          dispatch(dispenseChangeSuccess(change));
        }, AsyncOpWaitTime);
      }
      break;

    case 'dispense-change-success':
      return dispatch(machineReady());
  }
}
