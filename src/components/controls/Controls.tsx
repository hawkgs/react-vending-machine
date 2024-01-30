import { Machine } from '../../state/models';
import './Controls.module.css';

interface ControlsProps {
  machine: Machine;
  onCodeEnter: (code: number) => void;
  onCoinsDispense: () => void;
}

export default function Controls({ machine }: ControlsProps) {
  return <div></div>;
}
