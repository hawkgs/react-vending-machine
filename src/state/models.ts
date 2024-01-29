import { List, Map, Record } from 'immutable';

// Coins

export type Coin = 1 | 2 | 5 | 10 | 20 | 50 | 100 | 200;

// Inventory Item

export type InventoryItemType = 'beverage' | 'snack';

export interface InventoryItemConfig {
  type?: InventoryItemType;
  name?: string;
  price?: number;
  code?: number;
}

const inventoryItemRecord = Record({
  type: 'beverage',
  name: '',
  price: 0,
  code: 0,
});

export class InventoryItem extends inventoryItemRecord {
  constructor(config: InventoryItemConfig) {
    super(config);
  }
}

// State

export enum State {
  StandBy,
  CoinsLoaded,
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
  loadedCoins?: List<Coin>;
  availableCoins?: Map<Coin, number>;
  items?: Map<number, List<InventoryItem>>;
}

const machineRecord = Record({
  state: State.StandBy,
  loadedCoins: List<Coin>([]),
  availableCoins: Map<Coin, number>([]),
  items: Map<number, List<InventoryItem>>([]),
});

export class Machine extends machineRecord {
  constructor(config: MachineConfig) {
    super(config);
  }
}
