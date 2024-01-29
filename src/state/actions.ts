import { List } from 'immutable';
import { Coin, InventoryItem } from './models';

type ActionType =
  | 'add-coin'
  | 'enter-code'
  | 'item-not-found'
  | 'item-unavailable'
  | 'insufficient-credit'
  | 'cant-process-order'
  | 'dispense-item-attempt'
  | 'dispense-item-success'
  | 'dispense-change-attempt'
  | 'dispense-change-success';

export interface Action<T> {
  name: ActionType;
  payload?: T;
}

export const addCoin = (coin: Coin): Action<number> => ({
  name: 'add-coin',
  payload: coin,
});

export const enterCode = (code: number): Action<number> => ({
  name: 'enter-code',
  payload: code,
});

export const itemNotFound = (): Action<void> => ({
  name: 'item-not-found',
});

export const itemUnavailable = (): Action<void> => ({
  name: 'item-unavailable',
});

export const insufficientCredit = (): Action<void> => ({
  name: 'insufficient-credit',
});

export const cantProcessOrder = (): Action<void> => ({
  name: 'cant-process-order',
});

export const dispenseItemAttempt = (
  item: InventoryItem,
  change: List<Coin>,
): Action<{ item: InventoryItem; change: List<Coin> }> => ({
  name: 'dispense-item-attempt',
  payload: { item, change },
});

export const dispenseItemSuccess = (
  item: InventoryItem,
  change: List<Coin>,
): Action<{ item: InventoryItem; change: List<Coin> }> => ({
  name: 'dispense-item-success',
  payload: { item, change },
});

export const dispenseChangeAttempt = (
  coins: List<Coin>,
): Action<List<Coin>> => ({
  name: 'dispense-change-attempt',
  payload: coins,
});

export const dispenseChangeSuccess = (
  coins: List<Coin>,
): Action<List<Coin>> => ({
  name: 'dispense-change-success',
  payload: coins,
});
