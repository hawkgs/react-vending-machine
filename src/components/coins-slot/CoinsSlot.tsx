import { Coin, Machine } from '../../state/models';

interface CoinsSlotProps {
  machine: Machine;
  onCoinInserted: (coin: Coin) => void;
}

export default function CoinsSlot({ machine }: CoinsSlotProps) {
  return <div></div>;
}
