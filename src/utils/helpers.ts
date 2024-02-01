import { Coin, Machine, State } from '../state/models';

export const isMachineInUse = (m: Machine) =>
  m.state === State.DispensingChange ||
  m.state === State.DispensingItem ||
  m.state === State.ItemDispensed;

export const coinFormatPipe = (c: Coin) => {
  if (c < 100) {
    return `${c}c`;
  }
  return `$${c / 100}`;
};
