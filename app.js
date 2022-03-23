import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import getIP from 'ipware';

import publicIp from 'public-ip';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the express-static middleware

app.post('/openSearch', async function (req, res) {
  const data = req.body;
  const url = data.url;
  const query = data.query;
  try {
    const result = await axios({
      url: url,
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: query,
    });

    res.status(200).json({ data: result.data });
  } catch (err) {
    res.status(400).json({ data: 'error' });
  }
});

app.get('/', async (req, res) => {
  var ipInfo = getIP().get_ip(req);
  console.log('******************');
  console.log('******************');
  console.log(ipInfo);
  console.log('******************');
  console.log('******************');
  res.status(200).json({ data: ipInfo });
});

app.listen(3000);
