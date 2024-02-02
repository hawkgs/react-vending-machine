import { Coin, Machine, State } from '../state/models';

/**
 * Checks whether the machine can be used or not.
 *
 * @param m Machine
 * @returns
 */
export const isMachineInUse = (m: Machine): boolean =>
  m.state === State.DispensingChange ||
  m.state === State.DispensingItem ||
  m.state === State.ItemDispensed;

/**
 * Formats coins to dollars and cents.
 *
 * @param c Coin
 * @returns
 */
export const coinFormatPipe = (c: Coin): string => {
  if (c < 100) {
    return `${c}c`;
  }
  return `$${c / 100}`;
};
