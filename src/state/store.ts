import { useEffect, useRef, useState } from 'react';
import { Action } from './actions';
import { effects } from './effects';
import { Machine } from './models';
import { reducer } from './reducer';

function createMachineStore(
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

export function useMachineStore(
  initialState: Machine,
): [Machine, (a: Action) => void] {
  const [machine, setMachine] = useState(initialState);
  const dispatchRef = useRef<((a: Action) => void) | null>(null);

  const dispatch = (action: Action) =>
    dispatchRef.current && dispatchRef.current(action);

  useEffect(() => {
    dispatchRef.current = createMachineStore(initialState, (machine) => {
      setMachine(() => machine);
    });
  }, []);

  return [machine, dispatch];
}
