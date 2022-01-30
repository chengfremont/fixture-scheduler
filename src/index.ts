import express, { Application, Request, Response } from 'express';
import BigNumber from 'bignumber.js';
import { getSchedule } from './schedule.service';

const app: Application = express();

const port: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>WELCOME TO FREMONT CHENG\'S HEROKU API</h1>');
});

app.get('/get-schedule', (req: Request, res: Response) => {
  const query = req.query;

  const numberOfCandidates = new BigNumber(`${query.numberOfCandidates}`);

  if (!numberOfCandidates || numberOfCandidates.isNaN()) {
    res.send('MUST HAVE NUMBER OF CANDIDATES QUERY');
  }

  if (numberOfCandidates.toNumber() % 2 !== 0) {
    res.send('NUMBER OF CANDIDATES MUST BE EVEN');
  }

  if (numberOfCandidates.isGreaterThan(new BigNumber(10000))) {
    res.send('NUMBER OF CANDIDATES MUST BE LESS THAN 10,000');
  }

  const result = getSchedule(numberOfCandidates.toNumber());

  let returnHTML = '<h1>SCHEDULE</h1>';

  Object.values(result).forEach((fixture, i) => {
    const header = `<h2>Week ${i + 1}</h2>`;
    let table = `<table><tr><th>Home</th><th>Away</th></tr>`;

    fixture.forEach(([home, away]) => {

      const homeCell = `<td>${home}</td>`;
      const awayCell = `<td>${away}</td>`;

      table += `<tr>${homeCell}${awayCell}</tr>`;
    }

    );

    table += '</table>';

    returnHTML += `${header}${table}`;
  });

  res.send(returnHTML);
})

app.get('/get-schedule-raw', (req: Request, res: Response) => {
  const query = req.query;

  const numberOfCandidates = new BigNumber(`${query.numberOfCandidates}`);

  if (!numberOfCandidates || numberOfCandidates.isNaN()) {
    res.send('MUST HAVE NUMBER OF CANDIDATES QUERY');
  }

  if (numberOfCandidates.toNumber() % 2 !== 0) {
    res.send('NUMBER OF CANDIDATES MUST BE EVEN');
  }

  if (numberOfCandidates.isGreaterThan(new BigNumber(10000))) {
    res.send('NUMBER OF CANDIDATES MUST BE LESS THAN 10,000');
  }

  const result = getSchedule(numberOfCandidates.toNumber());

  res.send(result);
})

app.listen(port, () => {
  return console.log(`@Server is listening on port: ${port}`);
})