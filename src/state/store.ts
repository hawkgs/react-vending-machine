import { Action } from './actions';
import { effects } from './effects';
import { Machine } from './models';
import { reducer } from './reducer';

export function createMachineStore(
  initialMachine: Machine,
  onStateChanges: (m: Machine) => void,
) {
  let machine = initialMachine;

  const dispatch = (action: Action) => {
    machine = reducer(machine, action);
    onStateChanges(machine);
    setTimeout(() => effects(machine, action, dispatch));
  };

  return dispatch;
}
