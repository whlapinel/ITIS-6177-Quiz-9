import express from 'express';
import mariadb from 'mariadb';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample',
  port: 3306,
  connectionLimit: 5
});

async function getAgents() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM agents");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}
async function getStudents() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM student");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}
async function getCustomers() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM customer");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}

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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
