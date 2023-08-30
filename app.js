const express = require('express');
const sql = require('mssql');

const app = express();

const config = {
  server: 'your-database-server.database.windows.net',
  database: 'your-database-name',
  user: 'your-database-username',
  password: 'your-database-password',
  options: {
    encrypt: true, // Use encryption for Azure SQL Database
    enableArithAbort: true // Required for Azure SQL Database
  }
};

app.get('/payments', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the payments table
    const result = await sql.query('SELECT * FROM payments');

    // Send the results as JSON
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving payments.');
  } finally {
    // Close the database connection
    sql.close();
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
