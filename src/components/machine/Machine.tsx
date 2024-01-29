import { useState } from 'react';

import Screen from '../screen/Screen';
import Inventory from '../inventory/Inventory';
import Controls from '../controls/Controls';
import CoinsSlot from '../coins-slot/CoinsSlot';

import { Coin, Machine as MachineState } from '../../state/models';
import { update } from '../../state/update';
import {
  dispenseChangeAttempt,
  enterCode,
  insertCoin,
} from '../../state/actions';

export default function Machine() {
  const [machineState, setMachineState] = useState(new MachineState({}));

  const onCodeEnter = (code: number) => {
    const machine = update(machineState, enterCode(code));
    setMachineState(machine);
  };

  const onCoinsDispense = () => {
    const machine = update(
      machineState,
      dispenseChangeAttempt(machineState.coinsInSlot),
    );
    setMachineState(machine);
  };

  const onCoinInserted = (coin: Coin) => {
    const machine = update(machineState, insertCoin(coin));
    setMachineState(machine);
  };

  return (
    <div className="machine">
      <Inventory machine={machineState} />
      <Screen machine={machineState} />
      <Controls
        machine={machineState}
        onCodeEnter={onCodeEnter}
        onCoinsDispense={onCoinsDispense}
      />
      <CoinsSlot machine={machineState} onCoinInserted={onCoinInserted} />
    </div>
  );
}
