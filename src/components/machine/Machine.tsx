import { useEffect, useRef, useState } from 'react';
import styles from './Machine.module.css';

import Screen from '../screen/Screen';
import Inventory from '../inventory/Inventory';
import Controls from '../controls/Controls';
import CoinsSlot from '../coins-slot/CoinsSlot';

import { Coin } from '../../state/models';
import { createMachineStore } from '../../state/store';
import {
  Action,
  dispenseChangeAttempt,
  enterCode,
  insertCoin,
} from '../../state/actions';
import { DefaultMachine } from './default-machine';

export default function Machine() {
  const [machine, setMachine] = useState(DefaultMachine);
  const dispatchRef = useRef<((action: Action) => void) | null>(null);

  const dispatch = (action: Action) =>
    dispatchRef.current && dispatchRef.current(action);

  useEffect(() => {
    dispatchRef.current = createMachineStore(DefaultMachine, (machine) => {
      setMachine(() => machine);
    });
  }, []);

  const onCodeEnter = (code: string) => dispatch(enterCode(code));

  const onCoinsDispense = () =>
    dispatch(dispenseChangeAttempt(machine.coinsInSlot));

  const onCoinInserted = (coin: Coin) => dispatch(insertCoin(coin));

  return (
    <div className={styles.machine}>
      <div className={styles.main}>
        <Inventory machine={machine} />
        <div className={styles.screenAndControls}>
          <Screen machine={machine} className={styles.screen} />
          <Controls
            onCodeEnter={onCodeEnter}
            onCoinsDispense={onCoinsDispense}
          />
        </div>
      </div>
      <CoinsSlot onCoinInserted={onCoinInserted} />
    </div>
  );
}
