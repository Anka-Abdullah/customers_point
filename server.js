const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', customerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
