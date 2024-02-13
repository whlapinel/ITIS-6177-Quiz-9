import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample',
  port: 3306,
  connectionLimit: 5
});


// 1 PATCH request endpoint
// PATCH <ip-address:port>/customers/:id
// edits the row where customer_code = id
// request body should specify the field to be modified and the new value

// 1 PUT request endpoint
// PUT <ip-address:port>/customers/:id
// edits the row where customer_code = id
// replaces current row with new data
// request body should include all fields and values

// 1 DELETE request endpoint
// DELETE <ip-address:port>/customers/:id
// id = customer code


// 1 POST request endpoint
// POST <ip-address:port>/customers/
// should have customer object in request body (with null cust_code)
// creates new row

export async function postCustomer(customer) {

  // get next cust_code
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT MAX(CUST_CODE) FROM customer");
    console.log(rows);
    let nextCustCode = parseInt(rows[0]['MAX(CUST_CODE)'].substring(1)) + 1;
    nextCustCode = 'C' + nextCustCode.toString().padStart(5, '0');
    console.log(nextCustCode);
    customer.CUST_CODE = nextCustCode;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
  console.log(customer);

  // add customer to db
  try {
    conn = await pool.getConnection();
    const response = await conn.query("INSERT INTO customer (CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [customer.CUST_CODE, customer.CUST_NAME, customer.CUST_CITY, customer.WORKING_AREA, customer.CUST_COUNTRY, customer.GRADE, customer.OPENING_AMT, customer.RECEIVE_AMT, customer.PAYMENT_AMT, customer.OUTSTANDING_AMT, customer.PHONE_NO, customer.AGENT_CODE]);
    console.log(response);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}

export async function getAgents() {
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

export async function getStudents() {
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

export async function getCustomers() {
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

export async function getCustomerByCode(cust_code) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM customer WHERE cust_code = ?", [cust_code]);
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}

export async function deleteCustomerByCode(cust_code) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("DELETE FROM customer WHERE cust_code = ?", [cust_code]);
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}
