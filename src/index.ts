import express, { Application, Request, Response } from 'express';
import BigNumber from 'bignumber.js';
import { getSchedule } from './schedule.service';

const app: Application = express();

const port: string | number = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('HomePage');
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

  const result = getSchedule(numberOfCandidates.toNumber());

  const resultString = Object.values(result).map((item, i) => {
    return `${i + 1}: ${item.map(item => item.join(' vs ')).join('\n')}`;
  });

  res.send(resultString);
})

app.listen(port, () => {
  return console.log(`@Server is listening on port: ${port}`);
})