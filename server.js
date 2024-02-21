import * as queries from './queries.js';
import express from 'express';
import {createRequire} from 'module';
import axios from 'axios';
const require = createRequire(import.meta.url);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/say', async (req, res) => {
  console.log('say function called on web server.');
  console.log('keyword: ', req.query.keyword);
  const say = await axios.get('https://itis-6177-quiz-9-hy3v5hewwq-ue.a.run.app/say?keyword=' + req.query.keyword);
  console.log(say.data);
  res.send(say.data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// trimField("customer", "CUST_CITY");

function trimField(tableName, columnName) {
  console.log('trimming customer city');
  queries.trimField(tableName, columnName);
}