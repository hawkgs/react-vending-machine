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

      // TODO(Georgi): Knapsack
      const changeNum = coinsSum - item.price;
      const change = List([]);
      if (changeNum) {
        return dispatch(cantProcessOrder());
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
        }, 3000);
      }
      break;

    case 'dispense-item-success':
      {
        const { change } = action.payload as { change: List<Coin> };
        if (!change.size) {
          return dispatch(machineReady());
        }

        return dispatch(
          dispenseChangeAttempt(
            (action.payload as { change: List<Coin> }).change,
          ),
        );
      }
      break;

    case 'dispense-change-attempt':
      {
        setTimeout(() => {
          const change = action.payload as List<Coin>;
          dispatch(dispenseChangeSuccess(change));
        }, 3000);
      }
      break;

    case 'dispense-change-success':
      return dispatch(machineReady());
  }
}
