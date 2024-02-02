import styles from './Machine.module.css';

import Screen from '../screen/Screen';
import Inventory from '../inventory/Inventory';
import Controls from '../controls/Controls';
import CoinsSlot from '../coins-slot/CoinsSlot';

import { Coin } from '../../state/models';
import { useMachineStore } from '../../state/store';
import {
  dispenseChangeAttempt,
  enterCode,
  insertCoin,
} from '../../state/actions';
import { InitialMachine } from './initial-machine';
import CoinRepository from '../coin-respository/CoinRepository';

export default function Machine() {
  const [machine, dispatch] = useMachineStore(InitialMachine);

  const onCodeEnter = (code: string) => dispatch(enterCode(code));

  const onCoinsDispense = () =>
    dispatch(dispenseChangeAttempt(machine.coinsInSlot));

  const onCoinInserted = (coin: Coin) => dispatch(insertCoin(coin));

  return (
    <div className={styles.machine}>
      <div className={styles.main}>
        <Inventory machine={machine} />
        <div className={styles.screenAndControls}>
          <Screen machine={machine} />
          <Controls
            machine={machine}
            onCodeEnter={onCodeEnter}
            onCoinsDispense={onCoinsDispense}
          />
        </div>
      </div>
      <CoinRepository machine={machine} className={styles.coinInventory} />
      <CoinsSlot machine={machine} onCoinInserted={onCoinInserted} />
    </div>
  );
}
