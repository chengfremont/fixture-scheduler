"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const schedule_service_1 = require("./schedule.service");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('HomePage');
});
app.get('/get-schedule', (req, res) => {
    const query = req.query;
    const numberOfCandidates = new bignumber_js_1.default(`${query.numberOfCandidates}`);
    if (!numberOfCandidates || numberOfCandidates.isNaN()) {
        res.send('MUST HAVE NUMBER OF CANDIDATES QUERY');
    }
    if (numberOfCandidates.toNumber() % 2 !== 0) {
        res.send('NUMBER OF CANDIDATES MUST BE EVEN');
    }
    const result = (0, schedule_service_1.getSchedule)(numberOfCandidates.toNumber());
    res.send(result);
});
app.listen(port, () => {
    return console.log(`@Server is listening on port: ${port}`);
});
