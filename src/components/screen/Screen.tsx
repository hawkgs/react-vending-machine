import { useEffect, useRef, useState } from 'react';
import styles from './Screen.module.css';

import { List } from 'immutable';
import { Machine, State } from '../../state/models';
import { coinFormatPipe } from '../../utils/helpers';

interface ScreenProps {
  machine: Machine;
}

const MessagesMap: { [key: string]: string } = {
  [State.StandBy]: 'Ready for use!',
  [State.ItemNotFound]: 'Item not found.',
  [State.InsufficientCredit]: 'Insufficient credit',
  [State.ItemUnavailable]: 'Item unavailable',
  [State.CantProcessOrder]: `Can't process order`,
  [State.DispensingItem]: 'Dispensing item ...',
  [State.ItemDispensed]: 'Item dispensed!',
};

export default function Screen({ machine }: ScreenProps) {
  const [messageHistory, setMessageHistory] = useState<List<string>>(List([]));
  const ulList = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    return () => {
      setMessageHistory(() => List([]));
    };
  }, []);

  useEffect(() => {
    switch (machine.state) {
      case State.CoinsInserted:
        {
          const credit = machine.coinsInSlot.reduce((p, n) => p + n, 0) / 100;
          const message = `Credit: $${credit.toFixed(2)}`;

          setMessageHistory((msgHistory) => {
            const lastMsg = msgHistory.last();

            if (lastMsg?.startsWith('Credit')) {
              msgHistory = msgHistory.pop();
            }
            return msgHistory.push(message);
          });
        }
        break;

      case State.DispensingChange:
        {
          if (machine.change.size) {
            const changeStr = machine.change
              .map((c) => `${coinFormatPipe(c)}`)
              .join(', ');
            const message = `Dispensing change: ${changeStr} ...`;

            setMessageHistory((msgHistory) => msgHistory.push(message));
          }
        }
        break;

      default:
        setMessageHistory((msgHistory) =>
          msgHistory.push(MessagesMap[machine.state]),
        );
    }
  }, [machine]);

  useEffect(() => {
    ulList?.current?.lastElementChild?.scrollIntoView();
  }, [messageHistory]);

  return (
    <ul ref={ulList} className={styles.screen}>
      {messageHistory.map((msg, idx) => (
        <li key={msg + idx}>{msg}</li>
      ))}
    </ul>
  );
}
