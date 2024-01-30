import { useState } from 'react';
import './Controls.module.css';

interface ControlsProps {
  onCodeEnter: (code: number) => void;
  onCoinsDispense: () => void;
}

export default function Controls({
  onCodeEnter,
  onCoinsDispense,
}: ControlsProps) {
  // const [code, setCode] = useState<string>('');
  // const onButtonClick = (digit: string) => {};

  return <div></div>;
}
