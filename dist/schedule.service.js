"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedule = void 0;
const getSchedule = (candidatesNum) => {
    const fixtures = circleMethod(candidatesNum);
    return fixtures;
};
exports.getSchedule = getSchedule;
const circleMethod = (candidatesNum) => {
    const { upperRow, lowerRow } = seperateCandidates(candidatesNum);
    let lowerRowCandidates = lowerRow;
    const weeklyFixtures = {};
    for (let i = 0; i < candidatesNum; i++) {
        weeklyFixtures[i] = upperRow.map((upperCan, j) => [upperCan, lowerRowCandidates[j]]);
        lowerRowCandidates.push(lowerRowCandidates.shift() || 0);
    }
    return weeklyFixtures;
};
const seperateCandidates = (candidatesNum) => {
    const upperRow = [];
    const lowerRow = [];
    for (let i = 0; i < candidatesNum; i++) {
        if (i < candidatesNum / 2) {
            upperRow.push(i);
        }
        else {
            lowerRow.push(i);
        }
    }
    ;
    return { upperRow, lowerRow };
};
