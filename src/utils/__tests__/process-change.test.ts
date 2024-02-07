import { processChange } from '../process-change';

test('It should return no change, if the target change is 0', () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [1, 1, 1],
    targetChange: 0,
  });

  expect(cantProcess).toBeFalsy();
  expect(changeCoins.length).toEqual(0);
});

test('It should not be able to process change, if there are no suitable coin denominations', () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [100, 100],
    targetChange: 50,
  });

  expect(cantProcess).toBeTruthy();
  expect(changeCoins.length).toEqual(0);
});

test("It should not be able to process change, if there aren't any coins", () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [],
    targetChange: 50,
  });

  expect(cantProcess).toBeTruthy();
  expect(changeCoins.length).toEqual(0);
});

test('It be able to return change (50c)', () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [50, 50, 50],
    targetChange: 50,
  });

  expect(cantProcess).toBeFalsy();
  expect(changeCoins).toEqual([50]);
});

test('It be able to return 75c change (50c, 25c)', () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [50, 50, 100, 25, 10],
    targetChange: 75,
  });

  expect(cantProcess).toBeFalsy();
  expect(changeCoins.sort()).toEqual([25, 50]);
});

test('It be able to return 97c change (1c, 1c, 10c, 10c, 25c, 50c)', () => {
  const { cantProcess, changeCoins } = processChange({
    allCoins: [100, 50, 25, 10, 10, 5, 1, 1, 1],
    targetChange: 97,
  });

  expect(cantProcess).toBeFalsy();
  expect(changeCoins.sort()).toEqual([1, 1, 10, 10, 25, 50]);
});
