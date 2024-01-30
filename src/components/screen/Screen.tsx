import { useEffect, useRef, useState } from 'react';
import styles from './Screen.module.css';

import { List } from 'immutable';
import { Machine, State } from '../../state/models';

interface ScreenProps {
  machine: Machine;
}

const MessagesMap: { [key: string]: string } = {
  [State.StandBy]: 'Machine is ready for use!',
  [State.ItemNotFound]: 'Item not found.',
  [State.InsufficientCredit]: 'Insufficient credit',
  [State.ItemUnavailable]: 'The item is unavailable',
  [State.CantProcessOrder]: `Can't process order`,
};

export default function Screen({ machine }: ScreenProps) {
  const [messageHistory, setMessageHistory] = useState<List<string>>(List([]));
  const ulList = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    let message = '';

    if (machine.state === State.CoinsInserted) {
      const credit = machine.coinsInSlot.reduce((p, n) => p + n, 0) / 100;
      message = `Inserted a coin. Current credit: $${credit}`;
    } else {
      message = MessagesMap[machine.state];
    }

    setMessageHistory((messageHistory) => messageHistory.push(message));
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
