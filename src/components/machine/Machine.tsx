import { useState } from 'react';
import './Machine.module.css';

import Screen from '../screen/Screen';
import Inventory from '../inventory/Inventory';
import Controls from '../controls/Controls';
import CoinsSlot from '../coins-slot/CoinsSlot';

import { Coin } from '../../state/models';
import { update } from '../../state/update';
import {
  dispenseChangeAttempt,
  enterCode,
  insertCoin,
} from '../../state/actions';
import { DefaultMachine } from './default-machine';

export default function Machine() {
  const [machine, setMachine] = useState(DefaultMachine);

  const onCodeEnter = (code: number) => {
    const newMachine = update(machine, enterCode(code));
    setMachine(newMachine);
  };

  const onCoinsDispense = () => {
    const newMachine = update(
      machine,
      dispenseChangeAttempt(machine.coinsInSlot),
    );
    setMachine(newMachine);
  };

  const onCoinInserted = (coin: Coin) => {
    const newMachine = update(machine, insertCoin(coin));
    setMachine(newMachine);
  };

  return (
    <div className="machine">
      <Inventory machine={machine} />
      <Screen machine={machine} />
      <Controls
        machine={machine}
        onCodeEnter={onCodeEnter}
        onCoinsDispense={onCoinsDispense}
      />
      <CoinsSlot machine={machine} onCoinInserted={onCoinInserted} />
    </div>
  );
}
