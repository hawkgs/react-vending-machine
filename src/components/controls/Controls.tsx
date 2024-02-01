import { useEffect, useState } from 'react';
import styles from './Controls.module.css';
import { Machine, State } from '../../state/models';
import { isMachineInUse } from '../../utils/helpers';

interface ControlsProps {
  machine: Machine;
  onCodeEnter: (code: string) => void;
  onCoinsDispense: () => void;
}

export default function Controls({
  machine,
  onCodeEnter,
  onCoinsDispense,
}: ControlsProps) {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (machine.state === State.StandBy) {
      setCode('');
    }
  }, [machine]);

  const onButtonClick = (digit: string) => {
    if (isMachineInUse(machine)) {
      return;
    }

    if (code.length > 1) {
      setCode(digit);
    } else {
      const newCode = code + digit;
      setCode(newCode);

      if (newCode.length > 1) {
        onCodeEnter(newCode);
      }
    }
  };

  const dispense = () => {
    if (isMachineInUse(machine)) {
      return;
    }

    setCode('');
    onCoinsDispense();
  };

  return (
    <div className={styles.controls}>
      <div className={styles.code}>CODE: {code}</div>
      <div className={styles.buttons}>
        <button
          className={styles.dispenseBtn}
          onClick={dispense}
          disabled={!machine.coinsInSlot.size}
        >
          DISP
        </button>
        <div className={styles.dial}>
          <button onClick={() => onButtonClick('1')}>1</button>
          <button onClick={() => onButtonClick('2')}>2</button>
          <button onClick={() => onButtonClick('3')}>3</button>
          <button onClick={() => onButtonClick('4')}>4</button>
          <button onClick={() => onButtonClick('5')}>5</button>
          <button onClick={() => onButtonClick('6')}>6</button>
        </div>
      </div>
    </div>
  );
}
