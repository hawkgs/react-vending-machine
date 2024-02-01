import { useState } from 'react';
import styles from './Controls.module.css';

interface ControlsProps {
  onCodeEnter: (code: string) => void;
  onCoinsDispense: () => void;
}

export default function Controls({
  onCodeEnter,
  onCoinsDispense,
}: ControlsProps) {
  const [code, setCode] = useState<string>('');

  const onButtonClick = (digit: string) => {
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
    setCode('');
    onCoinsDispense();
  };

  return (
    <div className={styles.controls}>
      <div className={styles.code}>CODE: {code}</div>
      <div className={styles.buttons}>
        <button className={styles.dispenseBtn} onClick={dispense}>
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
