import { Coin } from '../state/models';
import {
  ProcessChangeOutput,
  ProcessChangeSignature,
  processChange,
} from './subset-sum';

type MessageType = 'process-change-request' | 'process-change-response';

interface Message<T = unknown> {
  type: MessageType;
  payload: T;
}

export interface ProcessChangeRequest extends Message<ProcessChangeSignature> {
  type: 'process-change-request';
  payload: {
    allCoins: Coin[];
    targetChange: number;
  };
}

export interface ProcessChangeResponse extends Message<ProcessChangeOutput> {
  type: 'process-change-response';
  payload: {
    cantProcess: boolean;
    changeCoins: Coin[];
  };
}

self.addEventListener('message', (e: MessageEvent<Message>) => {
  if (e.data.type === 'process-change-request') {
    const { payload } = e.data as ProcessChangeRequest;
    const processed = processChange(payload);

    self.postMessage({
      type: 'process-change-response',
      payload: processed,
    } as ProcessChangeResponse);
  }
});
