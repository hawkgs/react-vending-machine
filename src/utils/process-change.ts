import { Coin } from '../state/models';

export interface ProcessChangeSignature {
  allCoins: Coin[];
  targetChange: number;
}

export interface ProcessChangeOutput {
  cantProcess: boolean;
  changeCoins: Coin[];
}

/**
 * Check if the machine can dispense change based on the available coins
 *
 * @param allCoins All available coins in the machine repository
 * @param targetChange Target change
 * @returns If the operation can be processed and the respective change (in coins)
 */
export function processChange({
  allCoins,
  targetChange,
}: ProcessChangeSignature): ProcessChangeOutput {
  let changeCoins: Coin[] = [];

  /**
   * Subset Sum with backtracking
   *
   * @param ac All coins
   * @param tc Target change
   * @param n Sub-array size
   * @param ch Coins used in the process
   * @returns Whether the operation can be processed or not
   */
  function isSubsetSum(ac: Coin[], tc: number, n: number, ch: Coin[]): boolean {
    // Note(Georgi): The operation can be processed (subset found)
    if (!tc) {
      changeCoins = ch;
      return true;
    }
    // Note(Georgi): End reached without a suitable subset ||
    // subset went over the target change (i.e. negative TC)
    if (!n || tc < 0) {
      return false;
    }

    // Note(Georgi): Exclude last coin from the subset calc || include last coin
    return (
      isSubsetSum(ac, tc - ac[n - 1], n - 1, [...ch, ac[n - 1]]) ||
      isSubsetSum(ac, tc, n - 1, ch)
    );
  }

  // Note(Georgi): Should be calculated before returning
  // the output since "changeCoins" must be set prior to that.
  const cantProcess = !isSubsetSum(allCoins, targetChange, allCoins.length, []);

  return {
    changeCoins,
    cantProcess,
  };
}
