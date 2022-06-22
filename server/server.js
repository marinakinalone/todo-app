/* eslint-disable no-console */
const server = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
