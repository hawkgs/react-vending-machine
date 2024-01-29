import { useState } from 'react';
import { Machine as MachineState } from '../../state/models';
import Screen from '../screen/Screen';
import Inventory from '../inventory/Inventory';
import Controls from '../controls/Controls';

export default function Machine() {
  const [machineState, setMachineState] = useState(new MachineState({}));

  const onCodeEnter = (code: number) => {};

  const onCoinsDispense = () => {};

  const onCoinInserted = (coin: number) => {};

  return (
    <div className="machine">
      <Screen machine={machineState} />
      <Inventory machine={machineState} />
      <Controls
        machine={machineState}
        onCodeEnter={onCodeEnter}
        onCoinsDispense={onCoinsDispense}
      />
    </div>
  );
}
