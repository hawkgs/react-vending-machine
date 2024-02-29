import { List, Map, Record } from 'immutable';

// Coins

export type Coin = 1 | 5 | 10 | 25 | 50 | 100;

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
  StandBy = 'stand-by',
  CoinsInserted = 'coins-inserted',
  ItemNotFound = 'item-not-found',
  ItemUnavailable = 'item-unavailable',
  InsufficientCredit = 'insufficient-credit',
  CantProcessOrder = 'cant-process-order',
  DispensingItem = 'dispensing-item',
  ItemDispensed = 'item-dispensed',
  DispensingChange = 'dispensing-change',
}

// Machine

interface MachineConfig {
  state: State;
  coinsInSlot: List<Coin>;
  change: List<Coin>; // Has only UI/presentation purpose
  coins: Map<Coin, number>;
  items: Map<string, List<InventoryItem>>;
}

const machineRecord = Record<MachineConfig>({
  state: State.StandBy,
  coinsInSlot: List<Coin>([]),
  change: List<Coin>([]),
  coins: Map<Coin, number>([]),
  items: Map<string, List<InventoryItem>>([]),
});

export class Machine extends machineRecord {
  constructor(config: Partial<MachineConfig>) {
    super(config);
  }
}
