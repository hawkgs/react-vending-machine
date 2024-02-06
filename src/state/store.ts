import { useEffect, useRef, useState } from 'react';
import { Action } from './actions';
import { effects } from './effects';
import { Machine } from './models';
import { reducer } from './reducer';

// Note(Georgi): The initial idea was to implement a very
// simple state machine that suits the needs of the current app.
// However, the need of some sort of effects arised, so
// the final solution turned out as a rather full-fledged
// Redux store. In retrospect, even if the current approach
// is simple enough, the existing 3rd party Redux solutions
// might be more suitable as they are well-tested.
function createMachineStore(
  initialMachine: Machine,
  worker: Worker,
  onStateChanges: (m: Machine) => void,
) {
  let machine = initialMachine;

  const dispatch = (action: Action) => {
    machine = reducer(machine, action);
    onStateChanges(machine);
    setTimeout(() => effects(machine, action, worker, dispatch));
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
    const worker = new Worker(new URL('../utils/worker.ts', import.meta.url), {
      type: 'module',
    });

    dispatchRef.current = createMachineStore(
      initialState,
      worker,
      (machine) => {
        setMachine(() => machine);
      },
    );

    return () => {
      worker.terminate();
    };
  }, []);

  return [machine, dispatch];
}
