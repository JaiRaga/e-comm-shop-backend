require('dotenv/config');
require('./db/mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const productsRouter = require('./routes/products');
const app = express();
const api_version = process.env.API_VERSION;

// enable cors
app.use(cors())
app.options('*', cors())

app.use(express.json());
app.use(morgan('dev'));
app.use(`${api_version}/products`, productsRouter);

console.log(api_version);

const PORT = process.env.PORT || 9008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
