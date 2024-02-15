import * as queries from './queries.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coding Exercise 3',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'], // files containing annotations as above
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/customers', async (req, res) => {
  console.log('data requested');
  try {
    const data = await queries.getCustomers();
    console.log(data);
    res.json(data); // Send the fetched data directly
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/customers', async (req, res) => {
  console.log(req.body);
  try {
    queries.postCustomer(req.body);
    res.status(201).send("customer added");
  }
  catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/customers/:cust_code', async (req, res) => {
  console.log(req.params);
  const cust_code = req.params.cust_code;
  if (cust_code.length !== 6) {
    res.status(400).json({ error: 'Invalid customer code' });
    return;
  }
  const data = await queries.getCustomerByCode(cust_code);
  if (data.length === 0) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  res.json(data[0]);
});

app.put('/customers/:cust_code', async (req, res) => {
  console.log(req.params);
  const cust_code = req.params.cust_code;
  console.log(cust_code);
  const customer = req.body;
  customer.CUST_CODE = cust_code;
  console.log(customer);
  if (cust_code.length !== 6) {
    res.status(400).json({ error: 'Invalid customer code' });
    return;
  }
  const data = await queries.getCustomerByCode(cust_code);
  if (data.length === 0) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  try {
    queries.putCustomerByCode(cust_code, req.body);
    res.status(204).send("customer updated");
  }
  catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/customers/:cust_code', async (req, res) => {
  console.log(req.params);
  const cust_code = req.params.cust_code;
  console.log(cust_code);
  const customer = req.body;
  customer.CUST_CODE = cust_code;
  console.log(customer);
  if (cust_code.length !== 6) {
    res.status(400).json({ error: 'Invalid customer code' });
    return;
  }
  const data = await queries.getCustomerByCode(cust_code);
  if (data.length === 0) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  try {
    queries.patchCustomerByCode(cust_code, req.body);
    res.status(204).send("customer updated");
  }
  catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

app.delete('/customers/:cust_code', async (req, res) => {
  console.log(req.params);
  const cust_code = req.params.cust_code;
  console.log(cust_code);
  if (cust_code.length !== 6) {
    res.status(400).json({ error: 'Invalid customer code' });
    return;
  }
  const status = await queries.deleteCustomerByCode(cust_code);
  if (status === '404') {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  res.status(204).send("customer deleted");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// trimField("customer", "CUST_CITY");

function trimField(tableName, columnName) {
  console.log('trimming customer city');
  queries.trimField(tableName, columnName);
}