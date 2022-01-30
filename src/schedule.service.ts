import BigNumber from "bignumber.js";

export const validateScheduleQuery = (input: string | number) => {

  const parsedInput = new BigNumber(input);

  if (!parsedInput || parsedInput.isNaN()) {
    throw new Error('MUST HAVE NUMBER OF CANDIDATES QUERY');
  }

  if (parsedInput.isGreaterThan(new BigNumber(500))) {
    throw new Error('NUMBER OF CANDIDATES MUST BE LESS THAN 500');
  }

  if (parsedInput.toNumber() % 2 !== 0) {
    throw new Error('NUMBER OF CANDIDATES MUST BE EVEN');
  }

  return true;
}

export const getSchedule = (candidatesNum: number) => {
  const fixtures = circleMethod(candidatesNum);
  return fixtures;
}

const circleMethod = (candidatesNum: number) => {
  const { upperRow, lowerRow } = seperateCandidates(candidatesNum);

  let lowerRowCandidates = lowerRow;
  const weeklyFixtures: { [key: number]: Array<Array<number>> } = {};

  for (let i = 0; i < candidatesNum; i++) {
    weeklyFixtures[i] = upperRow.map((upperCan, j) => [upperCan, lowerRowCandidates[j]]);
    lowerRowCandidates.push(lowerRowCandidates.shift() || 0);
  }

  return weeklyFixtures;
}

const seperateCandidates = (candidatesNum: number) => {
  const upperRow = [];
  const lowerRow = [];

  for (let i = 0; i < candidatesNum; i++) {
    if (i < candidatesNum / 2) {
      upperRow.push(i);
    } else {
      lowerRow.push(i);
    }
  };

  return { upperRow, lowerRow };
}