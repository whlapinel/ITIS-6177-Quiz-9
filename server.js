import express from 'express';
import {getAgents, getStudents, getCustomers, getCustomerByCode, deleteCustomerByCode, postCustomer} from './queries.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/test', (req, res) => {
  const message = req.body;
  console.log(message);
  res.send(message);
});

app.get('/agents', async (req, res) => {
  console.log('data requested');
  try {
    const data = await getAgents();
    console.log(data);
    res.json(data); // Send the fetched data directly
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/students', async (req, res) => {
  console.log('data requested');
  try {
    const data = await getStudents();
    console.log(data);
    res.json(data); // Send the fetched data directly
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// should receive a JSON object with the same structure as the customer object
// minus the CUST_CODE field
// no need to json-ify the response, it's done automatically by express
app.post('/customers', async (req, res) => {
  console.log(req.body);
  postCustomer(req.body);
  res.send(req.body);
});

app.get('/customers', async (req, res) => {
  console.log('data requested');
  try {
    const data = await getCustomers();
    console.log(data);
    res.json(data); // Send the fetched data directly
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get customer by cust_code
// customer_code has format of C +5 digit numeric code
app.get('/customers/:cust_code', async (req, res) => {
  console.log(req.params);
  const cust_code = req.params.cust_code;
  if (cust_code.length !== 6) {
    res.status(400).json({ error: 'Invalid customer code' });
    return;
  }
  const data = await getCustomerByCode(cust_code);
  if (data.length === 0) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  res.json(data[0]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
