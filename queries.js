import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample',
  port: 3306,
  connectionLimit: 5
});

export async function trimField(tableName, columnName) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("UPDATE " + tableName + " SET " + columnName + " = TRIM(" + columnName + ")");
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

export async function patchCustomerByCode(cust_code, customer) {
  let conn;
  try {
    conn = await pool.getConnection();
    let query = "UPDATE customer SET ";
    let keys = Object.keys(customer);
    for (let i = 0; i < keys.length; i++) {
      query += keys[i] + " = '" + customer[keys[i]] + "'";
      if (i < keys.length - 1) {
        query += ", ";
      }
    }
    query += " WHERE CUST_CODE = '" + cust_code + "'";
    console.log(query);
    const rows = await conn.query(query);
    console.log(rows);
    if (rows.affectedRows === 0) {
      return '404';
    } else {
      return rows;
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}
  
export async function putCustomerByCode(cust_code, customer) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("UPDATE customer SET CUST_NAME = ?, CUST_CITY = ?, WORKING_AREA = ?, CUST_COUNTRY = ?, GRADE = ?, OPENING_AMT = ?, RECEIVE_AMT = ?, PAYMENT_AMT = ?, OUTSTANDING_AMT = ?, PHONE_NO = ?, AGENT_CODE = ? WHERE CUST_CODE = ?", [customer.CUST_NAME, customer.CUST_CITY, customer.WORKING_AREA, customer.CUST_COUNTRY, customer.GRADE, customer.OPENING_AMT, customer.RECEIVE_AMT, customer.PAYMENT_AMT, customer.OUTSTANDING_AMT, customer.PHONE_NO, customer.AGENT_CODE, cust_code]);
    console.log(rows);
    if (rows.affectedRows === 0) {
      return '404';
    } else {
      return rows;
    }
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
    if (rows.affectedRows === 0) {
      return '404';
    } else {
      return rows;
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end(); // Close the connection properly
  }
}

