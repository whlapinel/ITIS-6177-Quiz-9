import express from 'express';
import axios from 'axios';

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
