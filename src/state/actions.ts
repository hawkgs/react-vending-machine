import { List } from 'immutable';
import { Coin } from './models';

type ActionType =
  | 'insert-coin'
  | 'enter-code'
  | 'item-not-found'
  | 'item-unavailable'
  | 'insufficient-credit'
  | 'cant-process-order'
  | 'dispense-item-attempt'
  | 'dispense-item-success'
  | 'dispense-change-attempt'
  | 'dispense-change-success';

export interface Action<T = unknown> {
  name: ActionType;
  payload?: T;
}

export const insertCoin = (coin: Coin): Action<number> => ({
  name: 'insert-coin',
  payload: coin,
});

export const enterCode = (code: string): Action<string> => ({
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
  code: string,
  change: List<Coin>,
): Action<{ code: string; change: List<Coin> }> => ({
  name: 'dispense-item-attempt',
  payload: { code, change },
});

export const dispenseItemSuccess = (
  code: string,
  change: List<Coin>,
): Action<{ code: string; change: List<Coin> }> => ({
  name: 'dispense-item-success',
  payload: { code, change },
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
