import { List, Map, Record } from 'immutable';

// Coins

export type Coin = 1 | 2 | 5 | 10 | 20 | 50 | 100 | 200;

export interface InventoryItemConfig {
  name?: string;
  price?: number;
}

const inventoryItemRecord = Record({
  name: '',
  price: 0,
});

export class InventoryItem extends inventoryItemRecord {
  constructor(config: InventoryItemConfig) {
    super(config);
  }
}

// State

export enum State {
  StandBy,
  CoinsInserted,
  ItemNotFound,
  ItemUnavailable,
  InsufficientCredit,
  CantProcessOrder,
  DispensingItem,
  ItemDispensed,
  DispensingChange,
}

// Machine

interface MachineConfig {
  state?: State;
  coinsInSlot?: List<Coin>;
  coins?: Map<Coin, number>;
  items?: Map<number, List<InventoryItem>>;
}

const machineRecord = Record({
  state: State.StandBy,
  coinsInSlot: List<Coin>([]),
  coins: Map<Coin, number>([]),
  items: Map<number, List<InventoryItem>>([]),
});

export class Machine extends machineRecord {
  constructor(config: MachineConfig) {
    super(config);
  }
}
