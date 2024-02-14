import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {getAgents, getStudents, getCustomers, getCustomerByCode, deleteCustomerByCode, postCustomer} from './queries.js';


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

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @openapi
 * definitions:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         cust_code:
 *           type: string
 *           description: The customer code
 *           example: C00001
 *           required: false
 *         
 * 
 */


/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 * /test:
 *   post:
 *      description: Use to test if the server is running
 *      responses:
 *          200:
 *              description: returns the request body
 *      parameters:
 *         name: message
 *         in: body
 *         description: The message to send
 *         required: true
 *         type: object
 */

app.post('/test', (req, res) => {
  const message = req.body;
  console.log(message);
  res.send(message);
});


/**
 * @openapi
 * /agents:
 *   get:
 *     description: Get all agents
 *     responses:
 *       200:
 *         description: Returns all agents
 
 */



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

/**
 * @openapi
 * /students:
 *  get:
 *   description: Get all students
 *   responses:
 *     200:
 *       description: Returns all students
 * 
 * 
 */

app.get('/students', async (req, res) => {
  console.log('students requested');
  try {
    const data = await getStudents();
    console.log(data);
    res.json(data); // Send the fetched data directly
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// should receive a JSON object with the same structure as the customer object
// minus the CUST_CODE field
// no need to json-ify the response, it's done automatically by express

/**
 * @openapi
 * /customers:
 *   post:
 *     description: Add a new customer
 *     responses:
 *       200:
 *         description: Adds customer to the database
 *         parameters:
 *           name: customer
 *           in: body
 *           description: The customer to add
 *           schema:
 *             $ref: '#/definitions/schemas/Customer'
 */

app.post('/customers', async (req, res) => {
  console.log(req.body);
  try {
    postCustomer(req.body);
    res.status(201).send("customer added");
  }
  catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
