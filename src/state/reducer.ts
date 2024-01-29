import { List } from 'immutable';
import { Action } from './actions';
import { Coin, InventoryItem, Machine, State } from './models';

export function reducer(machine: Machine, action: Action<unknown>): Machine {
  switch (action.name) {
    case 'insert-coin':
      {
        const coins = machine.coinsInSlot.push(action.payload as Coin);

        machine = machine
          .set('coinsInSlot', coins)
          .set('state', State.CoinsInserted);
      }
      break;

    case 'item-not-found':
      machine = machine.set('state', State.ItemNotFound);
      break;

    case 'item-unavailable':
      machine = machine.set('state', State.ItemUnavailable);
      break;

    case 'insufficient-credit':
      machine = machine.set('state', State.InsufficientCredit);
      break;

    case 'cant-process-order':
      machine = machine.set('state', State.CantProcessOrder);
      break;

    case 'dispense-item-attempt':
      machine = machine.set('state', State.DispensingItem);
      break;

    case 'dispense-item-success':
      {
        const item = (action.payload as { item: InventoryItem }).item;
        const updatedItemsList = machine.items.get(item.code)?.pop();
        const updatedItems = machine.items.set(
          item.code,
          updatedItemsList as List<InventoryItem>,
        );

        machine = machine
          .set('items', updatedItems)
          .set('state', State.ItemDispensed);
      }
      break;

    case 'dispense-change-attempt':
      machine = machine.set('state', State.DispensingChange);
      break;

    case 'dispense-change-success':
      {
        const change = action.payload as List<Coin>;
        let coins = machine.coins;

        machine.coinsInSlot.forEach((c) => {
          const currentCoins = coins.get(c) || 0;
          coins = coins.set(c, currentCoins + 1);
        });

        change.forEach((c: Coin) => {
          const currentCoins = coins.get(c) || 1;
          coins = coins.set(c, currentCoins - 1);
        });

        machine = machine
          .set('coinsInSlot', List([]))
          .set('coins', coins)
          .set('state', State.StandBy);
      }
      break;
  }

  return machine;
}
