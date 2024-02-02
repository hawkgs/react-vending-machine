import { List } from 'immutable';
import { Coin } from '../state/models';

/**
 * Check if the machine can dispense change based on the available coins
 *
 * @param allCoins All available coins in the machine repository
 * @param targetChange Target change
 * @returns If the operation can be processed and the respective change (in coins)
 */
export function processChange(
  allCoins: List<Coin>,
  targetChange: number,
): { cantProcess: boolean; changeCoins: List<Coin> } {
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
    // The operation can be processed (subset found)
    if (!tc) {
      changeCoins = ch;
      return true;
    }
    // End reached without a suitable subset || subset went over the target change (i.e. negative TC)
    if (!n || tc < 0) {
      return false;
    }

    // Exclude last coin from the subset calc || include last coin
    return (
      isSubsetSum(ac, tc - ac[n - 1], n - 1, [...ch, ac[n - 1]]) ||
      isSubsetSum(ac, tc, n - 1, ch)
    );
  }

  // Should be calculated before
  const cantProcess = !isSubsetSum(
    allCoins.toArray(),
    targetChange,
    allCoins.size,
    [],
  );

  return {
    changeCoins: List(changeCoins),
    cantProcess,
  };
}
