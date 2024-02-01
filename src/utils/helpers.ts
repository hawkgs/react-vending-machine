import { Machine, State } from '../state/models';

export const isMachineInUse = (m: Machine) =>
  m.state === State.DispensingChange ||
  m.state === State.DispensingItem ||
  m.state === State.ItemDispensed;
