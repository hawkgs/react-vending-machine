import { Action } from './actions';
import { effects } from './effects';
import { Machine } from './models';
import { reducer } from './reducer';

export function update<T = unknown>(
  machine: Machine,
  action: Action<T>,
): Machine {
  const newMachine = reducer(machine, action);
  const next = <T>(action: Action<T>): Machine => update(newMachine, action);
  effects(newMachine, action, next);

  return newMachine;
}
