import { Coin, Machine } from '../../state/models';
import './CoinsSlot.module.css';

interface CoinsSlotProps {
  machine: Machine;
  onCoinInserted: (coin: Coin) => void;
}

export default function CoinsSlot({ machine }: CoinsSlotProps) {
  return <div></div>;
}
