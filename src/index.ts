import express, { Application, Request, Response } from 'express';
import BigNumber from 'bignumber.js';
import { getSchedule, validateScheduleQuery } from './schedule.service';

const app: Application = express();

const port: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>WELCOME TO FREMONT CHENG\'S HEROKU API</h1>');
});

app.get('/get-schedule', (req: Request, res: Response) => {
  const query = req.query;

  try {
    validateScheduleQuery(`${query.numberOfCandidates}`);
  } catch (error) {
    res.send(error);
  }

  const candidateTotal = new BigNumber(`${query.numberOfCandidates}`);
  const result = getSchedule(candidateTotal.toNumber());

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

  try {
    validateScheduleQuery(`${query.numberOfCandidates}`);
  } catch (error) {
    res.send(error);
  }

  const candidateTotal = new BigNumber(`${query.numberOfCandidates}`);
  const result = getSchedule(candidateTotal.toNumber());

  res.send(result);
})

app.listen(port, () => {
  return console.log(`@Server is listening on port: ${port}`);
})