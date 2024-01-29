import { Machine } from '../../state/models';

interface ControlsProps {
  machine: Machine;
  onCodeEnter: (code: number) => void;
  onCoinsDispense: () => void;
}

export default function Controls({ machine }: ControlsProps) {
  return <div></div>;
}
